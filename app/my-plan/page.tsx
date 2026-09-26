"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFitLog, PlannedWorkout } from "../context/FitLogContext";
import { Workout } from "../lib/api";

type Tab = "plan" | "saved";
type SortOption = "Duration" | "Calories" | "Rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    isHydrated,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("Duration");

  const exercisesCount = plan.length;
  const totalMinutes = plan.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalCalories = plan.reduce((sum, w) => sum + (w.calories || 0), 0);

  const sortItems = <T extends Workout>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
      if (sortBy === "Duration") return b.duration - a.duration;
      if (sortBy === "Calories") return b.calories - a.calories;
      if (sortBy === "Rating") return b.rating - a.rating;
      return 0;
    });
  };

  const currentList =
    activeTab === "plan" ? sortItems(plan) : sortItems(saved);

  return (
    <main className="max-w-[1280px] mx-auto px-6 sm:px-10 pt-10 pb-16 min-h-[75vh]">
      {/* Header */}
      <div className="space-y-1.5 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
          MY PLAN
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Cap of lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="rounded-2xl bg-[#14171c] border border-white/[0.07] p-6 sm:py-7 sm:px-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-white/[0.08]">
          <div className="sm:pr-8">
            <p className="text-xs text-zinc-400">Exercises</p>
            <p className="font-display text-4xl sm:text-[42px] font-bold text-[#ccff00] mt-2 leading-none">
              {exercisesCount}
            </p>
          </div>

          <div className="sm:px-8">
            <p className="text-xs text-zinc-400">Minutes</p>
            <p className="font-display text-4xl sm:text-[42px] font-bold text-white mt-2 leading-none">
              {totalMinutes}
            </p>
          </div>

          <div className="sm:pl-8">
            <p className="text-xs text-zinc-400">Calories</p>
            <p className="font-display text-4xl sm:text-[42px] font-bold text-white mt-2 leading-none">
              {totalCalories}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="inline-flex items-center bg-[#14171c] border border-white/[0.07] p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "plan"
                ? "bg-[#22262e] text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#22262e] text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs text-zinc-400">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-[#14171c] border border-white/[0.08] rounded-lg px-3.5 py-2 pr-8 text-xs text-white focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
            <svg
              className="w-3.5 h-3.5 text-zinc-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {!isHydrated ? (
        <div className="py-20 text-center">
          <p className="text-sm text-zinc-400">Loading workouts…</p>
        </div>
      ) : currentList.length === 0 ? (
        <div className="py-16 px-4 rounded-2xl bg-[#14171c] border border-white/[0.07] text-center space-y-3">
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
            NOTHING HERE YET
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block px-5 py-2.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3.5">
          {currentList.map((item) => {
            const isDone =
              activeTab === "plan" && (item as PlannedWorkout).completed;

            return (
              <div
                key={item.id}
                className="p-4 sm:px-5 sm:py-4 rounded-2xl bg-[#14171c] border border-white/[0.07] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-28 h-20 sm:w-36 sm:h-20 rounded-xl overflow-hidden bg-[#1a1d24] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3
                      className={`font-display text-base sm:text-lg font-bold uppercase tracking-wide ${
                        isDone ? "line-through text-zinc-500" : "text-white"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400">{item.equipment}</p>

                    <div className="flex items-center gap-4 pt-1 text-xs text-zinc-300">
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#ccff00]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {item.durationText}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                        </svg>
                        {item.caloriesText}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#ccff00]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-4 py-2 rounded-full bg-[#1a1d24] border border-white/10 hover:border-white/25 text-xs font-medium text-zinc-200 transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => !isDone && markAsDone(item.id)}
                      disabled={isDone}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition ${
                        isDone
                          ? "bg-[#22262e] text-[#ccff00] border border-[#ccff00]/40 cursor-default"
                          : "bg-[#ccff00] text-black hover:brightness-110 cursor-pointer"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{isDone ? "Done" : "Mark as Done"}</span>
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    aria-label="Remove"
                    className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}