"use client";

import { ReactNode } from "react";

interface NotificationRootProps { 
    children: ReactNode;
    visualizada: boolean;
}

export default function NotificationRoot({ children, visualizada }: NotificationRootProps) {
    let style = ''
    if (!visualizada) {
        style = "flex px-2 py-3 bg-blue-100 dark:bg-blue-50 hover:bg-gray-100 dark:hover:bg-gray-600"
    }
    else {
        style = 'flex px-2 py-3 hover:bg-gray-100 dark:hover:bg-gray-600'
    }
    return (
        <div className={style}>
            {children}
        </div>
    );
}
