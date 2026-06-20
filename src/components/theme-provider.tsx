'use client';

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

/**
 * A wrapper around next-themes' ThemeProvider that provides type safety
 * and additional configuration options.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
