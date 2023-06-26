
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Cabecalho from "../../(components)/(perfil)/Cabecalho";
import Dashboard from "../../(components)/(perfil)/Dashboard";
import Infos from "../../(components)/(perfil)/Infos";
import type { Database } from '../../../../../lib/database.types';
import NavBar from '../../(components)/NavBar';
import { isatty } from 'tty';
import Calendario from '../../(components)/Calendario';

interface pageProps {
  params: {
    id: string;
  };
}
const supabase = createServerComponentClient<Database>({cookies})

export default async function Page({ params: { id } }: pageProps) {
  //verificar se a empresa da sessao atual possui esse corretor ja conectado
  //passar essa informação como prop para mudar botão/mostrar calendario.
  const { data: { session } } = await supabase.auth.getSession();

     //true, false ou pendente
     let { data: isAssociado } = await supabase
     .rpc('verifica_associacao', {
       valor1: id,
       valor2: session!.user.id
     })

     let { data: user_data } = await supabase
     .from('simple_user_data')
     .select('*')
     .eq('id', session?.user.id)
     .single()

     console.log("user: " + user_data)


  return (
    <>
      <NavBar />
      <div className="bg-dark-200 overflow-x-hidden box-border text-black">
        <div className="h-screen w-screen">
          <div className="flex relative max-w-6xl mx-auto px-4 mt-4">

            <div className="w-2/3 bg-branco mr-3 rounded-md overflow-hidden h-screen">
              <Cabecalho isAssociado={isAssociado} idProfile={id} user_data={user_data} />
              <Infos />
            </div>



            <div className="w-1/3 ">
              <div className="bg-branco rounded-md p-3 relative overflow-hidden">
                <Dashboard userId={id} session={session} premium={user_data!.premium}/>
              </div>

              {isAssociado == "true" ? (
                  <div className="bg-branco rounded-md mt-3 p-3">
                  <Calendario /> 
                </div>
              ) : (<></>)}
              
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
