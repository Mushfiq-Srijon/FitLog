"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "./StoreProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useStore();
  const isPlanPage = pathname === "/my-plan";
  const usesSlateSurface = isPlanPage || pathname.startsWith("/workout/");

  return (
    <header
      className={`border-b border-[#1c1f26] ${
        usesSlateSurface ? "bg-[#0f1115]" : "bg-ink"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-5 px-5 sm:px-8 ${
          isPlanPage
            ? "min-h-[67px] max-w-[1184px]"
            : "min-h-[81px] max-w-[1232px]"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center bg-acid text-black">
            <Dumbbell size={14} strokeWidth={3} />
          </span>
          <span className="font-display text-xl font-bold tracking-[0.05em]">
            FITLOG
          </span>
        </Link>
        <nav className="hidden items-center md:flex">
          <Link
            className={`px-4 py-1.5 text-xs font-medium transition rounded-xl ${
              pathname === "/"
                ? "bg-[#1a2312] text-acid"
                : "text-muted hover:text-white"
            }`}
            href="/"
          >
            Workouts
          </Link>
          <Link
            className={`px-4 py-1.5 text-xs font-medium transition ${
              pathname === "/my-plan"
                ? "bg-[#1a2312] text-acid"
                : "text-muted hover:text-white"
            }`}
            href="/my-plan"
          >
            My Plan
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className=" px-3 py-1.5 text-xs font-medium text-white"
          >
            Plan <span className="inline-flex items-center justify-center text-black w-5 aspect-square ml-1 font-bold border-2 border-acid rounded-full bg-acid text-[10px] leading-none">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className=" px-3 py-1.5 text-xs font-medium text-white transition hover:text-acid"
          >
            Saved <span className="inline-flex items-center justify-center text-white w-5 aspect-square ml-1 font-bold border-2 border-gray-400 rounded-full bg-transparent text-[10px] leading-none">{saved.length}</span>
          </Link>
        </div>
      </div>
      <div className="flex border-t border-[#1c1f26] md:hidden">
        <Link
          href="/"
          className={`flex-1 py-3 text-center text-xs font-medium ${
            pathname === "/" ? "bg-acid text-black" : "text-muted"
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`flex-1 py-3 text-center text-xs font-medium ${
            pathname === "/my-plan" ? "bg-acid text-black" : "text-muted"
          }`}
        >
          My Plan
        </Link>
      </div>
    </header>
  );
}
