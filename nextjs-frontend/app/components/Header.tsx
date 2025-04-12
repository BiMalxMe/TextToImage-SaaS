"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const Header = () => {
  const {  isSignedIn } = useUser();
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    // Redirect signed-in users to the dashboard
    if (isSignedIn && pathname !== "/protected" && pathname !== "/images") {
      router.push("/protected");
    }
  }, [isSignedIn, router]);

  // Ensure to not show the 'Register' button if the user is signed in
  const handleRegisterClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in"); // Navigate to the sign-up page
    }
  };

  return (
    <div className="bg-blue-950 rounded-xl sticky mt-10 w-3/4 mx-auto py-5 flex items-center justify-between px-5">
      <div className="scaling flex justify-center items-center">
        <Logo />
        <span className="text-2xl font-semibold bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
          BiMalxGenerate
        </span>
      </div>
      {isSignedIn ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <div>
          <button
            onClick={handleRegisterClick}
            className="hover:bg-blue-900 p-3 rounded-full cursor-pointer"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};
