"use client"; // Important: useUser is a client-side hook

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import DarkButton from "../components/Button";

export default function ProtectedPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <div className="mt-30 w-3/4 mx-auto p-5 rounded-lg leading-relaxed">
        <div className="flex justify-center">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600 text-2xl font-bold p-4">
            Unleash Your Imagination: Describe an Image You Want to Create!
          </h1>
        </div>
        <div>
          <Input text="Describe the image you want to create..." /> {/* Fixed placeholder */}
        </div>
        <div className="mt-3 flex justify-center items-center mx-auto">
          <DarkButton text="Generate Image" />
        </div>
      </div>

      {/* Buttons on the same line */}
      <div className="flex justify-between mt-40 mx-auto w-3/4">
        <div className="flex justify-start">
          <DarkButton text="Donate Us" />
        </div>
        <div className="flex justify-end">
          <DarkButton text="Generated History" />
        </div>
      </div>
    </div>
  );
}
