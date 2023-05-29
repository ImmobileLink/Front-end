import React from 'react';
import PostFormCard from "./PostFormCard";
import PostCard from "./PostCard";
import { supabase } from '../../../../../lib/supabaseClient';

interface FeedPrincipalProps {
  idusuario: any
}

const getData = async () => {
  const { data } = await supabase.from('publicacao').select("*").order('atualizadoem', { ascending: false })
  return data
}

export default async function FeedPrincipal({idusuario}: FeedPrincipalProps) {
  const publicacoes = await getData();
  return (
  <div>
        <PostFormCard idusuario={idusuario}/>
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
