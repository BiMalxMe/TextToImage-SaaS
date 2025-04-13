"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "./components/Logo";

export const Header = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect signed-in users to the dashboard
    if (isSignedIn && pathname !== "/protected" && pathname !== "/images") {
      router.push("/protected");
    }
  }, [isSignedIn, router, pathname]);

  const handleRegisterClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  };

  return (
    <div className="bg-blue-950 rounded-xl sticky mt-10 w-full max-w-4xl mx-auto py-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Logo/>
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <main className="pt-30 flex justify-center items-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-2xl w-full text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
            Transform Your Ideas into Stunning Images
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl">
            With <span className="font-semibold">Bimalxgenerate</span>, turn your imagination into AI-powered artwork. Perfect for content creators, designers, marketers, and dreamers.
          </p>

          <div className="w-full space-y-4">
            <Link href={"/protected"}>
              <button className="mb-5 cursor-pointer w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-semibold py-3 sm:py-4 rounded-xl text-lg hover:scale-105 transition-transform">
                Dashboard
              </button>
            </Link>
            <Link href={"/sign-up"}>
              <button className="mb-5 cursor-pointer w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-semibold py-3 sm:py-4 rounded-xl text-lg hover:scale-105 transition-transform">
                Signup
              </button>
            </Link>
            <Link href={"/sign-in"}>
              <button className="cursor-pointer w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-semibold py-3 sm:py-4 rounded-xl text-lg hover:scale-105 transition-transform">
                Login
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="bg-black py-12 sm:py-16 md:py-20 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 text-transparent bg-clip-text">
          How It Works
        </h2>
        <p className="text-lg sm:text-xl max-w-xl mx-auto text-gray-300">
          Just enter a text description, and our AI instantly turns your idea into a beautiful image.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 max-w-2xl w-full mx-auto text-center space-y-6 mt-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-xl sm:text-2xl text-white font-semibold">
              How do I use the Text-to-Image Generator?
            </h3>
            <p className="text-white/90 text-lg sm:text-xl">
              Login paxi img create garne and malai donate hanni esewa 9814479922
            </p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-xl sm:text-2xl text-white font-semibold">
              Is there a limit to how many images I can generate?
            </h3>
            <p className="text-white/90 text-lg sm:text-xl">
              I am getting in free so why bother
            </p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-xl sm:text-2xl text-white font-semibold">
              Can I share my generated images?
            </h3>
            <p className="text-white/90 text-lg sm:text-xl">
              no not directly i can give link and you can copy
            </p>
          </div>

          <div className="bg-black/30 p-4 rounded-lg">
            <h3 className="text-xl sm:text-2xl text-white font-semibold">
              What is the cost of using the tool?
            </h3>
            <p className="text-white/90 text-lg sm:text-xl">
              Nothing
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-6 text-white text-center mt-10">
        <p>© 2025 Bimalxgenerate. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
