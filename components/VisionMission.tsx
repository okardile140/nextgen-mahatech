"use client";

import { motion } from "motion/react";
import { Reveal3D, Tilt } from "../lib/anim";
import { amsWhyChoose } from "../lib/ams-data";

export default function VisionMission() {
  return (
    <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.25), transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <Reveal3D variant="slide3D" className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 text-indigo-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            About NextGen MahaTech
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Building smart digital solutions for{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
              modern associations
            </span>
          </h2>
          <p className="mt-5 text-slate-300 text-lg leading-relaxed">
            NextGen MahaTech is a technology-driven software company
            specialising in Association Management Systems. We help associations
            and organisations streamline their operations through smart mobile
            applications, powerful dashboards, and cloud-based digital
            solutions.
          </p>
        </Reveal3D>

        <div className="grid md:grid-cols-2 gap-6 mb-14" style={{ perspective: 1400 }}>
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -25, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <Tilt max={10} className="h-full">
              <div className="h-full rounded-3xl bg-gradient-to-br from-indigo-600/30 to-blue-600/10 backdrop-blur border border-white/10 p-8 md:p-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-xl shadow-indigo-500/40">
                  <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="mt-6 text-2xl font-bold">Vision</h3>
                <p className="mt-3 text-slate-300 leading-relaxed">
                  To become India&apos;s most trusted technology partner for
                  associations by delivering innovative, scalable, and
                  user-friendly digital solutions.
                </p>
              </div>
            </Tilt>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: 25, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Tilt max={10} className="h-full">
              <div className="h-full rounded-3xl bg-gradient-to-br from-cyan-500/30 to-teal-600/10 backdrop-blur border border-white/10 p-8 md:p-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-xl shadow-cyan-500/40">
                  <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h3 className="mt-6 text-2xl font-bold">Mission</h3>
                <p className="mt-3 text-slate-300 leading-relaxed">
                  To empower associations with modern technology that simplifies
                  operations, strengthens member engagement, and accelerates
                  digital growth.
                </p>
              </div>
            </Tilt>
          </motion.div>
        </div>

        <Reveal3D className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold">
            Why Choose NextGen MahaTech?
          </h3>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {amsWhyChoose.map((w, i) => (
            <motion.div
              key={w}
              className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 px-5 py-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 30, rotateX: 40 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <span className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center shadow">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span className="font-medium">{w}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
