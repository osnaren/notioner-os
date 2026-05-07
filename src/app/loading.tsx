'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Loading spinner component that can be used inline
interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className, ...props }: LoadingSpinnerProps) {
  return (
    <div 
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <Loader2 
        className="animate-spin text-primary" 
        style={{
          height: size,
          width: size,
        }}
      />
    </div>
  );
}
