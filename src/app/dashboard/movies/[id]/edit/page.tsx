'use client';

import { MovieForm } from '@/components/movie-form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import React from 'react';

// Mock function to fetch movie data - replace with actual API call
const getMovie = async (id: string) => {
  const movies = [
    {
      id: '1',
      title: 'Inception',
      overview:
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      releaseDate: new Date('2010-07-16'),
      rating: 4.5,
      status: 'WATCHED' as const,
    },
    // Add more mock movies as needed
  ];

  return movies.find((movie) => movie.id === id) || null;
};

export default function EditMoviePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialData, setInitialData] = React.useState<any>(null);

  // Fetch movie data
  React.useEffect(() => {
    async function fetchMovie() {
      try {
        const movie = await getMovie(params.id);
        if (movie) {
          setInitialData(movie);
        } else {
          router.push('/404');
        }
      } catch (error) {
        console.error('Failed to fetch movie:', error);
        toast({
          title: 'Error',
          description: 'Failed to load movie data. Please try again.',
          variant: 'destructive',
        });
      }
    }

    fetchMovie();
  }, [params.id, router]);

  async function onSubmit(data: any) {
    setIsLoading(true);

    try {
      // In a real app, you would make an API call to update the movie
      console.log('Updating movie:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Success!',
        description: 'Movie updated successfully.',
      });

      // Redirect to movie detail page
      router.push(`/dashboard/movies/${params.id}`);
    } catch (error) {
      console.error('Error updating movie:', error);
      toast({
        title: 'Error',
        description: 'Failed to update movie. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!initialData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Movie</h1>
          <p className="text-muted-foreground">Update the details of {initialData.title}</p>
        </div>
        <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
      </div>

      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <MovieForm initialData={initialData} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
