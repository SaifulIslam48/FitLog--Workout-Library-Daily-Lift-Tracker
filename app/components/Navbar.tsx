"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0e1014]/95 backdrop-blur border-b border-white/[0.07]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Left: Logo + FITLOG */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 shrink-0"
        >
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={22}
            height={22}
            unoptimized
            className="w-5 h-5 object-contain"
          />
          <span className="font-display text-lg font-bold tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        {/* Middle: Desktop Navigation Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-3">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isWorkoutActive
                ? "bg-[#232b12] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isMyPlanActive
                ? "bg-[#232b12] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Plan & Saved Badges + Mobile 3-Bar Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black text-[11px] font-extrabold flex items-center justify-center">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full border border-zinc-700 text-zinc-300 text-[11px] font-bold flex items-center justify-center">
              {saved.length}
            </span>
          </Link>

          {/* Mobile 3-Bar Hamburger Button (Only visible on mobile < md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg bg-[#16191e] border border-white/10 text-zinc-300 hover:text-white hover:border-[#ccff00]/50 transition cursor-pointer"
          >
            {mobileMenuOpen ? (
              /* Close (X) Icon */
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* 3-Bar Hamburger Icon */
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#14171c] border-b border-white/[0.08] px-6 py-3 flex flex-col gap-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              isWorkoutActive
                ? "bg-[#232b12] text-[#ccff00]"
                : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              isMyPlanActive
                ? "bg-[#232b12] text-[#ccff00]"
                : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>
      )}
    </header>
  );
}