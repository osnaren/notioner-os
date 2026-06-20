import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string or timestamp into a human-readable format
 */
export function formatDate(
  input: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', options);
}

/**
 * Formats a date and time into a human-readable format
 */
export function formatDateTime(
  input: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
): string {
  const date = new Date(input);
  return date.toLocaleString('en-US', options);
}

/**
 * Creates an absolute URL by prepending the app's base URL
 */
export function absoluteUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Truncates a string to a specified length and adds an ellipsis if needed
 */
export function truncate(str: string, length: number, ellipsis = '...') {
  if (str.length <= length) return str;
  return `${str.substring(0, length)}${ellipsis}`;
}

/**
 * Type guard to check if a value is an array of File objects
 */
export function isArrayOfFile(files: unknown): files is File[] {
  return Array.isArray(files) && files.every((file) => file instanceof File);
}

/**
 * Formats a file size in bytes to a human-readable string
 */
export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal',
  includeSpace = true
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];

  if (bytes === 0) return `0${includeSpace ? ' ' : ''}Bytes`;

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizeArray = sizeType === 'accurate' ? accurateSizes : sizes;
  const size = sizeArray[Math.min(i, sizeArray.length - 1)] || 'Bytes';

  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)}${includeSpace ? ' ' : ''}${size}`;
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Creates a throttled function that only invokes `func` at most once per `limit` milliseconds
 */
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generates a random string of the specified length
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Converts a string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:\w)([A-Z])/g, (m) => m[0] + '-' + m[1])
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * Converts a string to Title Case
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

/**
 * Checks if the current environment is development
 */
export const isDev = process.env.NODE_ENV === 'development';

/**
 * Checks if the current environment is production
 */
export const isProd = process.env.NODE_ENV === 'production';

/**
 * Safely access nested object properties
 */
export function getNestedValue<T = unknown>(obj: Record<string, any>, path: string, defaultValue?: T): T | undefined {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return value !== undefined ? (value as T) : defaultValue;
}

/**
 * Removes null and undefined values from an object
 */
export function removeNullish<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce<Partial<T>>((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      (acc as any)[key] = value;
    }
    return acc;
  }, {});
}

/**
 * Creates a promise that resolves after the specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a type-safe version of Object.keys
 */
export const objectKeys = <T extends object>(obj: T) => Object.keys(obj) as Array<keyof T>;

/**
 * Creates a type-safe version of Object.entries
 */
export const objectEntries = <T extends object>(obj: T) => Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
