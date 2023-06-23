import React from 'react';
import PostFormCard from "./PostFormCard";
import PostCard from "./PostCard";
import { supabase } from '../../../../../lib/supabaseClient';
import { Regiao } from '../../../../../lib/modelos';

interface FeedPrincipalProps {
  idusuario: any
}

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

export default async function FeedPrincipal({idusuario}: FeedPrincipalProps) {
  const publicacoes = await getData();
  const regioes: Regiao[] | undefined = await getRegiao();

  return (
  <div>
    <PostFormCard idusuario={idusuario} regioes={regioes}/> 
    <div>          
      {
        publicacoes!.map((pub:any) => {
          return (
            <PostCard publicacao={pub}/>
          )
        })
      }
    </div>  
        
  </div>
  );
}
