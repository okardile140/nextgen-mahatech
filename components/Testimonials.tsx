"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { TestimonialItem } from "../lib/types";

const fallback: TestimonialItem[] = [
  { id: "t1", client: "Rahul Deshmukh", role: "Operations Director, Manufacturing SME", quote: "NextGen Mahatech rebuilt our order-management platform. Delivery was on-time and our operations run 40% faster today.", rating: 5 },
  { id: "t2", client: "Sneha Patil", role: "CEO, Retail Chain (Nashik)", quote: "Their team deployed our entire IT and network infrastructure across three branches. Truly a one-stop partner.", rating: 5 },
  { id: "t3", client: "Amit Joshi", role: "Founder, Logistics Startup", quote: "From ERP customisation to AMC support, response times are quick and the engineers understand our business.", rating: 5 },
  { id: "t4", client: "Priya Kulkarni", role: "HR Head, Fintech", quote: "Professional, transparent, and deadline-driven. They feel like an extension of our own team rather than a vendor.", rating: 5 },
];

const initials = (name: string) =>
  name.trim().split(/\s+/).map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "?";

const stars = (rating: number) => Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col rounded-2xl bg-white border border-slate-200/70 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-1 mb-5 text-amber-400" aria-label={`${stars(t.rating)} out of 5 stars`}>
        {Array.from({ length: stars(t.rating) }).map((_, r) => (
          <svg key={r} className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      {/* Clamped: any admin quote length keeps every card identical */}
      <p className="text-slate-700 leading-relaxed line-clamp-5 break-words">“{t.quote}”</p>
      <div className="mt-auto flex items-center gap-3 pt-6">
        <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white text-sm font-bold flex items-center justify-center">
          {initials(t.client)}
        </div>
        <div className="min-w-0 border-t border-slate-100 pt-4 flex-1">
          <div className="font-semibold text-slate-900 text-sm line-clamp-1 break-words">{t.client}</div>
          {t.role ? (
            <div className="text-xs text-slate-500 line-clamp-1 break-words">{t.role}</div>
          ) : (
            <div className="text-xs text-transparent select-none">—</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Static seeds render instantly (no layout shift); replaced by exact live data on success.
  const [items, setItems] = useState<TestimonialItem[]>(fallback);

  useEffect(() => {
    let active = true;
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((res) => {
        if (active && Array.isArray(res?.data)) {
          setItems((res.data as TestimonialItem[]).filter((t) => (t as any).active !== false));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Cards are duplicated once so the -50% keyframe loop restarts seamlessly.
  const doubled = useMemo(() => [...items, ...items], [items]);
  // Faster for fewer cards, slower for many — keeps the pace comfortable.
  const duration = useMemo(() => Math.max(18, items.length * 9), [items]);

  // Nothing live to show → hide the section instead of an empty shell.
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Client stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Trusted by leaders who value{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              results over jargon
            </span>
          </h2>
        </div>
      </div>

      {/* Auto horizontal slider — pauses on hover */}
      <div className="tm-marquee relative" aria-label="Client testimonials slider">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent" />

        <div
          className="tm-track flex w-max"
          style={{ "--tm-duration": `${duration}s` } as CSSProperties}
        >
          {doubled.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="shrink-0 w-[320px] sm:w-[360px] md:w-[400px] mr-6"
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
