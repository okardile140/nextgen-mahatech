"use client";

import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";

const reasons = [
  { t: "Speak your language", d: "We understand your compliance needs, KPIs and operating model — not just your tech.", icon: "chat" },
  { t: "Industry-proven patterns", d: "Reusable, battle-tested solutions accelerate delivery and reduce risk.", icon: "layers" },
  { t: "End-to-end ownership", d: "One team for design, build, deploy and support — no finger-pointing.", icon: "sync" },
  { t: "Outcomes, not hours", d: "We're measured on the results your business sees, not seat time.", icon: "target" },
];

const icons: Record<string, React.ReactNode> = {
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  layers: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  sync: <path d="M3 12a9 9 0 1 1 2.64 6.36L3 21 M21 12a9 9 0 1 0-2.64-6.36L21 3" />,
  target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
};

export default function PortfolioWhy() {
  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Why work with us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Built for teams that value{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              substance
            </span>
          </h2>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 gap-6" style={{ perspective: 1200 }}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.t}
              className="rounded-2xl bg-white border border-slate-200/70 p-8 flex gap-4 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50, rotateY: i % 2 ? 20 : -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  {icons[r.icon]}
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{r.t}</h3>
                <p className="mt-1 text-slate-600 text-sm leading-relaxed">{r.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
