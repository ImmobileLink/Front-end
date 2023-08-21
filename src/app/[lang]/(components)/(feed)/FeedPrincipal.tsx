import React from 'react';
import PostFormCard from "./PostFormCard";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../../../../lib/database.types';
import { Regiao, userData } from '../../../../../lib/modelos';
import { Feed } from '@/app/i18n/dictionaries/types';
import Posts from './Posts';

interface FeedPrincipalProps {
  userData: userData;
  textos: Feed;
}
const supabase = createServerComponentClient<Database>({ cookies })

const getRegiao = async () => {
  const { data, error } = await supabase
    .from('regiao')
    .select('*')
  if (error)
    console.log(error)
  else
    return data
}

export default async function FeedPrincipal({ textos, userData }: FeedPrincipalProps) {
  const regioes: Regiao[] | undefined = await getRegiao();

  return (
    <div className='space-y-3'>
      {
        userData.id ? (
          <>
            <PostFormCard textos={textos} idusuario={userData.id} regioes={regioes} />
          </>
        ) : ""
      }
      <Posts userid={userData.id} textos={textos} regioes={regioes}/>
    </div>
  );
}
