"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const Header = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect signed-in users to the dashboard
    if (isSignedIn && pathname !== "/protected" && pathname !== "/images") {
      router.push("/protected");
    }
  }, [isSignedIn, router]);

  const handleRegisterClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  };

  return (
    <div className="bg-blue-950 rounded-xl sticky mt-10 w-full max-w-4xl mx-auto py-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Logo />
        <span className="text-2xl font-semibold bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
          BiMalxGenerate
        </span>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <button
          onClick={handleRegisterClick}
          className="hover:bg-blue-900 px-4 py-2 rounded-full transition duration-200"
        >
          Register
        </button>
      )}
    </div>
  );
};
