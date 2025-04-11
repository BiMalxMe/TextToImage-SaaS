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
  if (isSignedIn) {
    // Redirect signed-in users to protected page if not already there
    if ( pathname !== '/checkout' && pathname !== '/protected' && pathname!=="/images") {
      router.push('/protected');
    }
  } else {
    // Redirect non-signed-in users to sign-in page if not already there
    if (pathname !== '/sign-in' && pathname !== '/sign-up') {
      router.push('/');
    }
  }
}, [isSignedIn, pathname]);


  useEffect(() => {
    if (isSignedIn) {
      const email = user?.emailAddresses?.[0]?.emailAddress || '';
      const fullName = user?.fullName || '';
  
      async function createUserIfNotExists() {
        try {
          // Check if user exists first
          const checkRes = await fetch('/api/UserExists', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
  
          const checkData = await checkRes.json();
  
          if (checkData.exists) {
            console.log('User already exists, skipping creation.');
            return;
          }
  
          // If not, create user
          const response = await fetch('/api/createUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, fullName }),
          });
  
          const data = await response.json();
  
          if (response) {
            console.log('User created:', data.user);
          } else {
            console.error('Error creating user:', data.error);
          }
        } catch (error) {
          console.error('Error during user creation:', error);
        }
      }
  
      createUserIfNotExists();
    }
  }, [isSignedIn, user]);
  

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
