export default function Loading({ text = "Loading workouts…" }: { text?: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-muted">
        <span className="h-3 w-3 animate-pulse bg-acid" />
        {text}
      </div>
    </div>
  );
}
