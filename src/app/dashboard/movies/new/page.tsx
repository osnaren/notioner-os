'use client';

import { MovieForm } from '@/components/movie-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AddMoviePage() {
  const router = useRouter();

  async function onSubmit(data: any) {
    // In a real app, you would make an API call to save the movie
    console.log('Submitting movie:', data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to movies list
    router.push('/dashboard/movies');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Movie</h1>
          <p className="text-muted-foreground">Add a new movie to your collection</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <MovieForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
