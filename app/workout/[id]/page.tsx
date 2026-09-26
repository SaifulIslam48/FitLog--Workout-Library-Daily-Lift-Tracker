"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchWorkoutById, Workout } from "../../lib/api";
import { useFitLog } from "../../context/FitLogContext";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = String(params?.id ?? "");
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, saveForLater, isInPlan, isInSaved, isPlanFull } = useFitLog();

  useEffect(() => {
    let mounted = true;

    async function loadWorkout() {
      const data = await fetchWorkoutById(id);
      if (mounted) {
        setWorkout(data);
        setLoading(false);
      }
    }

    loadWorkout();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-zinc-400 animate-pulse">Loading workouts…</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-3xl font-bold uppercase text-white">
          WORKOUT NOT FOUND
        </h1>
        <Link
          href="/"
          className="px-5 py-2.5 rounded bg-[#ccff00] text-black text-xs font-bold uppercase"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const disablePlanButton = isPlanFull && !inPlan;

  const keySpecs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: String(workout.sets) },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: workout.durationText },
    { label: "CALORIES", value: workout.caloriesText },
    { label: "RATING", value: String(workout.rating) },
  ];

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-6 relative aspect-square w-full rounded-xl overflow-hidden bg-[#141414] border border-[#242424]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            className="object-cover object-top"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
              {workout.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {workout.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {workout.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-[11px] font-medium bg-[#161616] border border-[#2c2c2c] text-zinc-300 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[#121212] border border-[#242424] divide-y divide-[#1f1f1f]">
            {keySpecs.map((row) => (
              <div
                key={row.label}
                className="px-5 py-3 grid grid-cols-2 items-center text-xs"
              >
                <span className="font-bold uppercase tracking-wider text-zinc-500">
                  {row.label}
                </span>
                <span className="font-semibold text-zinc-200">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-1">
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-white">
              INSTRUCTIONS
            </h2>
            <ol className="space-y-2.5 pl-1">
              {workout.instructions.slice(0, 4).map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-xs sm:text-sm"
                >
                  <span className="text-zinc-400 font-medium shrink-0">
                    {index + 1}.
                  </span>
                  <span className="text-zinc-200 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => addToPlan(workout)}
              disabled={disablePlanButton}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-bold text-xs transition cursor-pointer ${
                disablePlanButton
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-[#ccff00] text-black hover:brightness-110"
              }`}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>
                {disablePlanButton
                  ? "Plan Cap (5) Reached"
                  : inPlan
                  ? "Added to today's plan"
                  : "Add to today's plan"}
              </span>
            </button>

            <button
              onClick={() => saveForLater(workout)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#141414] border border-[#2e2e2e] hover:border-zinc-500 text-white font-semibold text-xs transition cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill={inSaved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              <span>{inSaved ? "Saved for later" : "Save for later"}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}