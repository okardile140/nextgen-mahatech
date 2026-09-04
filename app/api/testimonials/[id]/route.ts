// Next.js App Router ROUTE HANDLER — single testimonial (admin panel).
// GET   /api/testimonials/:id — fetch one testimonial.
// PATCH /api/testimonials/:id — update a testimonial (partial).
// DELETE /api/testimonials/:id — delete a testimonial.

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { testimonialSchema } from "../route";
import { invalid } from "../../services/route";

const partialSchema = testimonialSchema.partial();

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) {
    return NextResponse.json({ success: false, data: null, error: "Testimonial not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: testimonial, error: null });
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const { data: d, response } = invalid(body, partialSchema);
  if (!d) return response;
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(d.client !== undefined ? { client: d.client } : {}),
        ...(d.role !== undefined ? { role: d.role } : {}),
        ...(d.quote !== undefined ? { quote: d.quote } : {}),
        ...(d.rating !== undefined ? { rating: d.rating } : {}),
        ...(d.active !== undefined ? { active: d.active } : {}),
        ...(d.sortOrder !== undefined ? { sortOrder: d.sortOrder } : {}),
      },
    });
    return NextResponse.json({ success: true, data: testimonial, error: null });
  } catch (e) {
    console.error(`PATCH /api/testimonials/${id} failed:`, e);
    return NextResponse.json({ success: false, data: null, error: "Testimonial not found" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  try {
    const testimonial = await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true, data: testimonial, error: null });
  } catch (e) {
    console.error(`DELETE /api/testimonials/${id} failed:`, e);
    return NextResponse.json({ success: false, data: null, error: "Testimonial not found" }, { status: 404 });
  }
}
