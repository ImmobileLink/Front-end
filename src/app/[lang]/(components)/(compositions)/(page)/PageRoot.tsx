import { ReactNode } from "react";

interface PageRootProps {
  children: ReactNode
}

export default async function PageRoot( {children}: PageRootProps ) {
  return (
    <>
       <div className="w-auto h-fit min-h-screen bg-branco dark:bg-dark-200 flex justify-center gap-5 pt-4">
        {children}
       </div>
    </>
  );
}