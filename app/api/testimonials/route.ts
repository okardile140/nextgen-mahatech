// Next.js App Router ROUTE HANDLER
// GET  /api/testimonials        — public list of active testimonials.
// GET  /api/testimonials?all=1  — everything incl. inactive (admin panel).
// POST /api/testimonials        — create a testimonial (admin panel).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";
import { invalid } from "../services/route";

export const dynamic = "force-dynamic";

export const testimonialSchema = z.object({
  client: z.string().trim().min(2, "Client name needs at least 2 characters").max(120, "Client name must be under 120 characters"),
  role: z.string().trim().max(160, "Role must be under 160 characters").optional().or(z.literal("")),
  quote: z.string().trim().min(10, "Quote needs at least 10 characters").max(2000, "Quote must be under 2000 characters"),
  rating: z.coerce.number().int("Rating must be a whole number").min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5").optional(),
  active: z.boolean({ error: "Visible must be true or false" }).optional(),
  sortOrder: z.coerce.number().int("Order must be a whole number").min(0, "Order can't be negative").max(9999, "Order must be under 10000").optional(),
});

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get("all") === "1";
    const testimonials = await prisma.testimonial.findMany(
      all ? undefined : { where: { active: true } }
    );
    return NextResponse.json({ success: true, data: testimonials, error: null });
  } catch {
    const { testimonials: seed } = await import("../../../lib/seed-data");
    return NextResponse.json({ success: true, data: seed, error: null });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { data: d, response } = invalid(body, testimonialSchema);
  if (!d) return response;
  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        client: d.client,
        role: d.role ? d.role : null,
        quote: d.quote,
        rating: d.rating,
        active: d.active,
        sortOrder: d.sortOrder,
      },
    });
    return NextResponse.json({ success: true, data: testimonial, error: null }, { status: 201 });
  } catch (e) {
    console.error("POST /api/testimonials failed:", e);
    return NextResponse.json(
      { success: false, data: null, error: "Could not create testimonial. Please try again." },
      { status: 500 }
    );
  }
}
