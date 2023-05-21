import React, { FC } from "react";

interface IProps {
    children: any,
    noPadding: boolean
};

//Componente de Card para o Feed
const FeedCard:FC<IProps> = ({children, noPadding}) => {
    let styles ='bg-gray-600 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 shadow-md shadow rounded-md my-5'
    if (!noPadding) {
        styles += ' p-4';
    }
    return (
        <div className={styles}>
            {children}
        </div>
    )
};

export default FeedCard;