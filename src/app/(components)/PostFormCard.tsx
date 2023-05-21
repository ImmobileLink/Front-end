"use client"
import React, { FC, Suspense, useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import Avatar from "./Avatar";
import { useSupabase } from '../Supabase-provider'


interface PostFormCardProps { }

export default function PostFormCard({}:PostFormCardProps) {
    const [userId, setUserId] = useState('')
    const { supabase } = useSupabase()
  
    const handlePfp = async () => {
      const session = await supabase.auth.getUser()
      setUserId(session.data.user?.id!) 
    }
  
    useEffect(() => {
          handlePfp()
    },[])

    return (
        <FeedCard noPadding={false}>
            <div className="flex grow">
                <Avatar userId={userId}/>          
                <div className="flex grow">
                    <textarea className="bg-gray-100 grow p-3 rounded-md text-slate-900" placeholder={'Whats on your mind?'}></textarea>
                </div>  
            </div>
            <div className="justify-end flex items-center">
                <button className="mt-2 p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Publicar</button>
            </div>
            
        </FeedCard>
    )
};

