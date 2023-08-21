import { ReactNode } from "react";

interface PageMainProps {
  children: ReactNode
}

export default async function PageMain({ children }: PageMainProps ) {
  return (
    <div className="w-auto h-auto bg-branco dark:bg-dark-200">
      {children}
    </div>
  );
}