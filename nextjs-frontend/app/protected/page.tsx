'use client'; // Important: useUser is a client-side hook

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '../components/Header';

export default function ProtectedPage() {
  const { isLoaded, isSignedIn,user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return <div>
    <Header />
    <div className='bg-red-500'>

    bimallll
    </div>
  </div>;
}