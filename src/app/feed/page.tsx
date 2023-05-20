import React, { FC } from "react";
import FeedCard from "../(components)/FeedCard"
import NavCard from "../(components)/NavCard";
import PostFormCard from "../(components)/PostFormCard";
import Avatar from "../(components)/Avatar";
import PostCard from "../(components)/PostCard";


interface IProps {};

const Feed:FC<IProps> = (props) => {
    return (
    <div className="w-screen h-screen bg-branco dark:bg-escuro2">
        <div id="Feed" className="flex mt-4 max-w-4xl mx-auto gap-6">
            <div className="w-1/3">
                <NavCard/>
            </div>
            <div id="posts" className="grow">
                <PostFormCard/>
                <PostCard/>
            </div>
        </div>
    </div>
    )
};

export default Feed;