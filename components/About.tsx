"use client";

import { motion, useReducedMotion } from "motion/react";

const features = [
  { title: "Consult-first approach", description: "We understand your operations before recommending technology, ensuring every solution fits your association’s real-world needs." },
  { title: "Industry-focused expertise", description: "Specialists in Association Management Systems with deep understanding of how associations, committees and members interact." },
  { title: "Dedicated long-term support", description: "A responsive team that stays with you after launch—maintaining, improving and supporting your platform as you grow." },
];

export default function About() {
  const reducedMotion = useReducedMotion();
  const reveal = (rotation: { rotateX?: number; rotateY?: number; scale?: number }, delay = 0) => ({
    initial: reducedMotion ? false as const : { opacity: 0, ...rotation },
    whileInView: { opacity: 1, rotateX: 0, rotateY: 0, scale: 1 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay },
  });

  return (
    <section id="about" className="relative overflow-hidden bg-slate-50 py-24 md:py-32">
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4" style={{ perspective: 1400 }}>
              <div className="space-y-4">
                <motion.div {...reveal({ rotateX: 35 })}>
                  <div className="flex aspect-square flex-col justify-between rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 p-6 text-white shadow-xl shadow-indigo-500/20">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    <div><div className="text-3xl font-bold">10+</div><div className="text-sm text-indigo-100">Years combined expertise</div></div>
                  </div>
                </motion.div>
                <motion.div {...reveal({ rotateX: 35 }, 0.12)}>
                  <div className="flex aspect-[4/3] flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-xl">
                    <svg className="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" />
                    </svg>
                    <div><div className="text-2xl font-bold text-slate-900">98%</div><div className="text-sm text-slate-500">Client retention</div></div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4 pt-10">
                <motion.div {...reveal({ rotateY: 60 })}>
                  <div className="flex aspect-[4/3] flex-col justify-between rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
                    <svg className="h-8 w-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                    <div><div className="text-2xl font-bold">Full-Stack</div><div className="text-sm text-slate-400">In-house engineering</div></div>
                  </div>
                </motion.div>
                <motion.div {...reveal({ rotateY: -45, scale: 0.8 }, 0.1)}>
                  <div className="flex aspect-square flex-col justify-between rounded-3xl bg-gradient-to-br from-cyan-400 to-teal-500 p-6 text-white shadow-xl shadow-cyan-500/20">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <div><div className="text-3xl font-bold">150+</div><div className="text-sm text-cyan-50">Successful deliveries</div></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
              About NextGen Mahatech
            </div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
              About{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">NextGen MahaTech</span>
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Innovate · Build · Elevate</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              NextGen MahaTech is a technology-driven software company specializing in Association Management Systems. We help associations and organizations streamline their operations through smart mobile applications, powerful dashboards, and cloud-based digital solutions.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Our mission is to simplify management, improve communication, and drive digital transformation for associations of every scale.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/20">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  </div>
                  <div><div className="font-semibold text-slate-900">{feature.title}</div><div className="mt-0.5 text-sm text-slate-600">{feature.description}</div></div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800">
                Talk to our team
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
              <a href="/about" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-indigo-400 hover:text-indigo-600">
                More about us
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
