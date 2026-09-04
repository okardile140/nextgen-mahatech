// PortfolioShowcase — dynamic grid of admin-managed portfolio items.
// Live API data is used exactly as returned; static seeds only on error.

"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";
import { portfolioItems as staticItems } from "../../lib/seed-data";
import type { PortfolioItem } from "../../lib/types";

const tones = [
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
];

function CardVisual({ item, index }: { item: PortfolioItem; index: number }) {
  const [broken, setBroken] = useState(false);
  if (item.image && !broken) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={item.image}
        alt={item.title}
        onError={() => setBroken(true)}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <div className={`h-36 bg-gradient-to-br ${tones[index % tones.length]} relative overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute bottom-4 left-5 text-5xl font-bold text-white/40">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function PortfolioShowcase() {
  const [items, setItems] = useState<PortfolioItem[] | null>(staticItems);

  useEffect(() => {
    let active = true;
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((res) => {
        if (active && Array.isArray(res?.data)) {
          setItems((res.data as PortfolioItem[]).filter((p) => p.active !== false));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Nothing live to show → hide the section instead of an empty shell.
  if (items !== null && items.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Selected Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Projects we&apos;re{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              proud of
            </span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg">
            A snapshot of platforms and solutions delivered for our clients.
          </p>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(items ?? []).map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: Math.min(i, 6) * 0.08 }}
              className="group flex h-full min-h-[300px] flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all"
            >
              <div className="shrink-0">
                <CardVisual item={p} index={i} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {p.category ? (
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 line-clamp-1 break-words">
                    {p.category}
                  </div>
                ) : (
                  <div className="text-xs font-semibold uppercase tracking-wider text-transparent select-none">—</div>
                )}
                <h3 className="mt-2 text-xl font-bold text-slate-900 line-clamp-2 break-words group-hover:text-indigo-700 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3 break-words">{p.description}</p>
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-indigo-600 hover:gap-2.5 transition-all"
                  >
                    View project
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <span className="mt-auto pt-4" />
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
