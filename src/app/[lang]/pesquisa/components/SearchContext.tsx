"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { CorretorBuscado, CorporacaoBuscada } from '../../../../../lib/modelos';

interface SearchContextType {
  resultado: CorretorBuscado | CorporacaoBuscada | null | undefined,
  setResultado: Dispatch<CorretorBuscado | CorporacaoBuscada | null>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const SearchContext = createContext({} as SearchContextType);

export function SearchProvider({ children }: { children: ReactNode }) {
    //States relacionados aos resultados
  // const [resultado, setResultado] = useState<CorretorBuscado[] | CorporacaoBuscada[] | null>([]);
  const [resultado, setResultado] = useState<CorretorBuscado | CorporacaoBuscada | null | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SearchContext.Provider value={{ resultado, setResultado, loading, setLoading }}>
      {children}
    </SearchContext.Provider>
  );
}