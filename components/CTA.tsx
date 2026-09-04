"use client";

import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900 p-10 md:p-16 text-white shadow-2xl shadow-indigo-500/20">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                Let's build something{" "}
                <span className="bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                  remarkable together.
                </span>
              </h2>
              <p className="mt-5 text-indigo-100 text-lg max-w-xl">
                Whether you're modernising legacy systems or launching something
                brand new — our team is ready to help you plan, build and grow.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-stretch" style={{ perspective: 900 }}>
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-900 shadow-xl"
                whileHover={{ y: -6, rotateX: 12, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                Book a Free Consultation
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </motion.a>
              <motion.a
                href="tel:9579495373"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-7 py-4 text-sm font-semibold text-white"
                whileHover={{ y: -6, rotateX: 12, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call +91 95794 95373
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
