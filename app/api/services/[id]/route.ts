// Next.js App Router ROUTE HANDLER — single service (admin panel).
// GET   /api/services/:id — fetch one service.
// PATCH /api/services/:id — update a service (partial).
// DELETE /api/services/:id — delete a service.

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { serviceSchema } from "../route";

const partialSchema = serviceSchema.partial();

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) {
    return NextResponse.json({ success: false, data: null, error: "Service not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: service, error: null });
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = partialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, data: null, error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 422 }
    );
  }
  try {
    const d = parsed.data;
    const lines = (v: unknown) =>
      Array.isArray(v) ? v.map(String) : String(v ?? "").split(/\r?\n/).map((s: string) => s.trim()).filter(Boolean);
    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(d.title !== undefined ? { title: d.title } : {}),
        ...(d.slug !== undefined ? { slug: d.slug } : {}),
        ...(d.tagline !== undefined ? { tagline: d.tagline } : {}),
        ...(d.description !== undefined ? { description: d.description } : {}),
        ...(d.longDescription !== undefined ? { longDescription: d.longDescription } : {}),
        ...(d.icon !== undefined ? { icon: d.icon } : {}),
        ...(d.tone !== undefined ? { tone: d.tone } : {}),
        ...(d.features !== undefined ? { features: lines(d.features) } : {}),
        ...(d.deliverables !== undefined ? { deliverables: lines(d.deliverables) } : {}),
        ...(d.active !== undefined ? { active: d.active } : {}),
        ...(d.sortOrder !== undefined ? { sortOrder: d.sortOrder } : {}),
      },
    });
    return NextResponse.json({ success: true, data: service, error: null });
  } catch {
    return NextResponse.json({ success: false, data: null, error: "Service not found" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  try {
    const service = await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true, data: service, error: null });
  } catch {
    return NextResponse.json({ success: false, data: null, error: "Service not found" }, { status: 404 });
  }
}
