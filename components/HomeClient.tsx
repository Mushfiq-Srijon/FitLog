"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Dumbbell } from "lucide-react";
import { Workout } from "@/lib/types";
import { heroImage } from "@/lib/media";
import WorkoutLibrary from "./WorkoutLibrary";

export default function HomeClient({ workouts }: { workouts: Workout[] }) {
  return (
    <>
      <main className="bg-ink">
        <section className="mx-auto mt-10 grid max-w-[1232px] gap-8 border-x border-line rounded-2xl bg-panel px-14 py-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-acid">
              Workout Library
            </p>
            <h1 className="max-w-[560px] font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.035em]">
              Train with intent. Log every set.
            </h1>
            <p className="mt-5 max-w-[510px] text-sm leading-6 text-muted">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <Link
              href="#library"
              className="mt-5 inline-flex items-center gap-3 bg-acid px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-black transition hover:bg-white rounded-md"
            >
              <span>Browse workouts</span>
            </Link>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[334px]">
            <Image
              src={heroImage}
              alt="Anatomy illustration using a preacher curl machine"
              fill
              priority
              className="object-contain"
              sizes="334px"
            />
          </div>
        </section>

        <WorkoutLibrary workouts={workouts} />
      </main>
    </>
  );
}
