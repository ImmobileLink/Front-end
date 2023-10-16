"use client";

import { useContext } from "react";
import { SearchContext } from "./SearchContext";
import UserCard from "./UserCard";
import { Pesquisa } from "@/app/i18n/dictionaries/types";
import { Spinner } from "flowbite-react";

interface ResultContainerProps {
  dict: Pesquisa;
  userId: string;
}

export default function ResultContainer({ dict, userId }: ResultContainerProps) {

  const { resultado, loading } = useContext(SearchContext)

  return (
    <div className="w-full h-fit justify-center align-middle items-center self-center text-center my-4">
      {
        !loading ? (
          resultado ? (
            resultado.length > 0 ? (
              <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                  resultado.map((item, index) => {
                    if(item.id != userId) {
                      return (
                        <UserCard key={index} textos={dict} usuario={item} />
                      )
                    }           
                  })
                }
              </div>
            ) : (<p className="text-lg">{dict.labels.nouserfound}</p>)
          ) : (<p className="text-lg">{dict.labels.selectafilter}</p>)
        ) : (
          <Spinner className="w-12 h-12" />
        )
      }
    </div>
  );
}
