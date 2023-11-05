"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { CorretorBuscado, CorporacaoBuscada, Erro } from '../../../../lib/modelos';

interface SearchContextType {
  resultado: CorretorBuscado | CorporacaoBuscada | null | undefined;
  setResultado: Dispatch<CorretorBuscado | CorporacaoBuscada | null>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  erros: Object[];
  assignErros: (erro: Erro) => void;
}

export const SearchContext = createContext({} as SearchContextType);

export function SearchProvider({ children }: { children: ReactNode }) {
  //States relacionados aos resultados
  // const [resultado, setResultado] = useState<CorretorBuscado[] | CorporacaoBuscada[] | null>([]);
  const [resultado, setResultado] = useState<CorretorBuscado | CorporacaoBuscada | null | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [erros, setErros] = useState<Erro[]>([]);

  const assignErros = (erro: Erro) => {
    setErros((prevErros) => [...prevErros, erro])
  }

  return (
    <SearchContext.Provider value={{ resultado, setResultado, loading, setLoading, erros, assignErros }}>
      {children}
    </SearchContext.Provider>
  );
}