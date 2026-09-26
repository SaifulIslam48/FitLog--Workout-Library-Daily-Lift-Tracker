import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0e1014] border-t border-white/[0.07] py-6 mt-16">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
  
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog"
            width={18}
            height={18}
            unoptimized
            className="w-4 h-4 object-contain"
          />
          <span className="font-display text-sm font-bold tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        <p className="text-xs text-zinc-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}