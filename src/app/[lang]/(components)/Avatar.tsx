"use client";
import Image from "next/image";
import { Suspense, useState } from "react";

interface AvatarProps {
  userId: any;
  size?: String;
}

export default function Avatar({ userId, size }: AvatarProps) {
  let styleImage = "";

  if (size == "big") {
    styleImage = "w-32 h-32 m-1 rounded-full ring-1 ring-gray-200";
  } else {
    styleImage = "h-14 w-14 m-1 rounded-full ring-1 ring-gray-200";
  }

  const [src, setSrc] = useState(`users/profile_picture/${userId}`);

  return (
    <div>
      <Suspense fallback={<span>loading...</span>}>
        <Image
          className={styleImage}
          src={src}
          width={1}
          height={1}
          onError={() => setSrc("/users/nopfp")}
          alt="Profile Picture"
        />
      </Suspense>
    </div>
  );
}
