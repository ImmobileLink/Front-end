import { Session } from "inspector";
import Line from "./Dashboard/Line"
import PolarArea from "./Dashboard/PolarArea"
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/../lib/database.types";


interface DashboardProps {
  userId: string;
  session: any;
  premium: boolean | null | undefined;
  dict: any;
}



export default async function Dashboard({ userId, session, premium, dict }: DashboardProps) {
  const supabase = createServerComponentClient<Database>({cookies})


  return (
    <>

      {session == null || premium == false ? (
        <div>
          <div className="absolute flex justify-center items-center inset-0 backdrop-blur-md">
            <div className="w-3/4 flex justify-center flex-col items-center">
              {session == null ? (
                <>
                  <p className="text-center font-semibold mb-3">Faça login ou Cadastro para ter acesso ao dashboard</p>
                  <Link href="/auth" className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</Link>
                  <Link href="/auth" className="w-32 mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cadastro</Link>

                </>
              ) : (
                <>
                  <p className="text-center font-semibold mb-3">Quer ter acesso a informações mais detalhadas? <br /> Assine nosso plano para empresas</p>
                  <Link href="/plano" className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Assine Já</Link>
                </>

              )}

            </div>
          </div>
        </div >

      ) : (<></>)
      }

      <div>
        <div >
          <PolarArea dict={dict} />
        </div>

        <div className="mt-5">
          <Line dict={dict}/>
        </div>

      </div>
    </>


  );
}
