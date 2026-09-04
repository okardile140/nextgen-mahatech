"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal3D, Tilt } from "../../lib/anim";
import { amsFeatures as staticFeatures, amsIcons } from "../../lib/ams-data";

type FeatureRow = { key: string; title: string; desc: string; icon: string; tone: string };

const normalize = (rows: any[]): FeatureRow[] =>
  rows.map((f, i) => ({
    key: String(f.id ?? f.t ?? i),
    title: String(f.title ?? f.t ?? ""),
    desc: String(f.description ?? f.d ?? ""),
    icon: String(f.icon ?? "settings"),
    tone: String(f.tone ?? "from-indigo-500 to-blue-600"),
  }));

export default function AMSFeatures() {
  const [features, setFeatures] = useState<FeatureRow[]>(() => normalize(staticFeatures));

  useEffect(() => {
    let active = true;
    fetch("/api/ams-features")
      .then((r) => r.json())
      .then((res) => {
        if (active && Array.isArray(res?.data) && res.data.length > 0) {
          setFeatures(normalize(res.data));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="ams-features" className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
            Complete Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Everything you need,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              all in one place
            </span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg">
            One platform. All solutions. Our all-in-one AMS empowers
            associations to manage, engage, and grow — seamlessly.
          </p>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" style={{ perspective: 1400 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.key}
              className="h-full"
              initial={{ opacity: 0, y: 50, rotateX: 25, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
            >
              <Tilt max={12} className="h-full">
                <div className="h-full rounded-2xl bg-white border border-slate-200/70 p-6 hover:border-transparent hover:shadow-2xl hover:shadow-indigo-500/10 transition-all">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.tone} flex items-center justify-center shadow-lg`}>
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {amsIcons[f.icon] ?? amsIcons.settings}
                    </svg>
                  </div>
                  <h4 className="mt-5 font-bold text-slate-900">{f.title}</h4>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
