import { ReactNode } from "react";

interface PageRootProps {
    children: ReactNode
}

export default async function PageDashboard({ children }: PageRootProps) {
    return (
        <>
            <div className="rounded-md p-3 relative overflow-hidden w-full ring-2 ring-gray-300 dark:ring-gray-700 drop-shadow-md bg-gradient-to-b from-slate-500 via-slate-300 to-slate-100">
                {children}
            </div>
        </>
    );
}