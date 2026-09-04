// Next.js App Router ROUTE HANDLER — single team member (admin panel).
// GET   /api/team/:id — fetch one member.
// PATCH /api/team/:id — update a member (partial).
// DELETE /api/team/:id — delete a member.

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { teamMemberSchema } from "../route";
import { invalid } from "../../services/route";

const partialSchema = teamMemberSchema.partial();

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) {
    return NextResponse.json({ success: false, data: null, error: "Team member not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: member, error: null });
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const { data: d, response } = invalid(body, partialSchema);
  if (!d) return response;
  try {
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        ...(d.name !== undefined ? { name: d.name } : {}),
        ...(d.role !== undefined ? { role: d.role } : {}),
        ...(d.image !== undefined ? { image: d.image } : {}),
        ...(d.tone !== undefined ? { tone: d.tone } : {}),
        ...(d.message !== undefined ? { message: d.message } : {}),
        ...(d.quote !== undefined ? { quote: d.quote } : {}),
        ...(d.active !== undefined ? { active: d.active } : {}),
        ...(d.sortOrder !== undefined ? { sortOrder: d.sortOrder } : {}),
      },
    });
    return NextResponse.json({ success: true, data: member, error: null });
  } catch (e) {
    console.error(`PATCH /api/team/${id} failed:`, e);
    return NextResponse.json({ success: false, data: null, error: "Team member not found" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  try {
    const member = await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true, data: member, error: null });
  } catch (e) {
    console.error(`DELETE /api/team/${id} failed:`, e);
    return NextResponse.json({ success: false, data: null, error: "Team member not found" }, { status: 404 });
  }
}
