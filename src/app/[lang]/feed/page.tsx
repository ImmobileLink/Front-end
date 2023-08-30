import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import CardLink from "../(components)/(cards)/CardLink";
import CardNotLogged from "../(components)/(cards)/CardNotLogged";
import CardProfile from "../(components)/(cards)/CardProfile";
import CardUserList from "../(components)/(cards)/CardUserList";
import { Card } from "../(components)/(compositions)/(card)";
import { Page } from "../(components)/(compositions)/(page)";
import type { Database } from "../../../../lib/database.types";
import { userData } from "../../../../lib/modelos";
import { getDictionary } from "../dictionaries";
import FeedPrincipal from "./components/FeedPrincipal";

interface pageProps {
  params: {
    lang: string;
  };
}

let user: userData = {
  links: [],
  assoc: []
};

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

async function getUserData() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    user.id = session.user.id;
    // NOME & PREMIUM & TYPE
    let { data, error } = await supabase.rpc("consultar_tipo_usuario", {
      id_usuario: session.user.id,
    });

    if (!error) {
      user.nome = data![0].nome;
      user.isPremium = data![0].ispremium;
      user.type = data![0].role;
      // LINKS
      {
        let { data, error } = await supabase.rpc("get_connected_users", {
          id_usuario: session.user.id,
        });

        if (!error) {
          user.links = data;
        }
      }
      // ASSOC
      {
        if (user.type == "corporacao") {
          let { data, error } = await supabase.rpc(
            "obter_corretores_por_corporacao",
            {
              id_corporacao: user.id!,
            }
          );
      
          if(!error) {
            user.assoc = data;
          }
        } else if (user.type == "corretor") {
          let { data, error } = await supabase.rpc(
            "obter_corporacoes_por_corretor",
            {
              id_corretor: user.id!,
            }
          );
      
          if(!error) {
            user.assoc = data;
          }
        }
      }
    }
  }

  return user;
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const userData = await getUserData();

  return (
    <div className="flex justify-center gap-5 mt-4">
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
              <Card.Title title={dict.feed.cards.findbrokers} />
              <Card.Content>
                <CardUserList cards={dict.feed.cards} />
              </Card.Content>
            </Card.Root>
          </>
        )}
      </Page.Right>
    </div>
  );
}
