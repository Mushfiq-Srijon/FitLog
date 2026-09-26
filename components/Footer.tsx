import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1d24] bg-[#090a0d]">
      <div className="mx-auto flex max-w-[1232px] flex-col gap-5 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center bg-acid text-black">
            <Dumbbell size={14} strokeWidth={3} />
          </span>
          <span className="font-display text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
