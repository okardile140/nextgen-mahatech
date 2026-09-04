// Next.js App Router ROUTE HANDLER
// GET  /api/ams-features — public list of AMS product features.
// POST /api/ams-features — create a feature (admin panel).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export const amsFeatureSchema = z.object({
  title: z.string().trim().min(2).max(140),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  icon: z.string().trim().max(60).optional().or(z.literal("")),
  tone: z.string().trim().max(120).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().optional(),
});

export async function GET() {
  try {
    const features = await prisma.amsFeature.findMany();
    return NextResponse.json({ success: true, data: features, error: null });
  } catch {
    const { amsFeatures: seed } = await import("../../../lib/ams-data");
    return NextResponse.json({ success: true, data: seed, error: null });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = amsFeatureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, data: null, error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 422 }
    );
  }
  try {
    const d = parsed.data;
    const feature = await prisma.amsFeature.create({
      data: {
        title: d.title,
        description: d.description ? d.description : "",
        icon: d.icon ? d.icon : null,
        tone: d.tone ? d.tone : null,
        sortOrder: d.sortOrder,
      },
    });
    return NextResponse.json({ success: true, data: feature, error: null }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, data: null, error: "Could not create feature." },
      { status: 500 }
    );
  }
}
