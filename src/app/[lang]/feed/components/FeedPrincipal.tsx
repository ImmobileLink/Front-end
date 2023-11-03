import PostFormCard from "./PostFormCard";
import { userData } from '../../../../../lib/modelos';
import { Feed } from '@/app/i18n/dictionaries/types';
import { Card } from "../../(components)/(compositions)/(card)";
import PostList from "./PostList";

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
              <PostFormCard idusuario={userData.id} avatarusuario={userData.avatar!}  textos={textos}/>
            </Card.Content>
          </Card.Root>
        )
      }
      <PostList idusuario={userData.id} textos={textos}/>
    </>
  );
}
