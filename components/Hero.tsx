"use client";

import { motion } from "motion/react";

// SSR-safe: every WebGL call inside Hero3DCanvas runs in useEffect, which
// never executes on the server, so a plain import is correct here.
import Hero3DCanvas from "./Hero3DCanvas";

export default function Hero() {
  return (
    // The dark base sits on the section itself. Using a `-z-10` child here is
    // unsafe: negative-z layers paint *before* the normal block backgrounds of
    // ancestors, so any wrapper with `bg-white` would cover it and leave white
    // text on a white page.
    <section
      id="home"
      className="relative isolate overflow-hidden bg-slate-950 pt-28 md:pt-32 pb-20 md:pb-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(56,189,248,0.25), transparent 45%), radial-gradient(circle at 50% 90%, rgba(168,85,247,0.25), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-100 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              NEXTGEN MAHATECH · Nashik, India
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_18px_rgba(2,6,23,0.55)]">
              Engineering the{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-indigo-200 via-sky-200 to-cyan-100 bg-clip-text text-transparent">
                  Next Generation
                </span>
                <svg viewBox="0 0 300 12" className="absolute -bottom-2 left-0 w-full" fill="none">
                  <path d="M2 8 Q 75 2 150 6 T 298 5" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#67e8f9" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              of Business Technology
            </h1>

            <p className="mt-8 text-lg text-slate-200 leading-relaxed max-w-xl">
              <span className="font-semibold text-white">
                Innovate · Build · Elevate.
              </span>{" "}
               <br/>
               We build smart digital solutions for modern associations and
              growing businesses — powered by our flagship Association
              Management Solution and full-service IT expertise.
              

            
            </p>
          
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                Start Your Project
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition">
                Explore Services
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg border-t border-white/20 pt-8">
              {[
                { n: "150+", l: "Projects Delivered" },
                { n: "50+", l: "Happy Clients" },
                { n: "24/7", l: "Support Available" },
              ].map((s) => (
                <div key={s.l}>
                  {/* Solid white — the old gradient faded to slate-300 at the
                      baseline, which made the numerals look washed out. */}
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {s.n}
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-300">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visible on every breakpoint — shorter on phones */}
          <div className="relative mt-4 lg:mt-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl h-[340px] sm:h-[420px] lg:h-[500px]">
      {/* Live WebGL hologram fills the whole stage */}
      <div className="absolute inset-0 z-0">
        <Hero3DCanvas />
      </div>

      {/* Floating chips orbit above the hologram */}
      <FloatingChip className="top-2 left-0 z-10" icon="cloud" label="Cloud" tone="from-sky-500 to-blue-600" dz={90} />
      <FloatingChip className="top-8 right-0 z-10" icon="shield" label="Security" tone="from-emerald-500 to-teal-600" dz={130} />
      <FloatingChip className="bottom-20 left-0 z-10" icon="code" label="Software" tone="from-indigo-500 to-purple-600" dz={60} />
      <FloatingChip className="bottom-10 right-2 z-10" icon="chip" label="AI/ML" tone="from-fuchsia-500 to-pink-600" dz={110} />
      <FloatingChip className="top-1/2 -right-2 z-10 hidden sm:block" icon="mobile" label="Mobile" tone="from-amber-500 to-orange-600" dz={160} />
    </div>
  );
}

const icons: Record<string, React.ReactNode> = {
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  code: <><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></>,
  chip: <><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></>,
  mobile: <><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" /></>,
};

function FloatingChip({ className = "", icon, label, tone, dz = 80 }: { className?: string; icon: string; label: string; tone: string; dz?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ y: [0, -12, 0], rotateX: [2, -3, 2], rotateY: [-4, 4, -4], z: [0, dz, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Opaque gradient chips: no backdrop-blur here — blurring behind an
          opaque element only forces the browser to re-sample the live WebGL
          framebuffer underneath every frame (a known flicker/stutter source)
          with zero visual benefit. */}
      <div className={`flex items-center gap-2 rounded-2xl bg-gradient-to-br ${tone} px-3.5 py-2.5 shadow-xl shadow-black/30 border border-white/20`}>
        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {icons[icon]}
        </svg>
        <span className="text-xs font-semibold text-white">{label}</span>
      </div>
    </motion.div>
  );
}
