"use client";

import { useEffect, useState } from "react";
import HomeClient from "./HomeClient";
import Loading from "./Loading";
import { Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => setWorkouts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading text="Loading workouts…" />;
  }

  if (error) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-5">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-acid">
            Connection error
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase">
            Could not load workouts
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-acid px-5 py-3 text-xs font-bold uppercase tracking-widest text-black"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return <HomeClient workouts={workouts} />;
}
