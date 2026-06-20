import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <h1 className="text-foreground text-6xl font-bold tracking-tight sm:text-7xl">404</h1>
        <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">Page Not Found</h2>
        <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="pt-4">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
