import React from 'react';
import PostFormCard from "./PostFormCard";
import PostCard from "./PostCard";
import { supabase } from '../../../../../lib/supabaseClient';

interface FeedPrincipalProps {
  idusuario: any
}

export default async function FeedPrincipal({idusuario}: FeedPrincipalProps) {
    const { data } = await supabase.from('publicacao').select("*").order('atualizadoem', { ascending: false })


  return (
  <div className="h-screen">
        <PostFormCard idusuario={idusuario}/>
        <div>          
        {
          data!.map((pub:any) => {
            return (
              <PostCard publicacao={pub}/>
            )
          })
        }
        </div>
        
  </div>
  );
}
