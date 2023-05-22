"use client"
import React, { FC, useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import Avatar from "./Avatar";
import { useSupabase } from '../SupabaseProvider'
import Image from "next/image";


interface PostCardProps {
    created: string,
    username: string
}

export default function PostCard() {
    const [userId, setUserId] = useState('')
    const { supabase } = useSupabase()
    const [isLoading, setLoading] = useState(true);

    const handlePfp = async () => {
        const session = await supabase.auth.getUser()
        setUserId(session.data.user?.id!) 
        setLoading(false);
      }
    
      useEffect(() => {
            handlePfp();         
      },[])
      
    let post: PostCardProps = { created: "22-02-2023", username: "usuario"}
    return (
        <FeedCard noPadding={false}>
                <div id="postheader" className="flex gap-3">
                    <div> 
                    {
                    isLoading 
                    ? <div></div>
                    : <Avatar userId={userId}/> 
                }         
                    </div>
                    <div className="column">
                        <p>{post.username} fez uma publicação</p>
                        <p className="text-xs">{post.created}</p>
                    </div>
                </div>
                <div id="content" className="ml-2">
                    <p className="text-sm mb-2">
                        Texto de teste apsdoihugfnaspodguinapohfiunadpofhiunfa
                    </p>
                    <Image
                    className="mr-3 mb-3 h-auto w-auto rounded-md overflow-hidden"
                    src={`publicacoes/imagens/1.png`}
                    width={1}
                    height={1}
                    alt="Post"
                    />
                </div>
                <div id="socialbuttons" className="flex gap-6 ml-2">
                    <button className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        10
                    </button>
                    <button className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        10
                    </button>
                    <button className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                        10
                    </button>               
                </div>
        </FeedCard>
    )
}

