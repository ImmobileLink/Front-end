import { ReactNode } from "react";

interface PageRootProps {
    children: ReactNode
}

export default async function PageRight({ children }: PageRootProps) {
    return (
        <>
            <div className="w-11/12 lg:w-1/3 hidden lg:block">
                {children}
            </div>
        </>
    );
}