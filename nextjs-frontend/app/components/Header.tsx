"use client";
import { UserButton, useUser } from '@clerk/nextjs';
import { Logo } from './Logo';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Header = () => {
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        // Redirect signed-in users to the dashboard
        // @ts-ignore
        if (isSignedIn && router.pathname !== '/protected') {
            router.push('/protected');
        }
    }, [isSignedIn, router]);

    // Ensure to not show the 'Register' button if the user is signed in
    const handleRegisterClick = () => {
        if (!isSignedIn) {
            router.push('/sign-in'); // Navigate to the sign-up page
        }
    };

    return (
        <div className="bg-blue-900 rounded-xl sticky mt-10 w-3/4 mx-auto py-5 flex items-center justify-between px-5">
            <div className="scaling">
                <Logo />
            </div>
            {isSignedIn ? (
                <div className="scaling">
                    <UserButton />
                </div>
            ) : (
                <div className="scaling">
                    <button onClick={handleRegisterClick}>Register</button>
                </div>
            )}
        </div>
    );
};
