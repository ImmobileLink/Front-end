import Image from "next/image";
import Avatar from "@/app/[lang]/(components)/Avatar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import { cookies } from "next/headers";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { Corretor, profileSimpleData } from "../../../../../../../../lib/modelos";


interface InfosPadraoProps {
  isAssociado: string | null;
  session_data: profileSimpleData | null;
  corretor: Corretor ;
  dict: any;
  children: ReactNode;

}


export default async function InfosPadrao({
  isAssociado,
  session_data,
  corretor,
  dict,
  children
}: InfosPadraoProps) {
  
const supabase = createServerComponentClient<Database>({ cookies })


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

        {children}
      </div>
     
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
