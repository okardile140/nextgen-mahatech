// Next.js App Router ROUTE HANDLER
// GET  /api/services         — public list of active services.
// GET  /api/services?all=1   — everything incl. inactive (admin panel).
// POST /api/services         — create a service (admin panel).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

const strArr = z
  .array(z.string())
  .optional()
  .default([])
  .transform((a) => a.map((s) => s.trim()).filter(Boolean));

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().max(140).optional().or(z.literal("")),
  tagline: z.string().trim().max(160).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  longDescription: z.string().trim().max(6000).optional().or(z.literal("")),
  icon: z.string().trim().max(60).optional().or(z.literal("")),
  tone: z.string().trim().max(120).optional().or(z.literal("")),
  features: z.union([strArr, z.string().trim()]).optional(),
  deliverables: z.union([strArr, z.string().trim()]).optional(),
  active: z.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

const lines = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : String(v ?? "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get("all") === "1";
    const services = await prisma.service.findMany(
      all ? undefined : { where: { active: true } }
    );
    return NextResponse.json({ success: true, data: services, error: null });
  } catch {
    const { serviceDetails: seed } = await import("../../../lib/services-data");
    return NextResponse.json({ success: true, data: seed, error: null });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, data: null, error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 422 }
    );
  }
  try {
    const d = parsed.data;
    const service = await prisma.service.create({
      data: {
        title: d.title,
        slug: d.slug ? d.slug : undefined,
        tagline: d.tagline ? d.tagline : null,
        description: d.description ? d.description : "",
        longDescription: d.longDescription ? d.longDescription : null,
        icon: d.icon ? d.icon : null,
        tone: d.tone ? d.tone : null,
        features: lines(d.features),
        deliverables: lines(d.deliverables),
        active: d.active,
        sortOrder: d.sortOrder,
      },
    });
    return NextResponse.json({ success: true, data: service, error: null }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, data: null, error: "Could not create service." },
      { status: 500 }
    );
  }
}
