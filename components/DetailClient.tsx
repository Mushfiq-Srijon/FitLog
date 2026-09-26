"use client";

import Image from "next/image";
import { Bookmark, Check, ListChecks } from "lucide-react";
import { workoutImage } from "@/lib/media";
import { Workout } from "@/lib/types";
import { useStore } from "./StoreProvider";
import { useToast } from "./ToastProvider";

export default function DetailClient({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, saveForLater } = useStore();
  const toast = useToast();
  const inPlan = plan.some(item => item.id === workout.id);
  const inSaved = saved.some(item => item.id === workout.id);

  function handlePlan() {
    if (inPlan) return toast("Already in today's plan");
    if (plan.length >= 5) return toast("Today's plan is full");
    addToPlan(workout);
    toast("Added to today's plan");
  }

  function handleSave() {
    if (inSaved) return toast("Already saved");
    saveForLater(workout);
    toast("Saved for later");
  }

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", String(workout.rating)],
  ];

  return (
    <main className="min-h-[calc(100vh-81px)] bg-[#0f1115] py-12">
      <div className="mx-auto max-w-[1232px] px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative min-h-[480px] overflow-hidden border border-line bg-[#171a21] lg:min-h-[735px]">
          <Image
            src={workoutImage}
            alt={workout.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-wide sm:text-6xl">
            {workout.name}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="bg-acid px-2 py-1 text-xs font-bold uppercase tracking-wide text-black"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-8 border border-line bg-[#151922]">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-line px-5 py-3.5 last:border-0"
              >
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                  {label}
                </span>
                <span className="text-sm font-semibold uppercase">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-acid">
              <ListChecks size={16} />
              Instructions
            </div>
            <ol className="mt-5 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={instruction}
                  className="flex gap-4 border-b border-line pb-3 text-sm leading-6 text-muted"
                >
                  <span className="font-bold text-white">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handlePlan}
              className="flex flex-1 items-center justify-center gap-2 bg-acid px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-black transition hover:bg-white"
            >
              <Check size={16} />
              {inPlan ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              onClick={handleSave}
              className="flex flex-1 items-center justify-center gap-2 border border-[#343944] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] transition hover:border-acid hover:text-acid"
            >
              <Bookmark size={16} />
              {inSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
