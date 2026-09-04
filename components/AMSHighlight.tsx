"use client";

import { motion } from "motion/react";
import { Reveal3D, Tilt } from "../lib/anim";

const modules = [
  { l: "Members", tone: "from-indigo-500 to-blue-600", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
  { l: "Vendors", tone: "from-rose-500 to-red-600", icon: "M3 3h18l-2 8H5L3 3zM5 11v10h14V11" },
  { l: "Events", tone: "from-sky-500 to-blue-600", icon: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18" },
  { l: "Renewals", tone: "from-emerald-500 to-teal-600", icon: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" },
  { l: "Notices", tone: "from-pink-500 to-rose-600", icon: "M3 11l18-7v16L3 13z" },
  { l: "Committee", tone: "from-cyan-500 to-blue-600", icon: "M9 7a3 3 0 100 6 3 3 0 000-6zM17 7a3 3 0 100 6 3 3 0 000-6zM3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" },
  { l: "Certificates", tone: "from-amber-500 to-orange-600", icon: "M12 2a6 6 0 100 12 6 6 0 000-12zM8.21 13.89L7 22l5-3 5 3-1.21-8.11" },
  { l: "Reports", tone: "from-blue-500 to-indigo-600", icon: "M12 20V10M18 20V4M6 20v-4" },
];

const bullets = [
  "12+ powerful modules across Mobile, Web & Cloud",
  "Real-time analytics dashboard for your team",
  "Push notifications, digital certificates & payment tracking",
  "Enterprise-grade security with cloud-based access",
];

export default function AMSHighlight() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal3D variant="slide3D">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-indigo-500/30 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Flagship Product
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Association{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Management Solution
              </span>
            </h2>
            <p className="mt-5 text-slate-600 text-lg leading-relaxed">
              One platform for complete association management. From members
              and events to communications, renewals, vendors and reports —
              everything streamlined in one secure and intelligent system.
            </p>

            <div className="mt-8 space-y-3">
              {bullets.map((f, i) => (
                <motion.div
                  key={f}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-white flex items-center justify-center">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-slate-700 font-medium">{f}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                href="/solutions/ams"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30"
                whileHover={{ y: -6, rotateX: 12, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                Explore the Platform
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </motion.a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 hover:border-indigo-400 hover:text-indigo-600 transition"
              >
                Request a Demo
              </a>
            </div>
          </Reveal3D>

          <Reveal3D delay={0.15}>
            {/* Module tiles link to the AMS product page */}
            <a href="/solutions/ams" className="block" aria-label="Explore the AMS product">
            <div className="grid grid-cols-4 gap-3" style={{ perspective: 1400 }}>
              {modules.map((m, i) => (
                <motion.div
                  key={m.l}
                  initial={{ opacity: 0, y: 40, rotateY: i % 2 ? 30 : -30, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                >
                  <Tilt max={16} className="aspect-square">
                    <div className={`h-full rounded-2xl bg-gradient-to-br ${m.tone} p-3 shadow-xl flex flex-col items-center justify-center text-white text-center`}>
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d={m.icon} />
                      </svg>
                      <div className="mt-2 text-[10px] font-semibold tracking-wide">{m.l}</div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
            </a>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                One platform. All solutions.
              </div>
              <div className="mt-1 text-sm text-slate-700">
                Built for Mobile · Cloud · Web · iOS
              </div>
            </div>
          </Reveal3D>
        </div>
      </div>
    </section>
  );
}
