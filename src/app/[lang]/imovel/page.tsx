import ImovelCard from "../(components)/(imovel)/ImovelCard";

import { getDictionary } from "../dictionaries";
import { ImovelDB, ImovelRegistro, ImovelSemCorporacao } from "../../../../lib/modelos";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../lib/database.types";
import NavBar from "../(components)/(navbar)/NavBar";
import NovoImovelCard from "../(components)/(imovel)/NovoImovelCard";

interface pageProps {
  params: {
    lang: string;
  };
}

const supabase = createServerComponentClient<Database>({ cookies });

async function getUserSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) console.log(error);
  else return session;
}

async function getUserData() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    let { data, error } = await supabase.rpc("get_imoveis", {
      id_usuario: session?.user.id,
    });
    return data;
  }
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt
  const imoveis = await getUserData();
  const session = await getUserSession();

  const textos = dict.imovel;

  return (
    <>
      <NavBar />
      <div className="w-auto h-fit min-h-screen  bg-branco dark:bg-dark-200 overflow-x-hidden box-border text-black">
        <div className="flex relative max-w-6xl mx-auto px-4 my-4">
          <div className="ring-2 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md overflow-hidden h-screen w-screen p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-4xl text-black dark:text-white">{textos.mainlabels.title}</h2>
              <NovoImovelCard textos={textos.newproperty} userSession={session} />
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              {imoveis!.map((imovel: ImovelSemCorporacao) => {
                return (
                  <ImovelCard
                    key={imovel.id}
                    textos={textos}
                    imovel={imovel}
                    userSession={session}
                  />
                )
              })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
