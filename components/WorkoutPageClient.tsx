"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/lib/types";
import DetailClient from "./DetailClient";
import Loading from "./Loading";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutPageClient({ id }: { id: string }) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json() as Promise<Workout[]>;
      })
      .then((workouts) => {
        const match = workouts.find((item) => String(item.id) === id);
        setWorkout(match ?? null);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Loading text="Loading workout…" />;
  }

  if (error) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-5">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-acid">
            Connection error
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase">
            Could not load workout
          </h1>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-5">
        <div className="text-center">
          <p className="font-display text-7xl font-bold text-acid">404</p>
          <h1 className="mt-2 font-display text-5xl font-bold uppercase">
            Workout not found
          </h1>
        </div>
      </main>
    );
  }

  return <DetailClient workout={workout} />;
}
