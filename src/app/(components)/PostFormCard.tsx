import React, { FC } from "react";
import FeedCard from "./FeedCard";
import Image from "next/image";
import Avatar from "./Avatar";

interface IProps {
};

const PostFormCard:FC<IProps> = (props) => {
    return (
        <FeedCard noPadding={false}>
            <div className="flex grow">
                <Avatar/>
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

export default PostFormCard;