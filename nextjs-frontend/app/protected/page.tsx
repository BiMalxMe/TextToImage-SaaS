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

  const [generated, setGenerated] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [entered, setEntered] = useState(false);
  const router = useRouter();
  const [inputedText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const email =
    isLoaded && isSignedIn ? user?.emailAddresses?.[0]?.emailAddress : "";

  const handleGenerateImage = async () => {
    setLoading(true);
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

    if (inputedText.trim()) {
      const response = await ApiHandler({ text: inputedText });
      setLoading(false);
      setImageUrl(response.image_url);
      setGenerated(true);
      setEntered(false);
      createImage(inputedText, response.image_url, email);
    } else {
      toast.error("Please enter a description for the image.");
    }
  };

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
          <Input
            text="Describe the image you want to create..."
            clicked={entered}
            onchange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="mt-3 flex justify-center items-center mx-auto">
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
        <div className="flex flex-col items-center mt-4 w-full text-slate-400">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-xl font-semibold">
            Here is Your Generated Image
          </div>

          <div className="flex justify-center mt-4 gap-6">
            {/* Download Button */}
            <div className="flex flex-col justify-end">
              <div
              //logic behind downloading the image
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
              
                className="w-[50px] h-[50px] hover:bg-slate-600 flex items-center justify-center rounded-4xl"
              >
                <Download />
              </div>
            </div>

            <div>
              <Card state={true} image={imageUrl} />
            </div>

            <div className="flex flex-col justify-end">
              <div
                onClick={() => {
                  if(imageUrl){
                  navigator.clipboard.writeText(imageUrl);
                  toast.success("Copied To clipboard");
                  }else{
                    toast.error("No image generated")
                  }
                }}
                className="w-[45px] h-[45px] hover:bg-slate-600 flex items-center justify-center rounded-4xl hover"
              >
                <Share />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons on the same line */}
      <div className="flex justify-between mt-20 mb-20 mx-auto w-3/4 ">
        <Link href="/checkout">
          <DarkButton text="Donate Us" />
        </Link>
        <Link href="/images">
          <DarkButton text="Generated History" />
        </Link>
      </div>
    </div>
  );
}
