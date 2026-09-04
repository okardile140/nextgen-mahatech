// Next.js App Router ROUTE HANDLER — single portfolio item (admin panel).
// GET   /api/portfolio/:id — fetch one item.
// PATCH /api/portfolio/:id — update an item (partial).
// DELETE /api/portfolio/:id — delete an item.

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { portfolioSchema } from "../route";

const partialSchema = portfolioSchema.partial();

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const item = await prisma.portfolio.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ success: false, data: null, error: "Portfolio item not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: item, error: null });
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
    const item = await prisma.portfolio.update({
      where: { id },
      data: {
        ...(d.title !== undefined ? { title: d.title } : {}),
        ...(d.category !== undefined ? { category: d.category } : {}),
        ...(d.description !== undefined ? { description: d.description } : {}),
        ...(d.image !== undefined ? { image: d.image } : {}),
        ...(d.link !== undefined ? { link: d.link } : {}),
        ...(d.active !== undefined ? { active: d.active } : {}),
        ...(d.sortOrder !== undefined ? { sortOrder: d.sortOrder } : {}),
      },
    });
    return NextResponse.json({ success: true, data: item, error: null });
  } catch {
    return NextResponse.json({ success: false, data: null, error: "Portfolio item not found" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  try {
    const item = await prisma.portfolio.delete({ where: { id } });
    return NextResponse.json({ success: true, data: item, error: null });
  } catch {
    return NextResponse.json({ success: false, data: null, error: "Portfolio item not found" }, { status: 404 });
  }
}
