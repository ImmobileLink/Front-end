import FeedPrincipal from "../(components)/(feed)/FeedPrincipal";
import { getDictionary } from "../dictionaries";
import NavProfile from "../(components)/(feed)/NavProfile";
import NavSettings from "../(components)/(feed)/NavSettings";
import NavCalendar from "../(components)/(feed)/NavCalendar";
import NavAmizade from "../(components)/(feed)/NavAmizade";
import NavFindBrokers from "../(components)/(feed)/NavFindBrokers";
import NavAssociados from "../(components)/(feed)/NavAssociados";
import NavEmpresaAssociada from "../(components)/(feed)/NavEmpresaAssociada";
import { getUserData } from "./utils";

interface pageProps {
  params: {
    lang: string;
  };
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const userData = await getUserData();

  //requisição
  return (
    <div className="w-auto h-fit min-h-screen bg-branco dark:bg-dark-200 flex justify-center gap-5 pt-4">
      <div className="hidden md:flex md:w-3/12 lg:flex flex-col lg:w-2/12 gap-4">
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
      </div>
      <div className="w-11/12 md:w-8/12 lg:w-6/12">
        <>
          <FeedPrincipal
            userData={userData}
            textos={dict.feed}
          />
        </>
      </div>
      <div className="hidden lg:flex flex-col lg:w-2/12 gap-4">
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
      </div>
    </div>
  );
}
