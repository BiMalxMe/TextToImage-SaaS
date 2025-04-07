import React, { useState, useEffect } from "react";
import { Loading } from "./Loading";

type CardProps = {
  image?: HTMLImageElement | string;
  state: boolean; //PROPS VALIE IS BOOLEAN
};

export const Card: React.FC<CardProps> = ({ image, state }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Reset image loaded state on new image or state reset
    setIsImageLoaded(false);
  }, [image, state]);

  const isValidImage = typeof image === "string" && image.trim() !== "";

  return (
    <div className="border rounded-lg shadow-lg shadow-blue-950 h-102 w-102 relative flex items-center justify-center overflow-hidden bg-gray-900">
      {state && isValidImage ? (
        !isImageLoaded ? (
          <div className="flex flex-col items-center justify-center h-full w-full p-6">
            <p className="text-green-400 mb-2 text-sm animate-pulse">
              Generating image...
            </p>
            <Loading h={34} w={34} />
          </div>
        ) : (
          <img
            src={image}
            alt="Generated"
            onLoad={() => setIsImageLoaded(true)}
            className="w-full h-auto rounded-md object-contain"
          />
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full p-6">
          {/* Toggles the text */}
          <p className="text-green-400 mb-2 text-sm animate-pulse">
            Generating image...
          </p>
          <Loading h={34} w={34} />
        </div>
      )}
    </div>
  );
};
