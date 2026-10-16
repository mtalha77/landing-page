"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#what-we-build", label: "What we build" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#case-studies", label: "Case studies" },
  { href: "#services", label: "Services" },
  { href: "#why-rankorbit", label: "Why rankorbit.dev" },
  { href: "#faqs", label: "FAQs" },
];

function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt="rankorbit.dev"
      width={3580}
      height={420}
      priority
      className={className}
    />
  );
}

export function SiteHeader() {
  const [exploring, setExploring] = useState(false);

  useEffect(() => {
    const onScroll = () => setExploring(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-5 sm:px-8 sm:py-6">
          <Logo className="h-7 w-auto sm:h-8" />
        </div>
      </header>

      <div
        aria-hidden={!exploring}
        inert={exploring ? undefined : true}
        className={`fixed inset-x-0 top-3 z-30 px-4 transition duration-300 sm:px-6 ${
          exploring
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="relative mx-auto flex h-[64px] max-w-7xl items-center justify-between rounded-full bg-white pr-2 pl-4 shadow-[0_8px_30px_rgba(15,23,42,0.08)] sm:pl-5">
          <Logo className="h-6 w-auto sm:h-7" />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer text-[14.5px] font-medium whitespace-nowrap text-[#1a1a1a] transition-colors hover:text-[#126E5A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#book"
            className="inline-flex h-11 cursor-pointer items-center rounded-full bg-black px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#222]"
          >
            Book a call
          </a>
        </div>
      </div>
    </>
  );
}
