"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { TestimonialItem } from "../lib/types";
import { Tilt } from "../lib/anim";

const fallback: TestimonialItem[] = [
  { id: "t1", client: "Rahul Deshmukh", role: "Operations Director, Manufacturing SME", quote: "NextGen Mahatech rebuilt our order-management platform. Delivery was on-time and our operations run 40% faster today.", rating: 5 },
  { id: "t2", client: "Sneha Patil", role: "CEO, Retail Chain (Nashik)", quote: "Their team deployed our entire IT and network infrastructure across three branches. Truly a one-stop partner.", rating: 5 },
  { id: "t3", client: "Amit Joshi", role: "Founder, Logistics Startup", quote: "From ERP customisation to AMC support, response times are quick and the engineers understand our business.", rating: 5 },
];

const initials = (name: string) =>
  name.trim().split(/\s+/).map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "?";

const stars = (rating: number) => Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));

function Card({ t }: { t: TestimonialItem }) {
  return (
    <Tilt max={9} className="h-full">
      <div className="flex h-full min-h-[280px] w-[85vw] max-w-[380px] shrink-0 flex-col rounded-2xl bg-white border border-slate-200/70 p-8 shadow-sm hover:shadow-xl transition-all sm:w-[360px]">
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
    </Tilt>
  );
}

export default function Testimonials() {
  // Static seeds render instantly (no layout shift); replaced by exact live data on success.
  const [items, setItems] = useState<TestimonialItem[]>(fallback);
  const trackRef = useRef<HTMLDivElement>(null);

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

  // Pause the marquee when scrolled out of view or the tab is hidden —
  // compositor-only animation, but no reason to burn battery off-screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let inView = true;
    const sync = () => {
      el.style.animationPlayState = inView && document.visibilityState === "visible" ? "" : "paused";
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [items.length]);

  // Nothing live to show → hide the section instead of an empty shell.
  if (items.length === 0) return null;

  // Seamless loop needs an even number of identical sets sliding -50%.
  // Few items → more copies so the track always fills wide screens.
  const copies = items.length >= 3 ? 2 : 4;
  const track = Array.from({ length: copies }).flatMap((_, c) => items.map((t) => ({ ...t, key: `${t.id}-c${c}` })));
  // Constant ~55px/s scroll speed regardless of item count.
  const duration = Math.max(18, ((items.length * 384 * copies) / 2 / 55));

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[80%] rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
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

      {/* Full-bleed marquee with soft edge fades; pauses on hover.
          Reduced-motion users get a static, manually scrollable row. */}
      <div className="relative overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
        <div
          ref={trackRef}
          className="animate-marquee flex w-max gap-6 px-5 hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: `${duration}s` }}
        >
          {track.map((t) => (
            <motion.div
              key={t.key}
              className="h-full shrink-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55 }}
            >
              <Card t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
