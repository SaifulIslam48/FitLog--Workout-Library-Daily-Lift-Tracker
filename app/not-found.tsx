import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="px-3.5 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold uppercase tracking-widest">
        ERROR 404
      </span>

      <h1 className="font-display text-5xl sm:text-7xl font-bold uppercase text-white mt-4 tracking-wide">
        PAGE NOT FOUND
      </h1>

      <p className="text-zinc-400 max-w-md mt-3 text-xs sm:text-sm leading-relaxed">
        The route you&apos;re looking for doesn&apos;t exist. Head back to the
        workout library and lock in your next set.
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition"
      >
        Go to workouts
      </Link>
    </main>
  );
}