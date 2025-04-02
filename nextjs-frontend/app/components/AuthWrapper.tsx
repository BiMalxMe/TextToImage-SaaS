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
      if (isSignedIn && pathname !== '/protected') {
        router.push('/protected');
      } else if (!isSignedIn && pathname !== '/sign-in'){
          router.push('/sign-in')
      }
    }
  }, [isLoaded, isSignedIn, router, pathname]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Render children only if the user is authenticated, or if they are on a public page.
  if (isSignedIn || pathname === '/sign-in') {
    return <>{children}</>;
  }

  return null;
}