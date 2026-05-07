import { RootProvider } from '@/components/providers/root-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Notioner OS',
  description: 'Supercharge your Notion workspace with powerful tools and automations',
  keywords: ['Notion', 'Productivity', 'Workspace', 'Automation', 'Tools'],
  authors: [
    {
      name: 'Your Name',
      url: 'https://yourwebsite.com',
    },
  ],
  creator: 'Your Name',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Notioner OS',
    description: 'Supercharge your Notion workspace with powerful tools and automations',
    siteName: 'Notioner OS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notioner OS',
    description: 'Supercharge your Notion workspace with powerful tools and automations',
    creator: '@yourtwitter',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-background min-h-screen font-sans antialiased', inter.variable)}>
        <RootProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
