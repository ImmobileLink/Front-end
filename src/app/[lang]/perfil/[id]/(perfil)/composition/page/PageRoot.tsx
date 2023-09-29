import { ReactNode } from "react";

interface PageRootProps {
    children: ReactNode
}

export default async function PageRoot({ children }: PageRootProps) {
    return (
        <>
            <div className="w-full h-max min-h-[calc(100vh-72px)] bg-branco dark:bg-dark-200 flex justify-center">
                <div className='flex justify-center w-11/12 max-w-6xl gap-4 pt-5 flex-wrap lg:flex-nowrap'>
                    {children}
                </div>
            </div>
        </>
    );
}