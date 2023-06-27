import React from 'react';
import PostFormCard from "./PostFormCard";
import PostCard from "./PostCard";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../../../../lib/database.types';
import { Pub } from '@/app/i18n/dictionaries/types';
import { Regiao } from '../../../../../lib/modelos';

interface FeedPrincipalProps {
  userData: {
    id: string | undefined;
    identificador: string | undefined;
    premium: boolean | undefined;
    role: number | undefined;
  };
  pub: Pub;
}
const supabase = createServerComponentClient<Database>({cookies})

const getData = async () => {
  const { data } = await supabase
  .from('publicacao')
  .select("*")
  .order('atualizadoem', { ascending: false })
  return data
}

const getRegiao = async () => {
  const { data, error } = await supabase
  .from('regiao')
  .select('*')
  if(error)
    console.log(error)
  else
    return data
}

export default async function FeedPrincipal({userData, pub}: FeedPrincipalProps) {
  const publicacoes = await getData();
  const regioes: Regiao[] | undefined = await getRegiao();

  return (
  <div>
        {
          userData.id ? (
            <>
          <PostFormCard idusuario={userData.id} regioes={regioes}/> 
            </>
          ) : ""
        }
    <div>          
      {
        publicacoes!.map((item:any) => {
          return (
            <PostCard key={item.id} publicacao={item}/>
          )
        })
      }
    </div>
      
        
  </div>
  );
}
