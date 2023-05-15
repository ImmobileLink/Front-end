"use client";
import { FC, useState } from "react";

interface alertProps {
  type: string;
  title: string;
  text: string;
}

const Alert: FC<alertProps> = ({ type, title, text }: alertProps) => {
  const [fadeOut, setFadeOut] = useState("");

  function handleFadeOut() {
    setTimeout(function () {
      setFadeOut("hidden");
    }, 1000);
  }

  return (
    <>
      <div
        onClick={handleFadeOut}
        className={
          type == "success"
            ? `cursor-pointer opacity-80 bg-green-200 border-green-600 text-green-600 border-l-4 p-4 m-6 absolute top-0 ${fadeOut}`
            : type == "danger"
            ? `cursor-pointer opacity-80 bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-4 m-6 absolute top-0 ${fadeOut}`
            : type == "danger"
            ? `cursor-pointer opacity-80 bg-red-200 border-red-600 text-red-600 border-l-4 p-4 m-6 absolute top-0 ${fadeOut}`
            : `cursor-pointer opacity-80 bg-secundaria-100 border-secundaria-200 text-white border-l-4 p-4 m-6 absolute top-0 ${fadeOut}`
        }
        role="alert"
      >
        <p className="font-bold">{title}</p>
        <p>{text}</p>
      </div>
    </>
  );
};

export default Alert;
