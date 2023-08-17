import { ReactNode } from "react";

interface PageRightProps {
  children: ReactNode
}

export default async function PageRight({ children }: PageRightProps) {
  return (
    <div className="hidden lg:flex flex-col lg:w-2/12 gap-4">
      {children}
    </div>
  );
}