"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getDone,
  getPlan,
  getSaved,
  saveDone,
  savePlan,
  saveSaved,
} from "@/lib/storage";
import { Workout } from "@/lib/types";

type Store = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const sync = () => {
      setPlan(getPlan());
      setSaved(getSaved());
      setDone(getDone());
    };
    sync();
    window.addEventListener("fitlog-storage", sync);
    return () => window.removeEventListener("fitlog-storage", sync);
  }, []);

  const value = useMemo<Store>(
    () => ({
      plan,
      saved,
      done,
      addToPlan(workout) {
        if (plan.some((item) => item.id === workout.id) || plan.length >= 5) {
          return false;
        }

        const next = [...plan, workout];
        setPlan(next);
        savePlan(next);
        return true;
      },
      saveForLater(workout) {
        if (saved.some((item) => item.id === workout.id)) {
          return false;
        }

        const next = [...saved, workout];
        setSaved(next);
        saveSaved(next);
        return true;
      },
      removeFromPlan(id) {
        const next = plan.filter((item) => item.id !== id);
        setPlan(next);
        savePlan(next);
      },
      removeFromSaved(id) {
        const next = saved.filter((item) => item.id !== id);
        setSaved(next);
        saveSaved(next);
      },
      markDone(id) {
        if (done.includes(id)) {
          return;
        }

        const next = [...done, id];
        setDone(next);
        saveDone(next);
      },
    }),
    [plan, saved, done],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return value;
}
