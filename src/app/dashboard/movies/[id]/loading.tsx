export default function MovieDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-8 w-48 rounded-md bg-muted" />
        <div className="mt-4 h-6 w-64 rounded-md bg-muted" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="h-48 rounded-lg bg-muted" />
          <div className="h-64 rounded-lg bg-muted" />
        </div>
        <div className="space-y-6">
          <div className="aspect-[2/3] w-full rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
