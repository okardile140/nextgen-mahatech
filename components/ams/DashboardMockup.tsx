"use client";

import { motion } from "motion/react";

export default function AMSDashboardMockup() {
  return (
    <motion.div
      className="relative"
      style={{ perspective: 1400 }}
      initial={{ opacity: 0, rotateY: -25, y: 40 }}
      animate={{ opacity: 1, rotateY: 0, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-blue-500/20 to-cyan-500/30 blur-3xl rounded-[2rem]" />
      <motion.div
        className="relative rounded-2xl bg-slate-900 border border-white/10 p-4 shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [-4, 4, -4], rotateX: [2, -1, 2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between px-2 pb-3 border-b border-white/10">
          <div className="text-xs font-bold text-white">ABC Association</div>
          <div className="text-[10px] text-slate-400">Admin</div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {[
            { l: "Total Members", n: "2,438", c: "text-indigo-300" },
            { l: "Active", n: "1,897", c: "text-emerald-300" },
            { l: "Events", n: "24", c: "text-amber-300" },
            { l: "Revenue", n: "$25K", c: "text-cyan-300" },
          ].map((k) => (
            <div key={k.l} className="rounded-lg bg-white/5 border border-white/5 p-2">
              <div className={`text-sm font-bold ${k.c}`}>{k.n}</div>
              <div className="text-[9px] text-slate-400">{k.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 h-24 rounded-lg bg-white/5 border border-white/5 p-2 flex items-end gap-1">
          {[38, 45, 52, 48, 58, 65, 60, 72, 78, 75, 82, 88].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-indigo-500 to-cyan-400"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: 0.4 + i * 0.05 }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        className="absolute -bottom-8 -right-4 w-32 h-56 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ y: [0, -8, 0], rotateZ: [-4, -6, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full w-full p-2">
          <div className="text-[8px] font-bold text-white mb-1">ABC Association</div>
          <div className="grid grid-cols-3 gap-1">
            {["Dash", "Mem", "Vend", "Evts", "Ren", "Com"].map((l) => (
              <div key={l} className="aspect-square rounded bg-white/10 border border-white/5 flex items-center justify-center text-[7px] text-white/70">
                {l}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
