import { ReactNode } from "react";

interface PageRootProps {
    children: ReactNode
}

export default async function PageMain({ children }: PageRootProps) {
    return (
        <>
            <div className="md:w-11/12 lg:w-2/3  relative rounded-md overflow-hidden  mb-6 ">
                {children}
            </div>
        </>
    );
}