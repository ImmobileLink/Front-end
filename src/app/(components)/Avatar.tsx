"use client"
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { useSupabase } from "../Supabase-provider";

interface AvatarProps {}

export default function Avatar({}: AvatarProps ) {
    const {supabase} = useSupabase();
    const [session, setSession] = useState();
    useEffect(() => {
        supabase.auth.getUser()
        .then(result => {
            setSession(result)
        })

    },[])

    return (
        <div>
            <Image
                className="mr-2 h-14 w-auto"
                src={`users/profile_picture/1.png`}
                width={1}
                height={1}
                alt="Profile Picture"
            />
        </div>              
    )
}