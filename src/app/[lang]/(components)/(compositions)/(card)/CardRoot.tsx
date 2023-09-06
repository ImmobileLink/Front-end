import { ReactNode } from "react";
import { twMerge } from 'tailwind-merge'

interface CardRootProps { 
  children: ReactNode;
  className?: string;
}

export default function CardRoot({ children, ...rest }: CardRootProps) {
  // esse tem uma altura adaptavel, para cards que n�o precisam de um height mínimo
  return (
    <div className={twMerge("w-full h-fit py-4 ring-1 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md", rest.className)}>
      { children }
    </div>
  );
}
