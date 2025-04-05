// components/Loading.tsx
import React from "react";

type LoadingProps = {
  h?: number;
  w?: number;
};

export const Loading: React.FC<LoadingProps> = ({ h, w  }) => {
  return (
    <svg
      className="animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      height={h}
      width={w}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
};
