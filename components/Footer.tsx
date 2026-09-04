import Link from "./ui/AppLink";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-white text-[15px] tracking-tight">
                  NEXTGEN <span className="text-indigo-400">MAHATECH</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                  Innovate • Build • Elevate
                </div>
              </div>
            </a>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              A modern IT solutions company from Nashik, delivering software,
              cloud, security and support services that help businesses grow.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              {["Software Development", "Web & Mobile Apps", "Cloud & DevOps", "Cybersecurity", "ERP & CRM Systems", "IT Support & AMC"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-slate-400 hover:text-white transition">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { l: "About Us", h: "/about" },
                { l: "Services", h: "/services" },
                { l: "Portfolio", h: "/portfolio" },
                { l: "Contact", h: "/contact" },
              ].map((s) => (
                <li key={s.l}>
                  <Link href={s.h} className="text-slate-400 hover:text-white transition">{s.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Reach us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <svg className="h-5 w-5 shrink-0 text-indigo-400 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="leading-relaxed">
                  Shree Ganesh Park, Near Patil Park,
                  Jadhav Township, Ambad Link Road,
                  Nashik, Maharashtra, India
                </span>
              </li>
              <li>
                <a href="tel:9579495373" className="flex items-center gap-3 hover:text-white transition">
                  <svg className="h-5 w-5 shrink-0 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 95794 95373
                </a>
              </li>
              <li>
                <a href="mailto:nextgenmahatech@gmail.com" className="flex items-center gap-3 hover:text-white transition break-all">
                  <svg className="h-5 w-5 shrink-0 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  nextgenmahatech@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} NextGen Mahatech. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Sitemap</a>
            <a href="/admin" className="hover:text-white transition">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
