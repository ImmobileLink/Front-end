import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import { getDictionary } from "../dictionaries";
import { Page } from "../(components)/(page)";
import { userData } from "../../../../lib/modelos";
import { getAssoc, getLinks, getTipoUsuario } from "../../../../lib/utils/userData";
import FeedPrincipal from "../(components)/(feed)/FeedPrincipal";
import NavAmizade from "../(components)/(feed)/NavAmizade";
import NavAssociados from "../(components)/(feed)/NavAssociados";
import NavCalendar from "../(components)/(feed)/NavCalendar";
import NavEmpresaAssociada from "../(components)/(feed)/NavEmpresaAssociada";
import NavFindBrokers from "../(components)/(feed)/NavFindBrokers";
import NavProfile from "../(components)/(feed)/NavProfile";
import NavSettings from "../(components)/(feed)/NavSettings";

interface pageProps {
  params: {
    lang: string;
  };
}

const supabase = createServerComponentClient<Database>({ cookies });

let user: userData = {
  links: [],
  assoc: []
};

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

  //requisição
  return (
    <Page.Root>
      <Page.Left>
        <NavProfile
          userData={userData}
          cards={dict.feed.cards}
        />
        {userData.id ? (
          <>
            <NavSettings
              userData={userData}
              cards={dict.feed.cards}
            />
            <NavCalendar userData={userData} />
          </>
        ) : (
          ""
        )}
      </Page.Left>
      <Page.Main>
        <FeedPrincipal
          userData={userData}
          textos={dict.feed}
        />
      </Page.Main>
      <Page.Right>
        {userData.id ? (
          <>
            <NavAmizade
              userData={userData}
              cards={dict.feed.cards}
            />
            {userData.role == 1 ? (
              <NavEmpresaAssociada
                userData={userData}
                cards={dict.feed.cards}
              />
            ) : (
              <p></p>
            )}
            {userData.role == 2 ? (
              <NavAssociados
                userData={userData}
                cards={dict.feed.cards}
              />
            ) : (
              <p></p>
            )}
            <NavFindBrokers cards={dict.feed.cards} />
          </>
        ) : (
          ""
        )}
      </Page.Right>
    </Page.Root>
  );
}
