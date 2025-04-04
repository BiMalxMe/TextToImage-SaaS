import React from "react";
import { Loading } from "./Loading";

type CardProps = {
  image?: HTMLImageElement | string; // image vaye matrr
  state: boolean;
};

export const Card: React.FC<CardProps> = ({ image, state }) => {
  return (
    <div className=" border rounded-lg shadow-lg shadow-blue-950 h-102 w-102" >
      <img src={typeof image === "string" ? image : ""}  className="w-full h-auto rounded-md" />
      {!state && <p className="text-green-500 mt-2">
        </p>}
        <div className="flex flex-col items-center justify-center h-full">
  <Loading h={15} w={15}/>
</div>

    </div>
  );
};
