import { Footer } from '@/components/footer';
import { MainNav } from '@/components/main-nav';
import { Sidebar } from '@/components/sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center space-x-4">{/* User account dropdown or other header items */}</div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r lg:block">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
