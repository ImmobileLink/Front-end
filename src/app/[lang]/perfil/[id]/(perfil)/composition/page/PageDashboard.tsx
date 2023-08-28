import { ReactNode } from "react";

interface PageRootProps {
    children: ReactNode
}

export default async function PageDashboard({ children }: PageRootProps) {
    return (
        <>
            <div className="bg-white dark:bg-gray-600 rounded-md p-3 relative overflow-hidden w-full ring-2 ring-gray-300 dark:ring-gray-700 drop-shadow-md">
              {children}
            </div>
        </>
    );
}