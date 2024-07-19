export const metadata = {
  title: 'Notioner',
  description: 'Notioner is a tool to help you manage your Notion pages with ease.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
