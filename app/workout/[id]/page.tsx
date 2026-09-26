import WorkoutPageClient from "@/components/WorkoutPageClient";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkoutPageClient id={id} />;
}
