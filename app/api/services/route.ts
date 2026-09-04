// Next.js App Router ROUTE HANDLER
// GET  /api/services         — public list of active services.
// GET  /api/services?all=1   — everything incl. inactive (admin panel).
// POST /api/services         — create a service (admin panel).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

const strArr = (maxItems: number, maxLen: number) =>
  z
    .array(z.string().trim().max(maxLen, `Each item must be under ${maxLen} characters`))
    .max(maxItems, `At most ${maxItems} items allowed`)
    .optional()
    .default([])
    .transform((a) => a.map((s) => s.trim()).filter(Boolean));

export const serviceSchema = z.object({
  title: z.string().trim().min(2, "Title needs at least 2 characters").max(120, "Title must be under 120 characters"),
  slug: z
    .string()
    .trim()
    .max(140)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v), {
      message: "Slug may only contain lowercase letters, numbers and hyphens",
    }),
  tagline: z.string().trim().max(160, "Tagline must be under 160 characters").optional().or(z.literal("")),
  description: z.string().trim().max(2000, "Short description must be under 2000 characters").optional().or(z.literal("")),
  longDescription: z.string().trim().max(6000, "Full description must be under 6000 characters").optional().or(z.literal("")),
  icon: z.string().trim().max(60).optional().or(z.literal("")),
  tone: z.string().trim().max(120).optional().or(z.literal("")),
  features: z.union([strArr(30, 200), z.string().trim().max(6000)]).optional(),
  deliverables: z.union([strArr(30, 200), z.string().trim().max(6000)]).optional(),
  active: z.boolean({ error: "Visible must be true or false" }).optional(),
  sortOrder: z.coerce.number().int("Order must be a whole number").min(0, "Order can't be negative").max(9999, "Order must be under 10000").optional(),
});

export type Issue = { field: string; message: string };

export function invalid(body: unknown, schema: z.ZodTypeAny) {
  const parsed = schema.safeParse(body);
  if (parsed.success) return { data: parsed.data as any, response: null };
  const issues: Issue[] = parsed.error.issues.map((i) => ({
    field: String(i.path[0] ?? "form"),
    message: i.message,
  }));
  return {
    data: null,
    response: NextResponse.json({ success: false, data: null, error: issues[0]?.message ?? "Invalid payload", issues }, { status: 422 }),
  };
}

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
  const { data: d, response } = invalid(body, serviceSchema);
  if (!d) return response;
  try {
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
  } catch (e) {
    console.error("POST /api/services failed:", e);
    return NextResponse.json(
      { success: false, data: null, error: "Could not create service. Please try again." },
      { status: 500 }
    );
  }
}
