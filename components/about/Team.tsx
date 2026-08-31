
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Reveal3D } from "../../lib/anim";

const team = [
  {
    name: "Rohit Pawar",
    role: "Founder & Director",
    image: "/Rohit_Pawar.png",
    tone: "from-indigo-500 to-blue-600",
    message:
      "Rohit Pawar is the Director of NextGen Mahatech, focused on driving business growth through innovation, technology, and strategic partnerships. With an entrepreneurial mindset and a passion for digital transformation, he is committed to delivering practical and innovative solutions that create long-term value for clients and businesses.",
    quote:
      "Innovation, Technology & Growth — Building Solutions for a Better Future.",
  },

  {
    name: "Kailash Wagh",
    role: "Founder & Director",
    image: "/Kailash_Wagh.png",
    tone: "from-fuchsia-500 to-pink-600",
    message:
      "As the Founder and Director of NextGen Maha Tech, I am excited to build next-generation, technology-driven solutions that simplify, strengthen, and enhance the way associations are managed.",
    extendedMessage:
      "At NextGen Maha Tech we focus on creating innovative, smart, and scalable Association Management Solutions tailored to the evolving needs of modern organizations. Our mission is to empower associations with technology that streamlines operations, boosts member engagement, improves communication, and facilitates better decision-making.",
    vision:
      "I believe that technology’s role goes beyond merely automating processes—it should also foster meaningful relationships and create new opportunities for growth. With this vision, we have developed a future-ready platform that integrates digital innovation, operational efficiency, and user-centric design.",
    leadership:
      "As a leader, I am dedicated to driving innovation, building strong partnerships, and delivering solutions that provide real, measurable value to our clients. Our goal is to establish NextGen Maha Tech as a trusted technology partner for associations looking to embrace digital transformation and prepare for the future.",
    closing:
      "We are not just building software; we are shaping the next generation of association management.",
  },
];

export default function AboutTeam() {
  const [expanded, setExpanded] = useState<number | null>(null);

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

            const isExpanded = expanded === index;

            return (
              <motion.article
                key={member.name}
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
                  delay: index * 0.1,
                }}
                className="flex h-full flex-col"
              >

                {/* CARD */}
                <div className="flex h-full min-h-[850px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

                  {/* Top accent */}
                  <div
                    className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${member.tone}`}
                  />

{/* Profile Image */}
<div className="relative mx-auto mt-8 h-[280px] w-full max-w-[280px] overflow-hidden rounded-2xl bg-slate-100">
  <Image
    src={member.image}
    alt={member.name}
    fill
    sizes="280px"
    className="object-cover object-top"
    priority={index === 0}
  />
</div>



                  {/* PROFILE */}
                  <div className="shrink-0 px-7 pt-7 text-center">

                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      {member.name}
                    </h3>

                    <div className="mt-2 inline-flex rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600">
                      {member.role}
                    </div>

                  </div>

                  {/* MESSAGE */}
                  <div className="flex flex-1 flex-col px-7 pb-8 pt-7">

                    <div className="relative flex flex-1 flex-col rounded-2xl bg-slate-50 p-6">

                      {/* Left accent */}
                      <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-500" />

                      {/* Main message */}
                      <p className="text-sm leading-7 text-slate-600">
                        {member.message}
                      </p>

                      {/* ROHIT */}
                      {member.quote && (
                        <div className="mt-5 border-t border-slate-200 pt-5">

                          <p className="text-sm font-semibold italic leading-6 text-indigo-700">
                            “{member.quote}”
                          </p>

                        </div>
                      )}

                      {/* KAILASH */}
                      {member.extendedMessage && (

                        <>

                          {/* Read More Content */}
                          {isExpanded && (
                            <div className="mt-5 space-y-4 border-t border-slate-200 pt-5">

                              <p className="text-sm leading-7 text-slate-600">
                                {member.extendedMessage}
                              </p>

                              <p className="text-sm leading-7 text-slate-600">
                                {member.vision}
                              </p>

                              <p className="text-sm leading-7 text-slate-600">
                                {member.leadership}
                              </p>

                              <div className="rounded-xl bg-white p-4">

                                <p className="text-sm font-semibold italic leading-6 text-indigo-700">
                                  “{member.closing}”
                                </p>

                              </div>

                            </div>
                          )}

                          {/* READ MORE BUTTON */}
                          <div className="mt-auto pt-6">

                            <button
                              type="button"
                              onClick={() =>
                                setExpanded(
                                  isExpanded ? null : index
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
                    className={`h-1 w-full shrink-0 bg-gradient-to-r ${member.tone}`}
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
