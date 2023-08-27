import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getDictionary } from "../dictionaries";
import { Database } from "../../../../lib/database.types";
import NavBar from "../(components)/NavBar";
import Imoveis from "../(components)/(imovel)/Imoveis";
import ImovelCard from "../(components)/(imovel)/ImovelCard";

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
  let userData: userDataType = {
    id: undefined,
    identificador: undefined,
    premium: undefined,
    role: undefined,
    conexoes: null,
  };

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    {
      let { data, error } = await supabase.rpc("consultar_tipo_usuario", {
        id_usuario: session?.user.id,
      });

      userData.id = session?.user.id;
      userData.identificador = data![0].identificador;
      userData.premium = data![0].premium;
      userData.role = data![0].role;
    }
    {
      let { data, error } = await supabase.rpc("get_connected_users", {
        id_usuario: session?.user.id,
      });

      userData.conexoes = data;
    }
  }
  return userData;
}

async function getProperties() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    let { data, error } = await supabase
      .from("imovel")
      .select("*")
      .eq("idcorporacao", session?.user.id);
    return data;
  }
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt
  const textos = dict.imovel;

  //const imoveis = await getProperties();
  const session = await getUserSession();

  const userData = await getUserData();

  return (
    <>
      <NavBar />
      <div className="w-auto h-fit min-h-screen  bg-branco dark:bg-dark-200 overflow-x-hidden box-border text-black">
        <div className="flex relative max-w-6xl mx-auto px-4 my-4">
          <Imoveis userid={userData.id} textos={textos} /*imoveis={imoveis}*/ userSession={session} />
        </div>
      </div>
    </>
  );
}
