declare module 'next-themes' {
  export { ThemeProviderProps };

  export interface ThemeProviderProps {
    children: React.ReactNode;
    /**
     * Default theme. If `system` is used, the preferred color scheme will be used.
     * Defaults to `system`.
     */
    defaultTheme?: string;
    /**
     * Enable system color scheme support. When set to `true`, the theme will be
     * updated based on the user's system color scheme preference.
     * Defaults to `true`.
     */
    enableSystem?: boolean;
    /**
     * Disable all CSS transitions when switching themes.
     * Defaults to `false`.
     */
    disableTransitionOnChange?: boolean;
    /**
     * Whether to indicate to browsers which color scheme is used (dark or light)
     * for built-in UI like inputs and buttons.
     * Defaults to `true`.
     */
    enableColorScheme?: boolean;
    /**
     * Key used to store theme setting in localStorage.
     * Defaults to `theme`.
     */
    storageKey?: string;
    /**
     * List of themes that should be available.
     * Defaults to `['light', 'dark']`.
     */
    themes?: string[];
    /**
     * The attribute to use for the theme.
     * Defaults to `class`.
     */
    attribute?: string | 'class';
    /**
     * The value to use for the theme when the user's system color scheme is light.
     * Defaults to `light`.
     */
    lightTheme?: string;
    /**
     * The value to use for the theme when the user's system color scheme is dark.
     * Defaults to `dark`.
     */
    darkTheme?: string;
  }

  export function useTheme(): {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    resolvedTheme: string | undefined;
    systemTheme: 'light' | 'dark';
    themes: string[];
  };

  export const ThemeProvider: React.FC<ThemeProviderProps>;
  export const ThemeScript: React.FC<ThemeProviderProps>;
}
