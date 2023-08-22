import PostFormCard from "./PostFormCard";
import { userData } from '../../../../../lib/modelos';
import { Feed } from '@/app/i18n/dictionaries/types';
import Posts from './Posts';
import { Card } from "../(compositions)/(card)";

interface FeedPrincipalProps {
  userData: userData;
  textos: Feed;
}

export default async function FeedPrincipal({ textos, userData }: FeedPrincipalProps) {

  return (
    <>
      {
        userData.id && (
          <Card.Root>
            <Card.Content>
              <PostFormCard textos={textos} idusuario={userData.id} />
            </Card.Content>
          </Card.Root>
        )
      }
      {/* <Posts userid={userData.id} textos={textos} /> */}
    </>
  );
}
