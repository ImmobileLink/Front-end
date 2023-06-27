import ImovelCard from "../(components)/(imovel)/ImovelCard";

import { getDictionary } from "../dictionaries";
import { Imovel } from "../../../../lib/modelos";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../lib/database.types";
import NavBar from "../(components)/NavBar";

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
      <div className="bg-dark-200 overflow-x-hidden box-border text-black">
      <div className="h-screen w-screen">
        <div className="flex relative max-w-6xl mx-auto px-4 my-4">
          <div className=" bg-branco rounded-md overflow-hidden h-screen w-screen p-3">
            <h2 className="text-4xl mb-2">{textos.mainlabels.title}</h2>

            <div>
              {imoveis?.map((dados) => (
                <ImovelCard
                  //key={dados.id}
                  textos={textos}
                  lang={lang}
                  imovel={dados}
                  userSession={session}
                />
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
