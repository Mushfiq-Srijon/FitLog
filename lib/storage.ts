import { Workout } from "./types";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("fitlog-storage"));
}

export function getPlan(): Workout[] {
  return read<Workout[]>(PLAN_KEY, []);
}

export function getSaved(): Workout[] {
  return read<Workout[]>(SAVED_KEY, []);
}

export function getDone(): number[] {
  return read<number[]>(DONE_KEY, []);
}

export function savePlan(items: Workout[]) {
  write(PLAN_KEY, items);
}

export function saveSaved(items: Workout[]) {
  write(SAVED_KEY, items);
}

export function saveDone(items: number[]) {
  write(DONE_KEY, items);
}
