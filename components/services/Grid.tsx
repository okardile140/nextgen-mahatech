"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Tilt, Reveal3D } from "../../lib/anim";
import { serviceDetails as staticServices, serviceIcons, type ServiceDetail } from "../../lib/services-data";

type ApiService = ServiceDetail & { id?: string; active?: boolean; sortOrder?: number };

export default function ServicesGrid() {
  const [services, setServices] = useState<ApiService[]>(staticServices);

  useEffect(() => {
    let active = true;
    fetch("/api/services")
      .then((r) => r.json())
      .then((res) => {
        if (!active) return;
        if (Array.isArray(res?.data) && res.data.length > 0) {
          const rows = (res.data as ApiService[])
            .filter((s) => s.active !== false)
            .map((s) => ({
              slug: s.slug,
              title: s.title,
              tagline: s.tagline ?? "",
              description: s.description ?? "",
              longDescription: s.longDescription ?? s.description ?? "",
              icon: s.icon ?? "code",
              tone: s.tone ?? "from-indigo-500 to-blue-600",
              features: Array.isArray(s.features) ? s.features : [],
              deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
              id: s.id,
              active: s.active,
              sortOrder: s.sortOrder,
            }));
          setServices(rows);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Full lifecycle delivery for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              every need
            </span>
          </h2>
        </Reveal3D>

        <div className="space-y-6">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <Tilt max={5} glare>
                <div className={`rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-6 md:p-10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all ${i % 2 ? "md:flex-row-reverse" : ""} md:flex gap-8 items-start`}>
                  <div className={`shrink-0 h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-gradient-to-br ${s.tone} flex items-center justify-center shadow-lg`}>
                    <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {serviceIcons[s.icon] ?? serviceIcons.code}
                    </svg>
                  </div>

                  <div className="flex-1 mt-4 md:mt-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">{s.title}</h3>
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        {s.tagline}
                      </span>
                    </div>
                    <p className="mt-3 text-slate-600 leading-relaxed">{s.longDescription}</p>

                    <div className="mt-5 grid sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key capabilities</div>
                        <ul className="space-y-1.5">
                          {s.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                              <svg className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">What you get</div>
                        <ul className="space-y-1.5">
                          {s.deliverables.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                              <svg className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
