import { ReactNode } from "react";

interface PageRootProps {
    children: ReactNode
}

export default async function PageCalendar({ children }: PageRootProps) {
    return (
        <>
            <div className="bg-white rounded-md mt-3 p-3 ring-2 ring-gray-300 dark:ring-gray-700 drop-shadow-md">
                {children}
            </div>
        </>
    );
}