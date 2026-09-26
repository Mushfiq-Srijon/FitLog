"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Activity, ChevronDown, Flame, Timer } from "lucide-react";
import { useStore } from "./StoreProvider";
import PlanCard from "./PlanCard";

export default function MyPlanClient() {
  const params = useSearchParams();
  const { plan, saved } = useStore();
  const [tab, setTab] = useState<"plan" | "saved">(params.get("tab") === "saved" ? "saved" : "plan");
  const [sort, setSort] = useState("duration");

  useEffect(() => { setTab(params.get("tab") === "saved" ? "saved" : "plan"); }, [params]);

  const list = tab === "plan" ? plan : saved;
  const filtered = useMemo(() => {
    return [...list].sort((a, b) => {
      if (sort === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sort === "rating") return b.rating - a.rating;
      return a.duration - b.duration;
    });
  }, [list, sort]);

  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  return (
    <main className="min-h-[calc(100vh-67px)] bg-[#0f1115] py-10">
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1184px]">
        <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-acid">
          Your log
        </p>
        <h1 className="font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
          My Plan
        </h1>
        <p className="mt-3 text-sm text-muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
        </div>

        <div className="mt-10 grid h-[88px] grid-cols-3 border border-[#232732]">
          <Metric icon={<Activity size={18} />} label="Exercises" value={plan.length} />
          <Metric icon={<Timer size={18} />} label="Minutes" value={minutes} />
          <Metric icon={<Flame size={18} />} label="Calories" value={calories} />
        </div>

        <div className="mt-12 flex items-end justify-between border-b border-[#232732]">
        <div className="flex">
          <button
            onClick={() => setTab("plan")}
            className={`border-b-2 px-5 py-3 text-xs font-bold transition ${
              tab === "plan"
                ? "border-acid text-white"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`border-b-2 px-5 py-3 text-xs font-bold transition ${
              tab === "saved"
                ? "border-acid text-white"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        <label className="relative hidden items-center gap-3 pb-3 text-xs text-muted sm:flex">
          <span>Sort By</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="appearance-none bg-transparent pr-5 text-white outline-none"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-0" size={14} />
        </label>
        </div>

        <div className="mt-4 space-y-4">
          {filtered.length ? (
            filtered.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                savedMode={tab === "saved"}
              />
            ))
          ) : (
            <div className="border border-[#232732] py-20 text-center">
              <h2 className="font-display text-3xl font-bold uppercase">
                Nothing here yet
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block bg-acid px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-black"
              >
                Go to workouts
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="border-r border-[#232732] p-4 last:border-r-0 sm:p-5">
      <div className="flex items-center gap-2 text-acid">
        {icon}
        <span className="text-xs text-muted">{label}</span>
      </div>
      <div className="mt-2 font-display text-4xl font-bold leading-none sm:text-5xl">
        {value}
      </div>
    </div>
  );
}
