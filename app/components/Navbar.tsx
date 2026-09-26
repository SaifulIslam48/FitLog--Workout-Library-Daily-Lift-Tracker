"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0e1014]/95 backdrop-blur border-b border-white/[0.07]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5">
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

        <nav className="flex items-center gap-3">
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

        <div className="flex items-center gap-4">
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black text-[11px] font-extrabold flex items-center justify-center">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full border border-zinc-700 text-zinc-300 text-[11px] font-bold flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}