import { ReactNode } from "react";

interface PageRootProps {
    children: ReactNode
}

export default async function PageMain({ children }: PageRootProps) {
    return (
        <>
            <div className="md:w-11/12 lg:w-2/3 bg-white  dark:bg-gray-600  relative rounded-md overflow-hidden ring-2 ring-gray-300 dark:ring-gray-700 drop-shadow-md">
                {children}
            </div>
        </>
    );
}