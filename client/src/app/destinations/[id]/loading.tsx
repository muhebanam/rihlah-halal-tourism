export default function DestinationDetailsLoading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 animate-pulse">
      <div className="h-4 w-32 rounded bg-muted" />
      <div className="mt-6 h-72 w-full rounded-2xl bg-muted md:h-96" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_310px]">
        <div className="space-y-4">
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-10 w-3/4 rounded-lg bg-muted" />
          <div className="h-5 w-48 rounded bg-muted/70" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="h-20 rounded-xl bg-muted" />
            <div className="h-20 rounded-xl bg-muted" />
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-4 w-full rounded bg-muted/60" />
            <div className="h-4 w-5/6 rounded bg-muted/60" />
            <div className="h-4 w-4/6 rounded bg-muted/60" />
          </div>
        </div>
        <div className="h-80 rounded-xl bg-muted" />
      </div>
    </main>
  );
}

