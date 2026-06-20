import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { Filter, MoreHorizontal, Plus, Search } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual data from your API
const movies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    rating: 4.5,
    status: 'Watched',
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    rating: 4.8,
    status: 'Watched',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    director: 'Christopher Nolan',
    rating: 4.7,
    status: 'Watched',
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    year: 1994,
    director: 'Quentin Tarantino',
    rating: 4.6,
    status: 'Watchlist',
  },
  {
    id: 5,
    title: 'The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    rating: 4.9,
    status: 'Watched',
  },
];

export default function MoviesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
          <p className="text-muted-foreground">Manage your movie collection and track what you've watched</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/movies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Movie
          </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full md:max-w-sm">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input type="search" placeholder="Search movies..." className="w-full pl-8" />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-10">
            Sort
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Director</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell className="font-medium">{movie.title}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{movie.rating}/5</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      movie.status === 'Watched'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {movie.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}
