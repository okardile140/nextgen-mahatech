// Next.js App Router ROUTE HANDLER
// GET  /api/portfolio        — public list of active portfolio items.
// GET  /api/portfolio?all=1  — everything incl. inactive (admin panel).
// POST /api/portfolio        — create a portfolio item (admin panel).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export const portfolioSchema = z.object({
  title: z.string().trim().min(2).max(140),
  category: z.string().trim().max(120).optional().or(z.literal("")),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
  image: z.string().trim().max(500).optional().or(z.literal("")),
  link: z.string().trim().max(500).optional().or(z.literal("")),
  active: z.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get("all") === "1";
    const items = await prisma.portfolio.findMany(
      all ? undefined : { where: { active: true } }
    );
    return NextResponse.json({ success: true, data: items, error: null });
  } catch {
    const { portfolioItems: seed } = await import("../../../lib/seed-data");
    return NextResponse.json({ success: true, data: seed, error: null });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = portfolioSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, data: null, error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 422 }
    );
  }
  try {
    const d = parsed.data;
    const item = await prisma.portfolio.create({
      data: {
        title: d.title,
        category: d.category ? d.category : null,
        description: d.description ? d.description : "",
        image: d.image ? d.image : null,
        link: d.link ? d.link : null,
        active: d.active,
        sortOrder: d.sortOrder,
      },
    });
    return NextResponse.json({ success: true, data: item, error: null }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, data: null, error: "Could not create portfolio item." },
      { status: 500 }
    );
  }
}
