import React from 'react';
import PostFormCard from "./PostFormCard";
import { Regiao } from '../../../../../lib/modelos';
import { Feed } from '@/app/i18n/dictionaries/types';
import Posts from './Posts';
import { getRegiao } from '../../feed/utils';

interface FeedPrincipalProps {
  userData: {
    id: string | undefined;
    identificador: string | undefined;
    premium: boolean | undefined;
    role: number | undefined;
  };
  textos: Feed;
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
