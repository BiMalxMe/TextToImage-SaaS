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
import Image from "next/image";
import ApiHandler from "../components/ApiHandler";

export default async function ProtectedPage() {
  const [Generated, setGenerated] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [entered, setentered] = useState(false);
  const router = useRouter();
  const [inputedtext, setInputText] = useState("");
  const [imageUrl,setimageUrl] = useState("")
  const handleGenerateImage = async () => {
    if (inputedtext) {
      const { image_url } = await ApiHandler({ text: inputedtext });
      setentered(false);  // Set image URL to state
      setGenerated(false); // Trigger image generation display
      setimageUrl(imageUrl)   // Set entered state to true
    }
  };
  if(entered){
    const { image_url }: { image_url: string } = await ApiHandler({ text: inputedtext });
  }

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
            text="Generate Image"
            onClick={() => {
              setGenerated(true);
              setentered(true);
              handleGenerateImage()
            }}
          />
        </div>
      </div>

      {/* Generated Image Section */}
      {Generated && (
        <div className="flex flex-col items-center mt-4 w-full text-slate-400">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-xl font-semibold">
            Here is Your Generated Image
          </div>
          {imageUrl?
          <div id="photo">
            <Image
              src={imageUrl}
              alt="Cloudinary Image"
              width={100}
              height={100}
            />
          </div>:""}
          <div className="flex justify-center mt-4 gap-6">
            {/* Download Button */}
            <div className="flex flex-col justify-end">
              <div className="w-[50px] h-[50px] hover:bg-slate-600 flex items-center justify-center rounded-4xl">
                <Download />
              </div>
            </div>

            <div>
              <Card state={true} />
            </div>

            <div className="flex flex-col justify-end">
              <div className="w-[45px] h-[45px] hover:bg-slate-600 flex items-center justify-center rounded-4xl hover">
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

        <DarkButton text="Generated History" />
      </div>
    </div>
  );
}
