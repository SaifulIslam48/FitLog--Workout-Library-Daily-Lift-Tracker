"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAllWorkouts, Workout } from "./lib/api";
import WorkoutCard from "./components/WorkoutCard";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchAllWorkouts().then((data) => {
      if (mounted) {
        setWorkouts(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="max-w-[1280px] mx-auto px-6 sm:px-10 pt-10 pb-16">
      <section className="rounded-2xl bg-[#16191e] border border-white/[0.08] px-8 sm:px-12 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        <div className="lg:col-span-7 space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold uppercase text-white leading-[1.05] tracking-tight">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <a
              href="#library"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#ccff00] text-black font-extrabold text-[11px] uppercase tracking-wider hover:brightness-110 transition"
            >
              BROWSE WORKOUTS
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[360px] max-w-[440px]">
            <Image
              src="/banner.png"
              alt="Workout Hero Figure"
              fill
              unoptimized
              className="object-contain object-center scale-100"
            />
          </div>
        </div>
      </section>

      <section id="library" className="mt-14 scroll-mt-20">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
            THE LIBRARY
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-zinc-400">Loading workouts…</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}