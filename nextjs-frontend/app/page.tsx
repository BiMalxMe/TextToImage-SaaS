// app/page.js
import { Metadata } from 'next';
import { Header } from './components/Header';
import Link from "next/link"

export const metadata = {
metadataBase: new URL("http://localhost:3000"), // Listing a base Url
  title: 'Bimalxgenerate - Text-to-Image Generator Landing Page',
  description: 'Bimalxgenerate: Transform your text descriptions into beautiful, AI-generated images. Create visuals for your projects, content, and ideas in seconds.',
  openGraph: {
    title: 'Bimalxgenerate - Text-to-Image Generator',
    description: 'Generate stunning visuals from your text descriptions using Bimalxgenerate AI. Quick, simple, and powerful tool for your creative needs.',
    images: ['/images/og-image.jpg'],
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
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.webp')" }}>
      <div>
        <Header />
      </div>

      <div className="flex justify-center items-center h-[calc(100vh-80px)] px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center space-y-6">
          
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
            Transform Your Ideas into Stunning Images
          </h1>

          <p className="text-white/90 text-lg sm:text-xl">
            With <span className="font-semibold">Bimalxgenerate</span>, turn your imagination into AI-powered artwork. Perfect for content creators, designers, marketers, and dreamers.
          </p>

          <div className="w-full space-y-4 ">
          <Link href={"/sign-up"}>
          <button
              className="mb-5 cursor-pointer w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-semibold py-4 rounded-xl text-lg hover:scale-105 transition-transform"
            >
              Signup
            </button></Link> 
          <Link href={"/sign-in"}>
          <button
              className="cursor-pointer w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white font-semibold py-4 rounded-xl text-lg hover:scale-105 transition-transform"
            >
              Login
            </button></Link> 
            
          </div>
        </div>
      </div>
      <div className="bg-black py-20 text-white text-center">
  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 text-transparent bg-clip-text">
    How It Works
  </h2>
  <p className="text-lg max-w-xl mx-auto text-gray-300">
    Just enter a text description, and our AI instantly turns your idea into a beautiful image.
  </p>
</div>


      <footer className="bg-black py-6 text-white text-center">
        <p>© 2025 Bimalxgenerate. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
