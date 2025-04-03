import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import AuthWrapper from './components/AuthWrapper';

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Your App Description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <AuthWrapper>{children}</AuthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}