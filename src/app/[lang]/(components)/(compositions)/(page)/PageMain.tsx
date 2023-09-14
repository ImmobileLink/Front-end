import { ReactNode } from "react";

interface PageMainProps {
  children: ReactNode
}

export default async function PageMain({ children }: PageMainProps ) {
  return (
    <div className="w-11/12 md:w-8/12 lg:w-5/12">
      {children}
    </div>
  );
}