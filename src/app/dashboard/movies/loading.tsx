export default function MoviesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="bg-muted h-9 w-48 rounded-md" />
          <div className="bg-muted h-5 w-64 rounded-md" />
        </div>
        <div className="bg-muted h-10 w-32 rounded-md" />
      </div>

      <div className="flex flex-col space-y-2">
        <div className="bg-muted h-10 w-full rounded-md" />
        <div className="bg-muted h-10 w-full rounded-md" />
      </div>

      <div className="rounded-md border">
        <div className="bg-muted/50 h-12 w-full border-b" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full border-b p-4">
            <div className="flex items-center justify-between">
              <div className="bg-muted h-5 w-1/4 rounded" />
              <div className="bg-muted h-5 w-1/6 rounded" />
              <div className="bg-muted h-5 w-16 rounded" />
              <div className="bg-muted h-5 w-16 rounded" />
              <div className="bg-muted h-5 w-10 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <div className="bg-muted h-10 w-24 rounded-md" />
        <div className="bg-muted h-10 w-24 rounded-md" />
      </div>
    </div>
  );
}
