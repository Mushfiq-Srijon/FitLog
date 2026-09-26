import { Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutLibrary({ workouts }: { workouts: Workout[] }) {
  return (
    <section
      id="library"
      className="mx-auto max-w-[1232px] scroll-mt-6 px-6 pb-16 pt-16"
    >
      <div className="mb-8">
        <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
          The Library
        </h2>
        <p className="mt-3 text-sm text-muted">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {workouts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="border border-line py-20 text-center text-xs uppercase tracking-widest text-muted">
          No workouts found
        </div>
      )}
    </section>
  );
}
