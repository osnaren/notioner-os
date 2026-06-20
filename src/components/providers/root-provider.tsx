'use client';

import { Toaster } from '@/components/ui/sonner';
import * as React from 'react';
import { ThemeProvider } from './theme-provider';

interface RootProviderProps {
  children: React.ReactNode;
  themeProps?: React.ComponentProps<typeof ThemeProvider>;
}

export function RootProvider({ children, themeProps }: RootProviderProps) {
  return (
    <ThemeProvider {...themeProps}>
      {children}
      <Toaster position="top-center" richColors closeButton />
    </ThemeProvider>
  );
}
