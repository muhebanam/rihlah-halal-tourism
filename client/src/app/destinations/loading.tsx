export default function DestinationsLoading() {
  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="h-3.5 w-36 rounded bg-muted" />
            <div className="mt-3 h-10 w-72 rounded-lg bg-muted" />
            <div className="mt-2 h-4 w-96 max-w-full rounded bg-muted/70" />
          </div>
          <div className="h-9 w-36 rounded-lg bg-muted" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_200px_auto]">
            <div className="h-9 rounded-lg bg-muted" />
            <div className="h-9 rounded-lg bg-muted" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-7 w-24 rounded-full bg-muted" />
            ))}
          </div>
        </div>

        {/* Cards Skeleton Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card p-3.5"
            >
              <div className="h-52 w-full rounded-lg bg-muted" />
              <div className="mt-4 space-y-2.5">
                <div className="h-3.5 w-24 rounded bg-muted" />
                <div className="h-6 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

