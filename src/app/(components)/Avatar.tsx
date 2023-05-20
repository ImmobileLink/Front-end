import Image from "next/image";
import React, { FC } from "react";

interface IProps {
};

const Avatar:FC<IProps> = (props) => {
    let userid="1";
    return (
        <Image
                className="mr-2 h-14 w-auto"
                src={`users/profile_picture/${userid}.png`}
                width={1}
                height={1}
                alt="Profile Picture"
            />
    )
};

export default Avatar;