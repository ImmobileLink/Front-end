import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"; 

import type { Database } from "../../../../lib/database.types";
import { userData } from "../../../../lib/modelos";

import { getDictionary } from "../dictionaries";

import { Card } from "../(components)/(compositions)/(card)";
import { Page } from "../(components)/(compositions)/(page)";

import { getAssoc, getLinks, getTipoUsuario } from "../../../../lib/utils/userData";

import CardLink from "../(components)/(cards)/CardLink";
import CardNotLogged from "../(components)/(cards)/CardNotLogged";
import CardProfile from "../(components)/(cards)/CardProfile";
import CardUserList from "../(components)/(cards)/CardUserList";
import FeedPrincipal from "../(components)/(feed)/FeedPrincipal";

interface pageProps {
  params: {
    lang: string;
  };
}

let user: userData = {
  links: [],
  assoc: []
};

const supabase = createServerComponentClient<Database>({ cookies });

async function getUserData() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  if (session?.user.id) {
    user = await getTipoUsuario(user, session.user.id);
    
    [user, user] = await Promise.all([
      getLinks(user),
      getAssoc(user)
    ]);
  }
  
  return user;
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt
  
  const userData = await getUserData();
  
  return (
    <Page.Root>
      <Page.Left>
        {
          userData.id ? (
            <>
              <Card.RootStatic>
                <Card.Content>
                  <CardProfile
                    userData={userData}
                    cards={dict.feed.cards}
                  />
                </Card.Content>
              </Card.RootStatic>
            </>
          ) : (
            <Card.Root>
              <Card.Content>
                <CardNotLogged cards={dict.feed.cards} />
              </Card.Content>
            </Card.Root>
          )
        }
      </Page.Left>
      <Page.Main>
            <FeedPrincipal
              userData={userData}
              textos={dict.feed}
            />
      </Page.Main>
      <Page.Right>
        {userData.id && (
          <>
            <Card.Root>
              <Card.Title title={dict.feed.cards.connections} />
              <Card.Content>
                <CardLink
                  userId={userData.id}
                  userLinks={userData.links}
                  cards={dict.feed.cards}
                />
              </Card.Content>
            </Card.Root>
            <Card.Root>
              {
                userData.type == "corretor" ? (
                  <Card.Title title={dict.feed.cards.myrelatedcompany} />
                ) : (
                  <Card.Title title={dict.feed.cards.relatedbrokers} />
                )
              }
              <Card.Content>
                <CardLink
                  userId={userData.id}
                  userLinks={userData.assoc}
                  cards={dict.feed.cards}
                />
              </Card.Content>
            </Card.Root>
            <Card.Root>
              <Card.Title title={dict.feed.cards.findbrokers}/>
              <Card.Content>
                <CardUserList cards={dict.feed.cards} />
              </Card.Content>
            </Card.Root>
          </>
        )}
      </Page.Right>
    </Page.Root>
  );
}
