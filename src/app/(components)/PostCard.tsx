"use client"
import React, { FC, useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import Avatar from "./Avatar";
import { useSupabase } from '../SupabaseProvider'
import Image from "next/image";
import ClickOutHandler from 'react-clickout-handler'


interface PostCardProps {
    created: string,
    username: string
}

export default function PostCard() {
    const [userId, setUserId] = useState('')
    const { supabase } = useSupabase()
    const [isLoading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handlePfp = async () => {
        const session = await supabase.auth.getUser()
        setUserId(session.data.user?.id!) 
        setLoading(false);
      }
    
      useEffect(() => {
            handlePfp();         
      },[])
      
    function openDropdown(e) {
        e.stopPropagation();
        setDropdownOpen(true);
    }
    function handleClickOutsideDropdown(e) {
        e.stopPropagation();
        setDropdownOpen(false);
    }

    let post: PostCardProps = { created: "22-02-2023", username: "usuario"}
    return (
        <FeedCard noPadding={false}>
            <div className="flex gap-3">
                <div id="postheader" className="flex gap-3">
                    <div> 
                    {
                    isLoading 
                    ? <div></div>
                    : <Avatar userId={userId}/> 
                }         
                    </div>
                </div>
                <div className="grow">
                        <p>{post.username} fez uma publicação</p>
                        <p className="text-xs">{post.created}</p>
                </div>

                <div className="relative">
                    <button className="text-gray-400" onClick={openDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="bg-red w-5 h-5 absolute top-0"></div>
                    )}
                    <ClickOutHandler onClickOut={handleClickOutsideDropdown}>
                        <div className="relative">
                        {dropdownOpen && (
                            <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
                            <span className="flex -mx-4 hover:shadow-md gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white px-4 rounded-md transition-all hover:scale-110 shadow-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                                    </svg>      
                                    Save post                          
                            </span>
                            <a href="" className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                                </svg>
                                Turn notifications</a>
                            <a href="" className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Hide post</a>
                            <a href="" className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                Delete</a>
                            <a href="" className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                                Report
                            </a>
                            </div>
                        )}
                        </div>
                    </ClickOutHandler>
                </div>
            </div>

            <div id="content" className="my-2">
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
            <div className="flex mt-6 gap-3">
                <div>
                    <Avatar/>
                </div>
                <div className="flex grow rounded-md">
                    <textarea className="w-full bg-gray-100 grow p-3 h-12 rounded-md text-slate-900" placeholder={'Leave a comment'}></textarea>
                </div>
            </div>
        </FeedCard>
    )
}

