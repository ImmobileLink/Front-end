"use client";
"use client";
import Image from "next/image";
import { Suspense, useState } from "react";
import AvatarLoading from "./AvatarLoading";

interface AvatarProps {
  userId: any;
  size?: String | number;
}

export default function Avatar({ userId, size }: AvatarProps) {
  let styleImage = "";

  if (size == "big") {
    styleImage = "w-32 h-32 m-1 rounded-full ring-1 ring-gray-200";
  } else {
    if (typeof size === "number") {
      styleImage = `h-${size} w-${size} m-1 rounded-full ring-1 ring-gray-200`;
    } else {
      styleImage = "h-14 w-14 m-1 rounded-full ring-1 ring-gray-200";
    }
  }

  const [src, setSrc] = useState(`users/profile_picture/${userId}`);



  return (
    <div>
      <Suspense
        fallback={<AvatarLoading/>}
      />
      <Image
        className={styleImage}
        loading="lazy"
        src={src}
        width={1}
        height={1}
        onError={() => setSrc("/users/nopfp")}
        alt="Profile Picture"
      />
    </div>
  );
}
