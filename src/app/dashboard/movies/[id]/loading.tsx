export default function MovieDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="bg-muted h-8 w-48 rounded-md" />
        <div className="bg-muted mt-4 h-6 w-64 rounded-md" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="bg-muted h-48 rounded-lg" />
          <div className="bg-muted h-64 rounded-lg" />
        </div>
        <div className="space-y-6">
          <div className="bg-muted aspect-[2/3] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
