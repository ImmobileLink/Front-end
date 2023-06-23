import React from 'react';
import PostFormCard from "./PostFormCard";
import PostCard from "./PostCard";
import { supabase } from '../../../../../lib/supabaseClient';
import { Pub } from '@/app/i18n/dictionaries/types';

interface FeedPrincipalProps {
  userData: {
    id: string | undefined;
    identificador: string | undefined;
    premium: boolean | undefined;
    role: number | undefined;
  };
  pub: Pub;
}

const getData = async () => {
  const { data } = await supabase.from('publicacao').select("*").order('atualizadoem', { ascending: false })
  return data
}

export default async function FeedPrincipal({userData, pub}: FeedPrincipalProps) {
  const publicacoes = await getData();
  return (
  <div>
        {
          userData.id ? (
            <>
              <PostFormCard idusuario={userData.id}/>
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
