import { Metadata } from 'next';
import { Header } from './components/Header';
import Link from "next/link";


//come seo tags
export const metadata: Metadata = {
  metadataBase: new URL("https://bimalxgenerate.vercel.app"),
  title: 'Bimalxgenerate - Text-to-Image Generator Landing Page',
  description: 'Bimalxgenerate: Transform your text descriptions into beautiful, AI-generated images. Create visuals for your projects, content, and ideas in seconds.',
  openGraph: {
    title: 'Bimalxgenerate - Text-to-Image Generator',
    description: 'Generate stunning visuals from your text descriptions using Bimalxgenerate AI. Quick, simple, and powerful tool for your creative needs.',
    url: 'https://bimalxgenerate.vercel.app',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bimalxgenerate preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bimalxgenerate - Text-to-Image Generator',
    description: 'Create high-quality images from text with Bimalxgenerate AI-powered tool.',
    images: ['/images/og-image.jpg'],
  },
  robots: 'index, follow',
};

export default function LandingPage() {
  return (
    <div className="h-screen bg-cover bg-center">
      <Header />
      {/* Main Content */}
      <main className="flex justify-center items-center h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-2xl w-full text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
            Transform Your Ideas into Stunning Images
          </h1>

          <p className="text-white/90 text-base sm:text-lg md:text-xl">
            With <span className="font-semibold">Bimalxgenerate</span>, turn your imagination into AI-powered artwork. Perfect for content creators, designers, marketers, and dreamers.
          </p>

          <div className="w-full space-y-4 ">
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

      {/* Section fot adding the desc */}
      <section className="bg-black py-12 sm:py-16 md:py-20 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 text-transparent bg-clip-text">
          How It Works
        </h2>
        <p className="text-lg sm:text-xl max-w-xl mx-auto text-gray-300">
          Just enter a text description, and our AI instantly turns your idea into a beautiful image.
        </p>
      </section>

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
Login paxi img create garne and malai donate hanni esewa 9814479922      </p>
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
no not directly i can give link and you can copy      </p>
    </div>

    <div className="bg-black/30 p-4 rounded-lg">
      <h3 className="text-xl sm:text-2xl text-white font-semibold">
        What is the cost of using the tool?
      </h3>
      <p className="text-white/90 text-lg sm:text-xl">
Nothing      </p>
    </div>
  </div>
</section>


      {/* Footer Section */}
      <footer className="bg-black py-6 text-white text-center">
        <p>© 2025 Bimalxgenerate. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
