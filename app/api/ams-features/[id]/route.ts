// Next.js App Router ROUTE HANDLER — single AMS feature (admin panel).
// GET   /api/ams-features/:id — fetch one feature.
// PATCH /api/ams-features/:id — update a feature (partial).
// DELETE /api/ams-features/:id — delete a feature.

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { amsFeatureSchema } from "../route";
import { invalid } from "../../services/route";

const partialSchema = amsFeatureSchema.partial();

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const feature = await prisma.amsFeature.findUnique({ where: { id } });
  if (!feature) {
    return NextResponse.json({ success: false, data: null, error: "Feature not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: feature, error: null });
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const { data: d, response } = invalid(body, partialSchema);
  if (!d) return response;
  try {
    const feature = await prisma.amsFeature.update({
      where: { id },
      data: {
        ...(d.title !== undefined ? { title: d.title } : {}),
        ...(d.description !== undefined ? { description: d.description } : {}),
        ...(d.icon !== undefined ? { icon: d.icon } : {}),
        ...(d.tone !== undefined ? { tone: d.tone } : {}),
        ...(d.sortOrder !== undefined ? { sortOrder: d.sortOrder } : {}),
      },
    });
    return NextResponse.json({ success: true, data: feature, error: null });
  } catch (e) {
    console.error(`PATCH /api/ams-features/${id} failed:`, e);
    return NextResponse.json({ success: false, data: null, error: "Feature not found" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  try {
    const feature = await prisma.amsFeature.delete({ where: { id } });
    return NextResponse.json({ success: true, data: feature, error: null });
  } catch (e) {
    console.error(`DELETE /api/ams-features/${id} failed:`, e);
    return NextResponse.json({ success: false, data: null, error: "Feature not found" }, { status: 404 });
  }
}
