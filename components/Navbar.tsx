"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "./ui/AppLink";

const links: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "AMS Product", href: "/solutions/ams" },
  { label: "Services", href: "/services" },
  { label: "Portfolios", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-[0_2px_20px_-8px_rgba(15,23,42,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex h-18 md:h-20 items-center justify-between py-3">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center group"
          >
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={180}
              height={55}
              priority
              className="h-auto w-[150px] md:w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors relative group"
              >
                {l.label}

                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-indigo-600 group-hover:w-6 transition-all" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
            >
              Get a Quote

              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6 text-slate-800"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {open && (
          <div className="lg:hidden pb-5 pt-2 border-t border-slate-100">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {l.label}
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 mx-4 text-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}