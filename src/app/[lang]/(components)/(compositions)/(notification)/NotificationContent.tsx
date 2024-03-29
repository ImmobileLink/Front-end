"use client";

import Link from "next/link";
import { formataData } from "../../../../../../lib/utils/formataData";
import { useEffect, useState } from "react";

interface NotificationContentProps {
    author: string; 
    authorId: string;
    content: string;
    date?: string;
}

export default function NotificationContent({ author, authorId, content, date }: NotificationContentProps) {

    const [data, setData] = useState<string>()

    useEffect(() => {
        setData(formataData(date!))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-full block text-start pl-3">
            <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                <Link href={`/perfil/${authorId}`} className="font-semibold text-blue-400">{author}</Link> {content}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-500">{data}</div>
        </div>
    );
}
