import Link from "next/link";
import BotaoAdd from "../../components/botao/botaoAdd";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../../../lib/database.types";
import { cookies } from "next/headers";

interface BotoesProps {
  sessionId: string;
  profileId: string;
 }

export default async function Botoes({profileId, sessionId }: BotoesProps) {
    const supabase = createServerComponentClient<Database>({ cookies })


    let { data, error } = await supabase
      .rpc('criar_ou_retornar_sala', {
        id_destinatario: profileId,
        id_usuario: sessionId
      })
  
    let sala = `/chat/${data}`

    return (
        <div className="mt-3">
            {/*             <BotaoAdd associado={isAssociado} tipo={session_data!.tipo!} idSession={session_data!.id!} idProfile={corretor.id} dict={dict} />
 */}            <Link href={sala}>
                <button className="w-fit ml-3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 ">
                    Chat
                </button>
            </Link>
        </div>
    );
}