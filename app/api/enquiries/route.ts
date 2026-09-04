// Next.js App Router ROUTE HANDLER
// POST /api/enquiries — validate the contact-form payload.
//
// NOTE: there is no admin panel and no enquiry storage. Submissions are
// validated and acknowledged so the contact form UX keeps working, but
// nothing is persisted. To receive enquiries, forward the validated payload
// to an email service / CRM here (e.g. nodemailer, Resend) instead of
// re-introducing a database store.

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: parsed.error.issues[0]?.message ?? "Invalid payload",
      },
      { status: 422 }
    );
  }

  // TODO: send `parsed.data` via email/CRM if you want to receive enquiries.
  return NextResponse.json({ success: true, data: null, error: null });
}
