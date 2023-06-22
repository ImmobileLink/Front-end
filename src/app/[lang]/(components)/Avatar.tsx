"use client"
import Image from "next/image";
import { useState } from "react"

interface AvatarProps {
    userId: any;
    size?: String;
}

export default function Avatar({userId, size}: AvatarProps) {
    let styleImage = ""

    if(size == "big"){
        styleImage = "w-32 h-32 rounded-full"
    }else{
        styleImage = "mr-3 mb-3 h-14 w-auto"
    }

    const [src, setSrc] = useState(`users/profile_picture/${userId}`);  

        return (
            <div>  
                <Image
                    className={styleImage}
                    src={src}
                    width={1}
                    height={1}
                    onError={() => setSrc('/users/nopfp')}
                    alt="Profile Picture"
                />                    
            </div>              
        )
    
}