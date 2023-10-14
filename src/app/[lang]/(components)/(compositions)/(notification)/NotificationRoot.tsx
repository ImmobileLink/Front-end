"use client";

import { ReactNode } from "react";

interface NotificationRootProps { 
    children: ReactNode
}

export default function NotificationRoot({ children }: NotificationRootProps) {
    return (
        <div className="flex px-2 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
            {children}
        </div>
    );
}
