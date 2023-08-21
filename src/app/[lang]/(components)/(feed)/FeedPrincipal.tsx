import PostFormCard from "./PostFormCard";
import { userData } from '../../../../../lib/modelos';
import { Feed } from '@/app/i18n/dictionaries/types';
import Posts from './Posts';

interface FeedPrincipalProps {
  userData: userData;
  textos: Feed;
}

export default async function FeedPrincipal({ textos, userData }: FeedPrincipalProps) {

  return (
    <>
      {
        userData.id && (<PostFormCard textos={textos} idusuario={userData.id} />)
      }
      {/* <Posts userid={userData.id} textos={textos} /> */}
    </>
  );
}
