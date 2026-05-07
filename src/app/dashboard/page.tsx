import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Film, Plus, Star } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data - replace with actual data from your API
  const stats = [
    { name: 'Total Movies', value: '1,234', icon: Film },
    { name: 'Watchlist', value: '42', icon: Clock },
    { name: 'Watched', value: '1,192', icon: CheckCircle },
    { name: 'Average Rating', value: '4.2', icon: Star },
  ];

  const recentMovies = [
    { id: 1, title: 'Inception', year: 2010, rating: 4.5 },
    { id: 2, title: 'The Shawshank Redemption', year: 1994, rating: 4.8 },
    { id: 3, title: 'The Dark Knight', year: 2008, rating: 4.7 },
    { id: 4, title: 'Pulp Fiction', year: 1994, rating: 4.6 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your movie collection.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/movies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Movie
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-xs">+20.1% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Movies</CardTitle>
            <CardDescription>Your recently added movies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovies.map((movie) => (
                <div key={movie.id} className="flex items-center justify-between">
                  <div>
                    <p className="leading-none font-medium">{movie.title}</p>
                    <p className="text-muted-foreground text-sm">{movie.year}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{movie.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common actions for your movies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/movies/import">
                  <Plus className="mr-2 h-4 w-4" />
                  Import Movies
                </Link>
              </Button>
              {/* <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/templates">
                  <FileText className="mr-2 h-4 w-4" />
                  Use Template
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Reports
              </Button> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
