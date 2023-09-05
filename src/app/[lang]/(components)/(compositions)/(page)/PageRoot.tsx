import { ReactNode } from "react";

interface PageRootProps {
  children: ReactNode
}

export default async function PageRoot( {children}: PageRootProps ) {
  return (
    <>
       <div className="w-auto min-w-full h-fit min-h-screen bg-branco dark:bg-dark-200">
        {children}
       </div>
    </>
  );
}