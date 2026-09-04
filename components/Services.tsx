"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { ServiceItem } from "../lib/types";
import { Tilt } from "../lib/anim";

const iconPaths: Record<string, React.ReactNode> = {
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  grid: (
    <>
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  chart: (
    <>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
};

const tones = [
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-red-600",
  "from-lime-500 to-green-600",
];

const fallback: ServiceItem[] = [
  { id: "s1", slug: "custom", title: "Custom Software Development", tagline: "Tailor-made systems", description: "Web, desktop and SaaS applications engineered to fit your business.", icon: "code", sortOrder: 1 },
  { id: "s2", slug: "web", title: "Website Design & Development", tagline: "Websites that convert", description: "Corporate sites and platforms with modern UX and solid SEO.", icon: "monitor", sortOrder: 2 },
];

export default function Services() {
  // Static seeds render instantly (SEO + no empty shell); replaced by exact
  // live API data on success, static fallback only on error.
  const [services, setServices] = useState<ServiceItem[]>(fallback);

  useEffect(() => {
    let active = true;
    fetch("/api/services")
      .then((r) => r.json())
      .then((res) => {
        if (!active) return;
        if (Array.isArray(res?.data)) {
          setServices((res.data as ServiceItem[]).filter((s) => s.active !== false));
        } else {
          setServices(fallback);
        }
      })
      .catch(() => active && setServices(fallback));
    return () => {
      active = false;
    };
  }, []);

  // Nothing live to show → hide the section instead of an empty shell.
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            What we do
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            End-to-end IT services that{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              move your business forward
            </span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg">
            From strategy and design to development, deployment and lifetime
            support — one accountable partner for every layer of your tech stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: 1200 }}>
          {(services ?? []).map((s, i) => (
            <motion.div
              key={s.id}
              className="h-full"
              initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Tilt max={12} className="h-full">
                {/* Every card links to the full Services page */}
                <a href="/services" className="group flex h-full min-h-[240px] flex-col rounded-2xl bg-white border border-slate-200/70 p-6 hover:border-transparent hover:shadow-2xl hover:shadow-indigo-500/10 transition-all">
                  <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${tones[i % tones.length]} flex items-center justify-center shadow-lg ring-4 ring-transparent group-hover:ring-indigo-100 transition-all`}>
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {iconPaths[s.icon ?? "code"] ?? iconPaths.code}
                    </svg>
                  </div>
                  {/* Clamped + break-words: any admin text length keeps card shape */}
                  <h3 className="mt-5 font-bold text-slate-900 text-lg leading-snug line-clamp-2 break-words group-hover:text-indigo-700 transition-colors">{s.title}</h3>
                  {s.tagline ? (
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 line-clamp-1 break-words">{s.tagline}</div>
                  ) : (
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-transparent select-none">—</div>
                  )}
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3 break-words">{s.description}</p>
                  <div className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </Tilt>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/services" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800">
            View All Services
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
