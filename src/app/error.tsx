'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <h2 className="text-destructive text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">{error.message || 'An unexpected error occurred. Please try again.'}</p>
        <div className="flex justify-center space-x-4 pt-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          <Button onClick={() => reset()}>Try Again</Button>
        </div>
      </div>
    </div>
  );
}
