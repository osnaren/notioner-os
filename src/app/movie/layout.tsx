import '@app/global.css';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Notioner | Movie 🍿',
  description: "Update's CineScape's movie database with ease.",
};

export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md">{children}</div>
  );
}
