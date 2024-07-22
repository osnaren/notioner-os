import React from "react";
import { Metadata } from "next";
import "./global.css";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Notioner",
  description: "Notioner is a tool to help you manage your Notion pages with ease.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
