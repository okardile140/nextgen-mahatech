"use client";

import { motion } from "motion/react";
import AMSDashboardMockup from "./DashboardMockup";

export default function AMSHero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24 bg-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.4), transparent 45%), radial-gradient(circle at 80% 30%, rgba(56,189,248,0.3), transparent 45%), radial-gradient(circle at 50% 90%, rgba(168,85,247,0.25), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <motion.div
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, y: 60, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-indigo-200 uppercase mb-5">
              Flagship Product · Innovate • Build • Elevate
            </div>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.02]">
              Association{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
                Management
              </span>{" "}
              Solution
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
              One platform for complete association management. From members
              and events to renewals, vendors, communications and reports —
              everything is now streamlined in one secure and intelligent
              system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Mobile", "Cloud", "Web", "iOS", "Secure"].map((c) => (
                <span key={c} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold text-slate-200 backdrop-blur">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
          <AMSDashboardMockup />
        </div>
      </div>
    </section>
  );
}
