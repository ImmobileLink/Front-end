"use client";
import Image from "next/image";
import { Suspense, useState } from "react";

interface AvatarProps {
    userId: any;
    size?: String | number;
}

export default function Avatar({ userId, size }: AvatarProps) {
  let styleImage = "";

    if(size == "big"){
        styleImage = "w-32 h-32 rounded-full ring-1 ring-gray-500"
    }else{
        styleImage = "h-14 w-14 rounded-full ring-1 ring-gray-500"
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
