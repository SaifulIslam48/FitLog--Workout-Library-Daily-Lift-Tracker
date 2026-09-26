"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "../lib/api";

export interface PlannedWorkout extends Workout {
  completed?: boolean;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface FitLogContextType {
  plan: PlannedWorkout[];
  saved: PlannedWorkout[];
  isHydrated: boolean;
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  markAsDone: (id: string) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  isInPlan: (id: string) => boolean;
  isInSaved: (id: string) => boolean;
  isPlanFull: boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

const PLAN_KEY = "fitlog_plan_v1";
const SAVED_KEY = "fitlog_saved_v1";

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlannedWorkout[]>([]);
  const [saved, setSaved] = useState<PlannedWorkout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const triggerToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const p = localStorage.getItem(PLAN_KEY);
        const s = localStorage.getItem(SAVED_KEY);
        if (p) setPlan(JSON.parse(p));
        if (s) setSaved(JSON.parse(s));
      } catch (e) {
        console.error(e);
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, isHydrated]);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, isHydrated]);

  const isInPlan = (id: string) =>
    plan.some((w) => String(w.id) === String(id));
  const isInSaved = (id: string) =>
    saved.some((w) => String(w.id) === String(id));

  const isPlanFull = false;

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      triggerToast("Already in your plan", "error");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, completed: false }]);
    triggerToast("Added to today's plan", "success");
  };

  const saveForLater = (workout: Workout) => {
    if (isInSaved(workout.id)) {
      triggerToast("Already saved", "error");
      return;
    }
    setSaved((prev) => [...prev, { ...workout, completed: false }]);
    triggerToast("Saved for later", "success");
  };

  const markAsDone = (id: string) => {
    const target = plan.find((w) => String(w.id) === String(id));
    if (!target || target.completed) {
      return;
    }

    setPlan((prev) =>
      prev.map((w) =>
        String(w.id) === String(id) ? { ...w, completed: true } : w
      )
    );
    triggerToast("Marked workout as done", "success");
  };

  const removeFromPlan = (id: string) => {
    setPlan((prev) => prev.filter((w) => String(w.id) !== String(id)));
    triggerToast("Removed from today's plan", "success");
  };

  const removeFromSaved = (id: string) => {
    setSaved((prev) => prev.filter((w) => String(w.id) !== String(id)));
    triggerToast("Removed from saved", "success");
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        isHydrated,
        addToPlan,
        saveForLater,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
        isInPlan,
        isInSaved,
        isPlanFull,
      }}
    >
      {children}

      <div className="fixed top-20 right-6 z-[60] flex flex-col items-end gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 bg-[#14171c] border px-4 py-3 rounded-lg shadow-2xl text-xs sm:text-sm font-medium text-white transition-all ${
              t.type === "error"
                ? "border-red-500/60"
                : "border-[#ccff00]/60"
            }`}
          >
            {t.type === "success" ? (
              /* Green Tick Mark */
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            ) : (
              
              <span className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const ctx = useContext(FitLogContext);
  if (!ctx) throw new Error("useFitLog must be used within FitLogProvider");
  return ctx;
}