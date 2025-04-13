"use client"; // Important: useUser is a client-side hook

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import DarkButton from "../components/Button";
import { Card } from "../components/Card";
import { Download } from "../components/Download";
import { Share } from "../components/Share";
import Link from "next/link";
import ApiHandler from "../components/ApiHandler";

// Import Toastify components
import { toast } from "react-toastify";

export default function ProtectedPage() {
  // Check if user is loaded and signed in before accessing email
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [inputedText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [generated, setGenerated] = useState(false);
  const [entered, setEntered] = useState(false);

  // Get email of logged in user
  const email =
    isLoaded && isSignedIn ? user?.emailAddresses?.[0]?.emailAddress : "";

  // Function to handle image generation
  const handleGenerateImage = async () => {
    setLoading(true);

    // Function to create image record in database
    const createImage = async (
      prompt: string,
      imageUrl: string,
      email: string
    ) => {
      console.log("o chai hoo hai" + prompt + imageUrl);
      try {
        // Make the POST request to imageGen API endpoint
        const response = await fetch("/api/ImgGenerations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt, // The prompt for the image generation
            imageUrl, // The URL of the generated image
            email,
          }),
        });

        // Check if the request was successful
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData.error);
          toast.error("Failed to generate image. Please try again later.");
          return;
        }

        const data = await response.json();
        console.log("Image generated successfully:", data.imageGenerated);
        toast.success("Image generated successfully!");
      } catch (error) {
        console.error("Error during fetch:", error);
        toast.error(
          "An error occurred while generating the image. Please try again."
        );
      }
    };

    // Call image generator only if text is entered
    // trim to remove the spacess
    if (inputedText.trim()) {
      const response = await ApiHandler({ text: inputedText });
      setLoading(false);
      setImageUrl(response.image_url);
      setGenerated(true);
      setEntered(false);
      createImage(inputedText, response.image_url, email);
    } else {
      toast.error("Please enter a description for the image.");
      setLoading(false);
    }
  };

  // Redirect to sign-in page if user is not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Loading screen if user is not yet loaded
  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Header />

      <div className="mt-10 max-w-3xl w-full mx-auto p-5 rounded-lg leading-relaxed bg-transparent">
        <div className="flex justify-center text-center">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600 text-2xl sm:text-3xl font-bold p-4">
            Unleash Your Imagination: Describe an Image You Want to Create!
          </h1>
        </div>

        <div className="w-full mt-4">
          <Input
            text="Describe the image you want to create..."
            clicked={entered}
            onchange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <div className="mt-4 flex justify-center items-center mx-auto">
          <DarkButton
            disabled={loading}
            text="Generate Image"
            onClick={async () => {
              console.log("clicked");
              setGenerated(true);
              setEntered(true);
              await handleGenerateImage();
            }}
          />
        </div>
      </div>

      {/* Generated Image Section */}
      {generated && (
        <div className="flex flex-col items-center mt-6 w-full text-slate-400 px-4">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-xl sm:text-2xl font-semibold text-center">
            Here is Your Generated Image
          </div>

          {/* Card and buttons */}
          <div className="flex flex-col lg:flex-row justify-center mt-6 gap-6 items-center">
            {/* Download Button */}
            <div
              onClick={async () => {
                if (!imageUrl) return;
                const res = await fetch(imageUrl);
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "generated-image.jpg";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-[50px] h-[50px] hover:bg-slate-600 flex items-center justify-center rounded-full cursor-pointer"
            >
              <Download />
            </div>

            {/* Image Card */}
            <div className="max-w-sm w-full">
              <Card state={true} image={imageUrl} />
            </div>

            {/* Share Button */}
            <div
              onClick={() => {
                if (imageUrl) {
                  navigator.clipboard.writeText(imageUrl);
                  toast.success("Copied To clipboard");
                } else {
                  toast.error("No image generated");
                }
              }}
              className="w-[45px] h-[45px] hover:bg-slate-600 flex items-center justify-center rounded-full cursor-pointer"
            >
              <Share />
            </div>
          </div>
        </div>
      )}

     {/* Bottom Buttons Section */}
<div className="flex flex-col md:flex-row justify-center lg:justify-between items-center mt-20 mb-20 mx-auto w-full max-w-3xl gap-4 px-4">
  <Link href="/checkout" className="w-full md:w-auto text-center">
    <DarkButton text="Donate Us" />
  </Link>
  <Link href="/images" className="w-full md:w-auto text-center">
    <DarkButton text="Generated History" />
  </Link>
</div>

    </div>
  );
}
