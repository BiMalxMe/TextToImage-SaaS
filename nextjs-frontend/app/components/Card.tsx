import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";
import Image from 'next/image';

type CardProps = {
  image?: string;
  state: boolean;
};

export const Card: React.FC<CardProps> = ({ image, state }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
console.log(image)
  useEffect(() => {
    setIsImageLoaded(false);
  }, [image]);

  const isValidImage = typeof image === "string" && image.trim() !== "";

  return (
    <div className="border rounded-lg shadow-lg shadow-blue-950 h-102 w-102 relative flex items-center justify-center overflow-hidden bg-gray-900">
      {state && isValidImage ? (
        <div className="relative w-full h-[500px]">
          {!isImageLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900">
              <p className="text-green-400 mb-2 text-sm animate-pulse">
                Generating image...
              </p>
              <Loading h={34} w={34} />
            </div>
          )}
          <Image
            key={image} // Ensure re-render when new image comes
            src={image}
            alt="Generated"
            fill
            onLoadingComplete={() => {
              console.log("✅ Image loaded");
              setIsImageLoaded(true);
            }}
            className="rounded-md object-contain transition-opacity duration-500"
            style={{ opacity: isImageLoaded ? 1 : 0 }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full p-6">
          <p className="text-green-400 mb-2 text-sm animate-pulse">
            Generating image...
          </p>
          <Loading h={34} w={34} />
        </div>
      )}
    </div>
  );
};
