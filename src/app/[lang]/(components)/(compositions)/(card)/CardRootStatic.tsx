import { ReactNode } from "react";

interface CardRootStaticProps { 
  children: ReactNode
}

export default async function CardRootStatic({ children }: CardRootStaticProps) {
  // esse tem um min-h de 1/3, pra cards que precisam de um valor minimo
  return (
    <div className="w-full h-fit min-h-2/3 py-4 ring-1 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md">
      { children }
    </div>
  );
}