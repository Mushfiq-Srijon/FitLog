"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { workoutImage } from "@/lib/media";
import { Workout } from "@/lib/types";
import { useStore } from "./StoreProvider";
import { useToast } from "./ToastProvider";

export default function PlanCard({ workout, savedMode = false }: { workout: Workout; savedMode?: boolean }) {
  const { removeFromPlan, removeFromSaved, addToPlan, done, markDone } = useStore();
  const toast = useToast();
  const isDone = done.includes(workout.id);
  return (
    <article className="grid gap-4 border border-[#232732] bg-[#14171e] p-4 sm:grid-cols-[144px_1fr]">
      <div className="relative h-20 overflow-hidden bg-[#1f232b]">
        <Image
          src={workoutImage}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="144px"
        />
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="text-xs font-bold uppercase tracking-wide text-acid"
              >
                {group}
              </span>
            ))}
          </div>
          <h3 className="font-display text-xl font-bold uppercase leading-none">
            {workout.name}
          </h3>
          <p className="mt-2 text-xs font-semibold text-muted">
            {workout.equipment}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#d1d5db]">
            <span className="flex items-center gap-1">
              <Clock3 size={14} />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={14} />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} />
              {workout.rating}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            href={`/workout/${workout.id}`}
            className="border border-[#343944] px-4 py-2 text-xs font-medium transition hover:border-acid hover:text-acid"
          >
            View Details
          </Link>

          {savedMode ? (
            <button
              onClick={() => {
                const added = addToPlan(workout);
                toast(added ? "Added to today's plan" : "Today's plan is full");
              }}
              className="bg-acid px-4 py-2 text-xs font-bold text-black"
            >
              Add to Plan
            </button>
          ) : (
            <button
              disabled={isDone}
              onClick={() => {
                markDone(workout.id);
                toast("Workout marked as done");
              }}
              className={`px-4 py-2 text-xs font-bold transition ${
                isDone
                  ? "bg-white/10 text-muted"
                  : "border border-acid text-acid hover:bg-acid hover:text-black"
              }`}
            >
              <Check size={14} className="mr-1 inline" />
              {isDone ? "Done" : "Mark as Done"}
            </button>
          )}

          <button
            onClick={() => {
              if (savedMode) {
                removeFromSaved(workout.id);
                toast("Removed from saved");
              } else {
                removeFromPlan(workout.id);
                toast("Removed from today's plan");
              }
            }}
            className="grid h-8 w-8 place-items-center border border-white/15 text-muted transition hover:border-red-400 hover:text-red-400"
            aria-label={`Remove ${workout.name}`}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
