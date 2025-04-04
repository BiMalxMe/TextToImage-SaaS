import React from "react";
import { Loading } from "./Loading";

type CardProps = {
  image?: HTMLImageElement | string; // image vaye matrr
  state: boolean;
};

export const Card: React.FC<CardProps> = ({ image, state }) => {
  return (
    <div className=" border rounded-lg shadow-md h-102 w-102" >
      <img src={typeof image === "string" ? image : ""}  className="w-full h-auto rounded-md" />
      {!state && <p className="text-green-500 mt-2">
        <span className="loading loading-dots loading-lg"><Loading /></span>
        </p>}
      <div>Bimal</div>
    </div>
  );
};
