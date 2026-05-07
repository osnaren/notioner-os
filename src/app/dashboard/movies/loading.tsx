export default function MoviesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-9 w-48 rounded-md bg-muted" />
          <div className="h-5 w-64 rounded-md bg-muted" />
        </div>
        <div className="h-10 w-32 rounded-md bg-muted" />
      </div>

      <div className="flex flex-col space-y-2">
        <div className="h-10 w-full rounded-md bg-muted" />
        <div className="h-10 w-full rounded-md bg-muted" />
      </div>

      <div className="rounded-md border">
        <div className="h-12 w-full border-b bg-muted/50" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full border-b p-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-1/4 rounded bg-muted" />
              <div className="h-5 w-1/6 rounded bg-muted" />
              <div className="h-5 w-16 rounded bg-muted" />
              <div className="h-5 w-16 rounded bg-muted" />
              <div className="h-5 w-10 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <div className="h-10 w-24 rounded-md bg-muted" />
        <div className="h-10 w-24 rounded-md bg-muted" />
      </div>
    </div>
  );
}
