'use client';

import { SignedIn, useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from './Loading';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  //Data is coming Properly
// console.log( user?.emailAddresses?.[0]?.emailAddress)
// console.log(user?.fullName )
useEffect(() => {
    const handleAuth = async () => {
      if (isLoaded) {
        if (isSignedIn) {
          // Redirect signed-in users to protected page if not already there
          if (pathname !== '/protected' && pathname !== '/checkout') {
            router.push('/protected');
          }
        } else {
          // Redirect non-signed-in users to sign-in page if not already there
          if (pathname !== '/sign-in' && pathname !== '/sign-up') {
            router.push('/');
          }
        }
      }
    };

    handleAuth();
  }, [isLoaded, isSignedIn, router, pathname, user]);
useEffect(()=>{
  if(isSignedIn) {
    // Call API route to create user in the database
    const email = user?.emailAddresses?.[0]?.emailAddress || '';
    const fullName = user?.fullName || '';
    
    // POST request to create the user
    async function fetchingFromApiUser(){
    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullName }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User created:', data.user);
      } else {
        console.error('Error creating user:', data.error);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  }
}
},[SignedIn]
)

  if (!isLoaded) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loading h={33} w={33} />
      </div>
    );
  }

  // Render children only if the user is authenticated, or if they are on a public page.
  return children;
}
