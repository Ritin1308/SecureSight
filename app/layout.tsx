import React from 'react';

// It's good practice to add global styles and metadata here
// For example: import './globals.css';

export const metadata = {
  title: 'MANDLACX Dashboard',
  description: 'Security and Incident Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}