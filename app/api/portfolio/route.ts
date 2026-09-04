// Next.js App Router ROUTE HANDLER
// GET  /api/portfolio        — public list of active portfolio items.
// GET  /api/portfolio?all=1  — everything incl. inactive (admin panel).
// POST /api/portfolio        — create a portfolio item (admin panel).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";
import { invalid } from "../services/route";

export const dynamic = "force-dynamic";

// Accepts absolute https URLs or site-relative paths (e.g. /work/acme.png).
const urlOrPath = (label: string) =>
  z
    .string()
    .trim()
    .max(500, `${label} is too long`)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || v.startsWith("/") || /^https?:\/\/.+\..+/.test(v), {
      message: `${label} must be a full https:// URL or a site path like /image.png`,
    });

export const portfolioSchema = z.object({
  title: z.string().trim().min(2, "Title needs at least 2 characters").max(140, "Title must be under 140 characters"),
  category: z.string().trim().max(120, "Category must be under 120 characters").optional().or(z.literal("")),
  description: z.string().trim().max(4000, "Description must be under 4000 characters").optional().or(z.literal("")),
  image: urlOrPath("Image URL"),
  link: urlOrPath("Project link"),
  active: z.boolean({ error: "Visible must be true or false" }).optional(),
  sortOrder: z.coerce.number().int("Order must be a whole number").min(0, "Order can't be negative").max(9999, "Order must be under 10000").optional(),
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
  const { data: d, response } = invalid(body, portfolioSchema);
  if (!d) return response;
  try {
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
  } catch (e) {
    console.error("POST /api/portfolio failed:", e);
    return NextResponse.json(
      { success: false, data: null, error: "Could not create portfolio item. Please try again." },
      { status: 500 }
    );
  }
}
