
import Image from "next/image";
import Avatar from "../../(components)/Avatar"
import Dashboard from "../../(components)/(perfil)/Dashboard"
import Calendario from "../../(components)/Calendario"
import Cabecalho from "../../(components)/(perfil)/Cabecalho"
import Infos from "../../(components)/(perfil)/Infos"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import type { Database } from '../../../../../lib/database.types'
import { supabase } from '../../../../../lib/supabaseClient';

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: pageProps) {

  const supabaseServerClient = createServerComponentClient<Database>({cookies})
  const {data : { session }} = await supabaseServerClient.auth.getSession();
  const OwnId = session!.user.id;

  //verificar se a empresa da sessao atual possui esse corretor ja conectado
  //passar essa informação como prop para mudar botão/mostrar calendario.

  let { data , error } = await supabase
  .rpc('consultar_tipo_usuario', {
    id_usuario: OwnId
  })

/*   if (error) console.error(error)
  else console.log("data", data) */



  return (
    <>
      <div className="bg-dark-200 overflow-x-hidden box-border text-black">
        <div className="h-screen w-screen">
          <div className="flex relative max-w-6xl mx-auto px-4 mt-4">

            <div className="w-2/3 bg-branco mr-3 rounded-md overflow-hidden h-screen">
              <Cabecalho userId={id} />
              <Infos />
            </div>



            <div className="w-1/3 ">
              <div className="bg-branco rounded-md p-3">
                <Dashboard userId={"111"} premium={false} />
              </div>

              <div className="bg-branco rounded-md mt-3 p-3">
                {/* <Calendario />  */}
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
