import React from "react";
import { Loading } from "./Loading";

type CardProps = {
  image?: HTMLImageElement | string;
  state: boolean; // true = image loaded, false = loading
};

export const Card: React.FC<CardProps> = ({ image, state }) => {
  return (
    <div className="border rounded-lg shadow-lg shadow-blue-950 h-102 w-102 relative flex items-center justify-center overflow-hidden bg-gray-900">
      {state && typeof image === "string" ? (
        <img
          src={image}
          alt="Generated"
          className="w-full h-auto rounded-md object-contain"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full p-6">
          <p className="text-green-400 mb-2 text-sm animate-pulse">
            {/* pulse le toggle garxa */}
            Generating image...
          </p>
          <Loading h={34} w={34} />
        </div>
      )}
    </div>
  );
};
