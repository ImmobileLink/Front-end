import Image from "next/image";
import Avatar from "@/app/[lang]/(components)/Avatar"
import BotaoAdd from "./botao/botaoAdd"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import { cookies } from "next/headers";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { userData } from "../../../../../../../lib/modelos";


interface CabecalhoProps {
  isAssociado: string | null;
  session_data: userData;
  corretor: any;
  dict: any;
}


export default async function Cabecalho({ isAssociado, session_data, corretor, dict }: CabecalhoProps) {
  const supabase = createServerComponentClient<Database>({ cookies })

  let { data, error } = await supabase
    .rpc('criar_ou_retornar_sala', {
      id_destinatario: corretor.id,
      id_usuario: session_data!.id!
    })

  let sala = `/chat/${data}`

  let { data: avaliacao } = await supabase
    .from('avaliacao')
    .select('nota')
    .eq('id', corretor.id)
    .single()

  let { data: associacoes } = await supabase
    .from('associacoes')
    .select('idcorporacao')
    .eq('idcorretor', corretor.id)
    .eq('pendente', 'false')

  return (
    <>
      <div className="h-36 overflow-hidden rounded-md">
        <Image
          className="w-screen my-auto"
          src="users/cover/cover.jpg"
          alt="capa"
          width={1}
          height={1}
        />
      </div>


      <div className="p-8">
        <div className="flex justify-between items-baseline">
          <div className="w-32 h-32 rounded-full bg-white flex justify-center items-center">
            <Avatar userId={corretor.id} size={"big"} />
          </div>
          <AiFillEdit />
        </div>
        <h2 className="font-bold text-2xl">{corretor?.nome}</h2>
        <p className="text-gray-500">{`${corretor?.cidade} - ${corretor?.estado}`}</p>

      </div>
      {/* 
      <div className="absolute top-24 left-10 flex flex-col items-center text-white">
        <div className="w-36 h-36 rounded-full bg-branco flex justify-center items-center">
          <Avatar userId={corretor.id} size={"big"} />
        </div>
      </div>

      <div className=" flex items-center justify-end">

        <div className=" flex w-3/4 mr-3 flex-col p-4">
          <div className="  flex w-full justify-between">
            <div>
              <h2 className="font-bold text-2xl">{corretor?.nome}</h2>
              <p className="text-gray-500">{`${corretor?.cidade} - ${corretor?.estado}`}</p>
              <div className="flex pt-3">
                {avaliacao != undefined ? (
                  <p className="ml-1 font-bold">{avaliacao.nota}</p>
                ) : (<p>N/A</p>)}

              </div>
            </div>
            <div className="w-40">
              {associacoes!.length > 0 ? (
                <p className="underline underline-offset-1">{dict.profile.hasAssociation}</p>
              ) : (
                <p className="underline underline-offset-1">{dict.profile.noAssociation}</p>
              )}
            </div>
          </div>
          {session_data?.tipo == "corporacao" && (
            
            <div className="mt-3">
              <BotaoAdd associado={isAssociado} tipo={session_data.tipo} idSession={session_data.id} idProfile={corretor.id} dict={dict} />
              <Link href={sala}>
                <button className="w-fit ml-3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 ">
                  Chat
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

 */}



      {corretor?.sobre != null && (
        <div className="px-5">
          <div className="bg-white mt-3 rounded-md p-3">
            <p className="">{corretor?.sobre}</p>
          </div>
        </div>
      )}
    </>
  );
}
