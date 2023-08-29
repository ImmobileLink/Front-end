import Image from "next/image";
import Avatar from "@/app/[lang]/(components)/Avatar"
import BotaoAdd from "./botao/botaoAdd"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import { cookies } from "next/headers";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { profileSimpleData } from "../../../../../../../lib/modelos";


interface CabecalhoProps {
  isAssociado: string | null;
  session_data: profileSimpleData | null;
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
      <div className="h-44 overflow-hidden rounded-md relative">
        <Image
          className="w-screen my-auto"
          src="users/cover/cover.jpg"
          alt="capa"
          width={1}
          height={1}
        />
        <button className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Alterar Imagem
        </button>
      </div>


      <div className="p-8 -mt-28 relative">
        <div className="flex justify-between w-full items-baseline mb-3">
          <div className="w-34 h-34 rounded-full bg-white flex justify-center items-center">
            <Avatar userId={corretor.id} size={"big"} />
          </div>
          <button>
            <AiFillEdit size={20} />
          </button>
        </div>
        <h2 className="font-bold text-2xl">{corretor?.nome}</h2>
        <p className="text-gray-500">{`${corretor?.cidade} - ${corretor?.estado}`}</p>

        <div className="mt-3">
          <BotaoAdd associado={isAssociado} tipo={session_data!.tipo!} idSession={session_data!.id!} idProfile={corretor.id} dict={dict} />
          <Link href={sala}>
            <button className="w-fit ml-3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 ">
              Chat
            </button>
          </Link>
        </div>
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
