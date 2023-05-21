"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

interface ImmobileLogoProps {}

export default function ImmobileLogo({}: ImmobileLogoProps) {
  const { systemTheme } = useTheme();

  return (
    <>
      {systemTheme != "dark" ? (
        <Image
          className="mx-auto h-14 w-auto"
          src="assets/icons/logo.png"
          width={1}
          height={1}
          alt="ImmobileLink"
        />
      ) : (
        <Image
          className="mx-auto h-14 w-auto"
          src="assets/icons/logo-wh.png"
          width={1}
          height={1}
          alt="ImmobileLink"
        />
      )}
    </>
  );
}
