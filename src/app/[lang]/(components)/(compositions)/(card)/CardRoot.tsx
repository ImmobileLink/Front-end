import { ReactNode } from "react";

interface CardRootProps { 
  children: ReactNode
}

export default function CardRoot({ children }: CardRootProps) {
  // esse tem uma altura adaptavel, para cards que n�o precisam de um height mínimo
  return (
    <div className="w-full h-fit py-4 ring-1 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md">
      { children }
    </div>
  );
}