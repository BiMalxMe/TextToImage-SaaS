import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import AuthWrapper from './components/AuthWrapper';
import { Poppins } from 'next/font/google';

// ✅ Load the Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Choose your desired weights
  variable: '--font-poppins',
});

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
      <html lang="en" className={poppins.variable}>
        {/* Apply the font and letter spacing globally */}
        <body className="font-poppins tracking-wide"> {/* Add `tracking-wide` for more spacing */}
          <AuthWrapper>{children}</AuthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
