"use client";

import Link from "next/link";
import Image from "next/image";
import { Workout } from "../lib/api";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#15181e] rounded-xl border `border-white/8` overflow-hidden hover:border-[#ccff00]/50 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 w-full bg-[#181a1e] overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {workout.categories.map((cat, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-[#ccff00] text-black rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          <h3 className="font-display text-base sm:text-lg font-bold tracking-wide text-white uppercase group-hover:text-[#ccff00] transition-colors pt-0.5">
            {workout.name}
          </h3>

          <p className="text-[11px] text-zinc-400">{workout.equipment}</p>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-white/5 flex items-center gap-4 text-[11px] text-zinc-400">
        <span className="inline-flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 text-zinc-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {workout.durationText}
        </span>

        <span className="inline-flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 text-zinc-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
          {workout.caloriesText}
        </span>

        <span className="inline-flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 text-zinc-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {workout.rating}
        </span>
      </div>
    </Link>
  );
}