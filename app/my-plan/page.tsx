import { Suspense } from "react";
import Loading from "@/components/Loading";
import MyPlanClient from "@/components/MyPlanClient";

export default function MyPlanPage() {
  return (
    <Suspense fallback={<Loading text="Loading workouts…" />}>
      <MyPlanClient />
    </Suspense>
  );
}
