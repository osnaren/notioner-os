import React from "react";
import { Metadata } from "next";
import "@app/global.css";

export const metadata: Metadata = {
  title: "Notioner | Movie 🍿",
  description: "Update's CineScape's movie database with ease.",
};

export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden rounded-md">{children}</div>
  );
}
