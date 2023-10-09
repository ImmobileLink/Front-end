import { ReactNode } from "react";

interface PageLeftProps { 
  children: ReactNode
}

export default async function PageLeft({ children }: PageLeftProps) {
  return (
    <div className="hidden md:flex md:w-3/12 lg:flex flex-col lg:w-2/12 lg:max-w-xs min-w-[230px]">
      { children }
    </div>
  );
}