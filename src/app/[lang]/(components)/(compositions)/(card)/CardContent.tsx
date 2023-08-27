import { ReactNode } from "react";

interface CardContentProps { 
  children: ReactNode
}

export default function CardContent({ children }: CardContentProps) {
  return (
    <div className="w-full h-full">
      { children }
    </div>
  );
}