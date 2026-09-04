"use client";

import { motion } from "motion/react";

const solutionDelivered = [
  "Complete Association Management System",
  "Mobile Application (Android & iOS)",
  "Management Dashboard",
  "Member Directory",
  "Event Management",
  "Membership Renewal",
  "News, Circulars & Notices",
  "Push Notifications",
  "Reports & Analytics",
  "Online Payments",
];

const achievements = [
  {
    title: "Better Member Engagement",
    desc: "Improved communication and participation across the association.",
  },
  {
    title: "Time Saving Operations",
    desc: "Automated processes reduce repetitive manual work.",
  },
  {
    title: "Secure & Reliable",
    desc: "Cloud-based access with secure and organized digital records.",
  },
  {
    title: "Paperless Environment",
    desc: "Reduced paperwork through streamlined digital workflows.",
  },
  {
    title: "Data-Driven Decisions",
    desc: "Real-time reports help leaders make faster and better decisions.",
  },
];

export default function Portfolio() {
  return (
    <section
      id="success-story"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-indigo-50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Success Story
          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Digital transformation that{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              delivers results
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            NextGen Mahatech partnered with Nashik Industries & Manufacturers
            Association to create a complete digital ecosystem that simplifies
            operations and improves member engagement.
          </p>
        </motion.div>

        {/* Client Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.5fr]">
            {/* Left */}
            <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 p-8 text-white md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Our Valued Client
              </p>

              <h3 className="mt-6 text-3xl font-bold leading-tight text-white">
                Nashik Industries & Manufacturers Association
              </h3>

              <div className="mt-10 h-px bg-white/10" />

              <p className="mt-8 leading-8 text-indigo-100">
                A complete digital transformation journey designed to improve
                communication, simplify management, and create a better
                experience for every association member.
              </p>
            </div>

            {/* Right */}
            <div className="p-8 md:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
                Digital Transformation Success
              </p>

              <h3 className="mt-4 text-3xl font-bold text-slate-900">
                Building a smarter association ecosystem
              </h3>

              <p className="mt-6 leading-8 text-slate-600">
                NextGen Mahatech proudly partnered with NIMA to develop a
                comprehensive Association Management System that streamlined
                operations, improved member engagement, and digitized
                day-to-day association activities.
              </p>

              <h4 className="mt-10 text-xl font-bold text-slate-900">
                Solution Delivered
              </h4>

              {/* Simple list - No Cards */}
              <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {solutionDelivered.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                      ✓
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              Key Achievements
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              Results of{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                digital transformation
              </span>
            </h2>
          </div>

          {/* Achievement list - No Cards */}
          <div className="mx-auto mt-14 max-w-5xl divide-y divide-slate-200">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="grid gap-4 py-7 md:grid-cols-[80px_1fr_1.5fr] md:items-center"
              >
                <span className="text-3xl font-bold text-indigo-200">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="leading-7 text-slate-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Link to the full Portfolio page */}
        <div className="mt-16 text-center">
          <a href="/portfolio" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800">
            View Full Portfolio
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}