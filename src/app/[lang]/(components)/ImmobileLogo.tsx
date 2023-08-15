"use client";

import Image from "next/image";

interface ImmobileLogoProps {}

export default function ImmobileLogo({}: ImmobileLogoProps) {
  return (
    <div className="flex justify-center">
      <Image
        className="w-20 h-20"
        src="assets/favicon/favicon-250-250.png"
        alt="logo"
        width={10}
        height={10}
      />
      <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
        ImmobileLink
      </span>
    </div>
  );
}
