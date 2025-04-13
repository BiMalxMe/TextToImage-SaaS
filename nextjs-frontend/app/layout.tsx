import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import AuthWrapper from './components/AuthWrapper';
import { Poppins } from 'next/font/google';
import ClientLayout from './components/ClientLayout';
import { ToastContainer } from 'react-toastify';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Your App Description',
};


//toastprovider for the notifications
//authwrappr for the clerk file based auth
// client layout for handling node specific packages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.variable}>
        <body className="font-poppins tracking-wide">
          <ClientLayout> 
            {/* Buffer and browser related conversion lai handle garcha */}
            <ToastContainer position="top-right" autoClose={3000} />
            <AuthWrapper>{children}</AuthWrapper>
          </ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
