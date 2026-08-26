"use client";

import { motion } from "motion/react";
import {  Reveal3D } from "../../lib/anim";

const whyChooseUs = [
  {
    name: "Everything in One Place",
    desc: "Manage members, events, payments, committees, vendors, and communications from a single platform.",
    icon: "M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z",
  },
  {
    name: "Save Time with Automation",
    desc: "Automate renewals, reminders, notifications, and routine administrative tasks.",
    icon: "M12 8a4 4 0 100 8 4 4 0 000-8zm0-6v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41",
  },
  {
    name: "Increase Member Engagement",
    desc: "Keep members informed through instant notifications, news, events, and digital services.",
    icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm9-1a3 3 0 100-6 3 3 0 000 6zm3 11v-2a4 4 0 00-3-3.87",
  },
  {
    name: "Secure & Reliable",
    desc: "Enterprise-grade security with cloud backup and role-based access.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-10l2 2 4-4",
  },
  {
    name: "Real-Time Insights",
    desc: "Powerful dashboards and reports help leaders make informed decisions.",
    icon: "M4 19V9m5 10V5m5 14v-8m5 8V3M2 21h20",
  },
  {
    name: "Mobile First Experience",
    desc: "Members can engage from anywhere using Android or iOS.",
    icon: "M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm5 17h.01",
  },
];

// const platformBenefits = [
//   { name: "Reduce Manual Work", desc: "Automated processes save time and effort.", icon: "M12 2a3 3 0 013 3v1h4a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h4V5a3 3 0 013-3zm0 2a1 1 0 00-1 1v1h2V5a1 1 0 00-1-1zM7 11h10M7 15h6" },
//   { name: "Improve Communication", desc: "Better communication and participation.", icon: "M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4v8zM8 10h.01M12 10h.01M16 10h.01" },
//   { name: "Paperless Operations", desc: "Reduced paperwork and manual tasks.", icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm0 0v6h6M8 13h8M8 17h6" },
//   { name: "Faster Decision Making", desc: "Real-time reports for better decision making.", icon: "M3 3v18h18M7 16v-5M12 16V7M17 16v-8M5 21l16-18" },
//   { name: "Better Event Participation", desc: "Improved event communication and participation.", icon: "M3 5h18v16H3V5zM7 3v4M17 3v4M3 10h18M8 14h2M14 14h2M8 17h2" },
//   { name: "Transparent Management", desc: "Better visibility and transparent management.", icon: "M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8" },
//   { name: "Secure Digital Records", desc: "Cloud-based, secure and role-based access.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-10l2 2 4-4" },
//   { name: "Scalable for Every Association", desc: "Designed to support growing association requirements.", icon: "M3 17l6-6 4 4 8-8M14 7h7v7M3 21h18" },
// ];

const solutionDelivered = [
  "Complete Association Management System",
  "Mobile Application (Android & iOS)",
  "Admin Dashboard",
  "Member Directory",
  "Event Management",
  "Membership Renewal",
  "News, Circulars & Notices",
  "Push Notifications",
  "Reports & Analytics",
  "Online Payments",
];

const keyAchievements = [
  { title: "Better Member Engagement", desc: "Improved communication and participation" },
  { title: "Time Saving Operations", desc: "Automated processes save time and effort" },
  { title: "Secure & Reliable", desc: "Cloud-based, secure and role-based access" },
  { title: "Paperless Environment", desc: "Reduced paperwork and manual tasks" },
  { title: "Data-Driven Decisions", desc: "Real-time reports for better decision making" },
];

const whyNimaChose = [
  "Tailored solution to meet NIMA's unique requirements",
  "User-friendly system for members and admin",
  "Improved efficiency in event and membership management",
  "Reliable support and continuous innovation",
  "Trusted technology partner for the long term",
];

export default function IndustriesGrid() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-indigo-50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal3D className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            <span className="text-xs font-bold tracking-[0.18em] text-indigo-600">
              ASSOCIATION MANAGEMENT SOLUTION
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Why Associations
            <span className="block bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Love Our Platform
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            NextGen Mahatech&apos;s Association Management System is designed to
            simplify operations, strengthen member engagement, and help
            associations achieve more with less effort.
          </p>
        </Reveal3D>

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
            >
              <span className="absolute right-5 top-4 text-5xl font-bold text-slate-100">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-600 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:text-white">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>

              <h3 className="mt-7 text-xl font-bold text-slate-900">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* <Reveal3D className="mx-auto mt-28 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            Platform Benefits
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            Built to Digitize,
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              {" "}Organize & Grow
            </span>
          </h2>
        </Reveal3D> */}

        {/* <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          style={{ perspective: 1400 }}
        >
          {platformBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.name}
              className="aspect-[4/5]"
              variants={{
                hidden: { opacity: 0, rotateY: 45, scale: 0.8 },
                visible: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.55 } },
              }}
            >
              <Flip3D
                front={
                  <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition-all hover:shadow-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100">
                        <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d={benefit.icon} />
                        </svg>
                      </div>
                      <span className="text-4xl font-bold text-slate-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold leading-snug text-slate-900">{benefit.name}</h3>
                      <p className="mt-4 text-xs text-slate-400">Hover to explore</p>
                    </div>
                  </div>
                }
                back={
                  <div className="flex h-full w-full flex-col justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-6 text-white">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-indigo-100">
                      Platform Benefit
                    </p>
                    <h3 className="text-xl font-bold text-white">{benefit.name}</h3>
                    <p className="mt-5 text-sm leading-7 text-indigo-50">{benefit.desc}</p>
                  </div>
                }
              />
            </motion.div>
          ))}
        </motion.div> */}

        <Reveal3D className="mt-28">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
            <div className="grid lg:grid-cols-[0.9fr_1.5fr]">
              <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 p-8 text-white md:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Trusted By Our Valued Client
                </p>
                <h2 className="mt-6 text-4xl font-bold text-white">Our Success Story</h2>

                <div className="mt-12">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-200">Client</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Nashik Industries & Manufacturers Association
                  </h3>
                  <p className="mt-6 leading-8 text-indigo-100">
                    A digital transformation journey powered by NextGen Mahatech&apos;s
                    Association Management Solution.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
                  Digital Transformation Success
                </p>
                <p className="mt-6 leading-8 text-slate-600">
                  NextGen Mahatech proudly partnered with NIMA (Nashik Industries &
                  Manufacturers Association) to develop a comprehensive Association
                  Management System that streamlined operations, improved member
                  engagement, and digitized day-to-day association activities.
                </p>

                <h3 className="mt-10 text-xl font-bold text-slate-900">Solution Delivered</h3>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {solutionDelivered.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-200 hover:shadow-md"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                        ✓
                      </span>
                      <span className="text-sm font-semibold leading-6 text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal3D>

        <Reveal3D className="mt-28">
          <div className="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/50 p-8 md:p-12">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                Key Achievements
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Results of Digital Transformation
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {keyAchievements.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 text-lg font-bold text-indigo-600">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal3D>

        <Reveal3D className="mt-20">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white lg:grid-cols-[1.4fr_0.8fr]">
            <div className="p-8 md:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                Partnership Success
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Why NIMA Chose NextGen Mahatech
              </h2>

              <div className="mt-10 space-y-5">
                {whyNimaChose.map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                      ✓
                    </span>
                    <p className="font-medium leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-blue-600 p-8 text-white md:p-12">
              <p className="text-lg leading-8 text-indigo-50">
                NextGen Mahatech&apos;s solution has simplified our operations and
                brought our association closer to a digital future. Their team is
                responsive, professional, and truly understands our needs.
              </p>
              <div className="mt-8 h-px bg-white/20" />
              <p className="mt-6 text-lg font-bold text-cyan-200">— NIMA Team</p>
            </div>
          </div>
        </Reveal3D>

        <Reveal3D className="mt-20 text-center">
          <div className="rounded-[2rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 px-8 py-16 text-white md:px-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-100">
              Digital Association Management
            </p>
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
              Proudly Empowering NIMA with a Complete Digital Association
              Management Solution
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-8 text-indigo-50">
              Trusted by associations to digitize, organize, simplify operations
              and support sustainable growth.
            </p>
          </div>
        </Reveal3D>
      </div>
    </section>
  );
}