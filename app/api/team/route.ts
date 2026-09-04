// Next.js App Router ROUTE HANDLER
// GET  /api/team        — public list of active team members.
// GET  /api/team?all=1  — everything incl. inactive (admin panel).
// POST /api/team        — create a team member (admin panel).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";
import { invalid } from "../services/route";

export const dynamic = "force-dynamic";

const urlOrPath = (label: string) =>
  z
    .string()
    .trim()
    .max(500, `${label} is too long`)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || v.startsWith("/") || /^https?:\/\/.+\..+/.test(v), {
      message: `${label} must be a full https:// URL or a site path like /photo.png`,
    });

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2, "Name needs at least 2 characters").max(120, "Name must be under 120 characters"),
  role: z.string().trim().max(160, "Role must be under 160 characters").optional().or(z.literal("")),
  image: urlOrPath("Photo URL"),
  tone: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Bio needs at least 10 characters").max(4000, "Bio must be under 4000 characters"),
  quote: z.string().trim().max(500, "Quote must be under 500 characters").optional().or(z.literal("")),
  active: z.boolean({ error: "Visible must be true or false" }).optional(),
  sortOrder: z.coerce.number().int("Order must be a whole number").min(0, "Order can't be negative").max(9999, "Order must be under 10000").optional(),
});

export async function GET(req: NextRequest) {
  try {
    const all = req.nextUrl.searchParams.get("all") === "1";
    const members = await prisma.teamMember.findMany(
      all ? undefined : { where: { active: true } }
    );
    return NextResponse.json({ success: true, data: members, error: null });
  } catch {
    const { teamMembers: seed } = await import("../../../lib/seed-data");
    return NextResponse.json({ success: true, data: seed, error: null });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { data: d, response } = invalid(body, teamMemberSchema);
  if (!d) return response;
  try {
    const member = await prisma.teamMember.create({
      data: {
        name: d.name,
        role: d.role ? d.role : null,
        image: d.image ? d.image : null,
        tone: d.tone ? d.tone : null,
        message: d.message,
        quote: d.quote ? d.quote : null,
        active: d.active,
        sortOrder: d.sortOrder,
      },
    });
    return NextResponse.json({ success: true, data: member, error: null }, { status: 201 });
  } catch (e) {
    console.error("POST /api/team failed:", e);
    return NextResponse.json(
      { success: false, data: null, error: "Could not create team member. Please try again." },
      { status: 500 }
    );
  }
}
