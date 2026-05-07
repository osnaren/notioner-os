import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Film, Star, Ticket, User } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual data from your API
const getMovie = async (id: string) => {
  const movies = [
    {
      id: '1',
      title: 'Inception',
      year: 2010,
      director: 'Christopher Nolan',
      rating: 4.5,
      runtime: 148,
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      posterPath: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      backdropPath: '/s3TBrRGBYiavqx000QeIAyMYqm8.jpg',
      status: 'Watched',
      genres: ['Action', 'Sci-Fi', 'Thriller'],
    },
    // Add more mock movies as needed
  ];

  return movies.find(movie => movie.id === id) || null;
};

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="-ml-2">
            <Link href="/dashboard/movies">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Movies
            </Link>
          </Button>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{movie.title}</h1>
          <div className="mt-1 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {movie.year}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 text-yellow-500" />
              {movie.rating}/5
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/movies/${movie.id}/edit`}>Edit</Link>
          </Button>
          <Button>Add to Watchlist</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{movie.overview}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Director</h4>
                <p className="mt-1">{movie.director}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Genres</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      movie.status === 'Watched'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {movie.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-[2/3] w-full overflow-hidden rounded-t-lg bg-muted">
                {movie.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Film className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <Button className="w-full">
                  <Ticket className="mr-2 h-4 w-4" />
                  Log Watch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
