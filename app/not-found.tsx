import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[75vh] place-items-center px-5">
      <div className="text-center">
        <p className="font-display text-8xl font-bold text-acid">404</p>
        <h1 className="mt-2 font-display text-5xl font-bold uppercase">
          Route not found
        </h1>
        <p className="mt-3 text-sm text-muted">
          That workout or page does not exist.
        </p>
        <Link
          href="/"
          className="mt-7 inline-block bg-acid px-5 py-3 text-xs font-bold uppercase tracking-widest text-black"
        >
          Back to workouts
        </Link>
      </div>
    </main>
  );
}
