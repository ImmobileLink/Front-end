import Image from "next/image";
import Avatar from "../Avatar"
import BotaoAdd from "./botao/botaoAdd";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { cookies } from "next/headers";
import Link from "next/link";
import { cache } from "react";

interface CabecalhoProps {
  isAssociado: string | null;
  session_data: User_data;
  corretor: any;
  dict: any;
}

type User_data = {
  id: string | null;
  nome: string | null;
  premium: boolean | null;
  tipo: string | null;
} | null

const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export default async function Cabecalho({ isAssociado, session_data, corretor, dict }: CabecalhoProps) {
  const supabase = createServerSupabaseClient()

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
      <div className="h-36 overflow-hidden">
        <Image
          className="w-screen my-auto"
          src="users/cover/cover.jpg"
          alt="capa"
          width={1}
          height={1}
        />
      </div>

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
                <svg xmlns="http://www.w3.org/2000/svg" fill="#daa520" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#daa520" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
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
          {session_data?.tipo == "corporacao" ? (
            /* só deve aparecer o botao associar se for uma empresa */
            <div className="mt-3">
              <BotaoAdd associado={isAssociado} tipo={session_data.tipo} idSession={session_data.id} idProfile={corretor.id} dict={dict} />
              <Link href={sala}>
                <button className="w-fit ml-3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 ">
                  Chat
                </button>
              </Link>

            </div>
          ) : (
            <></>
          )

          }



        </div>

      </div>
      {corretor?.sobre != null ? (
        <div className="px-5">
          <div className="bg-white mt-3 rounded-md p-3">
            <p className="">{corretor?.sobre}</p>
          </div>
        </div>
      ) : (<></>)}



    </>
  );
}
