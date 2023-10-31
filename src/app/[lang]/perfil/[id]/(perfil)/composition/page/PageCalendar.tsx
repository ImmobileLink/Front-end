import { ReactNode } from "react";

interface PageRootProps {
    children: ReactNode
}

export default async function PageCalendar({ children }: PageRootProps) {
    return (
        <>
            <div className="bg-slate-300 rounded-md mt-3 p-3 ring-2 ring-gray-300  drop-shadow-md dark:text-white">
                {children}
            </div>
        </>
    );
}