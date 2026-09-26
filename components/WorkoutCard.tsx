import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { workoutImage } from "@/lib/media";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block border border-line bg-panel rounded-xl transition hover:-translate-y-1 hover:border-acid"
    >
      <div className="relative aspect-[2.05] overflow-hidden bg-[#1f232b] rounded-t-xl">
        <Image
          src={workoutImage}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 pt-5">
        <div className="mb-3 flex min-h-[21px] flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="bg-acid px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-wide">
          {workout.name}
        </h3>
        <p className="mt-2 truncate text-xs font-semibold text-muted">
          {workout.equipment}
        </p>

        <div className="mt-5 grid grid-cols-3 border-2 border-line pt-3 text-xs text-[#d1d5db]">
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={14} />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center justify-end gap-1.5">
            <Star size={14} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
