
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";
import { teamMembers as staticTeam } from "../../lib/seed-data";
import type { TeamMember } from "../../lib/types";

const initials = (name: string) =>
  name.trim().split(/\s+/).map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "?";

function TeamPhoto({ member, index }: { member: TeamMember; index: number }) {
  const [broken, setBroken] = useState(false);
  const src = member.image?.trim() ?? "";

  // No photo (or a broken URL) → initials tile in the same fixed box,
  // so card alignment never shifts no matter what the admin saves.
  if (!src || broken) {
    return (
      <div className={`relative mx-auto mt-8 h-[280px] w-full max-w-[280px] overflow-hidden rounded-2xl bg-gradient-to-br ${member.tone ?? "from-indigo-500 to-blue-600"} flex items-center justify-center`}>
        <span className="text-7xl font-bold text-white/80">{initials(member.name)}</span>
      </div>
    );
  }

  const remote = src.startsWith("http");
  return (
    <div className="relative mx-auto mt-8 h-[280px] w-full max-w-[280px] overflow-hidden rounded-2xl bg-slate-100">
      <Image
        src={src}
        alt={member.name}
        fill
        sizes="280px"
        className="object-cover object-top"
        priority={index === 0}
        unoptimized={remote}
        onError={() => setBroken(true)}
      />
    </div>
  );
}

export default function AboutTeam() {
  // Static seeds render instantly (no layout shift); replaced by exact live data on success.
  const [team, setTeam] = useState<TeamMember[]>(staticTeam);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/team")
      .then((r) => r.json())
      .then((res) => {
        if (active && Array.isArray(res?.data)) {
          setTeam((res.data as TeamMember[]).filter((m) => (m as any).active !== false));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Nothing live to show → hide the section instead of an empty shell.
  if (team.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute bottom-20 right-[-120px] h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Heading */}
        <Reveal3D className="mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Leadership
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
            The people who{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              get things done
            </span>
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Meet the leadership team behind NextGen Maha Tech — driving
            innovation, technology, and meaningful digital transformation.
          </p>

        </Reveal3D>

        {/* TEAM */}
        <div className="grid items-stretch gap-8 md:grid-cols-2">

          {team.map((member, index) => {

            const key = member.id ?? member.name;
            const isExpanded = expanded === key;

            return (
              <motion.article
                key={key}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(index, 6) * 0.1,
                }}
                className="flex h-full flex-col"
              >

                {/* CARD */}
                <div className="flex h-full min-h-[850px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

                  {/* Top accent */}
                  <div
                    className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${member.tone ?? "from-indigo-500 to-blue-600"}`}
                  />

                  {/* Profile Image */}
                  <TeamPhoto member={member} index={index} />

                  {/* PROFILE */}
                  <div className="shrink-0 px-7 pt-7 text-center">

                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 break-words">
                      {member.name}
                    </h3>

                    {member.role ? (
                      <div className="mt-2 inline-flex rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 break-words">
                        {member.role}
                      </div>
                    ) : (
                      <div className="mt-2 select-none text-sm text-transparent">—</div>
                    )}

                  </div>

                  {/* MESSAGE */}
                  <div className="flex flex-1 flex-col px-7 pb-8 pt-7">

                    <div className="relative flex flex-1 flex-col rounded-2xl bg-slate-50 p-6">

                      {/* Left accent */}
                      <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-500" />

                      {/* Main message */}
                      <p className="text-sm leading-7 text-slate-600 break-words">
                        {member.message}
                      </p>

                      {/* Quote */}
                      {member.quote && (
                        <div className="mt-5 border-t border-slate-200 pt-5">

                          <p className="text-sm font-semibold italic leading-6 text-indigo-700 break-words">
                            “{member.quote}”
                          </p>

                        </div>
                      )}

                      {/* Extended story */}
                      {member.extendedMessage && (

                        <>

                          {/* Read More Content */}
                          {isExpanded && (
                            <div className="mt-5 space-y-4 border-t border-slate-200 pt-5">

                              <p className="text-sm leading-7 text-slate-600 break-words">
                                {member.extendedMessage}
                              </p>

                              {member.vision && (
                                <p className="text-sm leading-7 text-slate-600 break-words">
                                  {member.vision}
                                </p>
                              )}

                              {member.leadership && (
                                <p className="text-sm leading-7 text-slate-600 break-words">
                                  {member.leadership}
                                </p>
                              )}

                              {member.closing && (
                                <div className="rounded-xl bg-white p-4">

                                  <p className="text-sm font-semibold italic leading-6 text-indigo-700 break-words">
                                    “{member.closing}”
                                  </p>

                                </div>
                              )}

                            </div>
                          )}

                          {/* READ MORE BUTTON */}
                          <div className="mt-auto pt-6">

                            <button
                              type="button"
                              onClick={() =>
                                setExpanded(
                                  isExpanded ? null : key
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700"
                            >

                              {isExpanded
                                ? "Read Less"
                                : "Read More"}

                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-300 ${
                                  isExpanded
                                    ? "rotate-180"
                                    : ""
                                }`}
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>

                            </button>

                          </div>

                        </>

                      )}

                    </div>

                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`h-1 w-full shrink-0 bg-gradient-to-r ${member.tone ?? "from-indigo-500 to-blue-600"}`}
                  />

                </div>

              </motion.article>
            );
          })}

        </div>

      </div>
    </section>
  );
}
