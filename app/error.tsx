"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-acid">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-6xl font-bold uppercase">
          Could not load FitLog
        </h1>
        <button
          onClick={() => reset()}
          className="mt-6 bg-acid px-5 py-3 text-xs font-bold uppercase tracking-widest text-black"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
