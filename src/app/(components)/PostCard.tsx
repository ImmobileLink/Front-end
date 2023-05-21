import React, { FC } from "react";
import FeedCard from "./FeedCard";
import Avatar from "./Avatar";

interface IProps {};

type Post = {
    created: string,
    username: string
}

const PostCard:FC<IProps> = (props) => {
    let post: Post = { created: "22-02-2023", username: "usuario"}
    return (
        <FeedCard noPadding={false}>
                <div className="flex">
                    <div>          
                    </div>
                    <div className="column">
                        <p>{post.username} fez uma publicação</p>
                        <p className="text-xs">{post.created}</p>
                    </div>
                </div>
        </FeedCard>
    )
};

export default PostCard;