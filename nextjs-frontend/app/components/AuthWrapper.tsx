'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && pathname !== '/dashboard') {
        // Redirect signed-in users to the dashboard if they are not already there
        router.push('/dashboard');
      } else if (!isSignedIn && pathname !== '/sign-in') {
        // Redirect non-signed-in users to the sign-in page if they are not already there
        router.push('/');
      }
    }
  }, [isLoaded, isSignedIn, router, pathname]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Render children only if the user is authenticated, or if they are on a public page.
  return children;
}
