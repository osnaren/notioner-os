'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart2, FileText, Film, Home, Plus, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

export function Sidebar() {
  const pathname = usePathname();

  const items: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: 'Movies',
      href: '/dashboard/movies',
      icon: <Film className="h-4 w-4" />,
    },
    {
      title: 'Templates',
      href: '/dashboard/templates',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: 'Team',
      href: '/dashboard/team',
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: <BarChart2 className="h-4 w-4" />,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-4 p-4">
      <div className="px-3 py-2">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Menu</h2>
        <div className="space-y-1">
          {items.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn('w-full justify-start', pathname === item.href ? 'bg-muted' : '')}
              asChild
              disabled={item.disabled}
            >
              <Link href={item.href}>
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <Button className="w-full" asChild>
          <Link href="/dashboard/movies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Movie
          </Link>
        </Button>
      </div>
    </div>
  );
}
