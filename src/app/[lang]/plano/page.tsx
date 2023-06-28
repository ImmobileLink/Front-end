import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../lib/database.types";
import { getDictionary } from "../dictionaries";
import PlanoCard from "../(components)/(plano)/PlanoCard";
import PlanoTable from "../(components)/(plano)/PlanoTable";

interface pageProps {
  params: {
    lang: string;
  };
}

const supabase = createServerComponentClient<Database>({ cookies });

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let { data: session_data } = await supabase
    .from("simple_user_data")
    .select("premium, tipo")
    .eq("id", session?.user.id)
    .single();

  const tipoPerfil = session_data?.tipo;
  const subPerfil = session_data?.premium;

  return (
    <>
      <div className="w-auto h-auto bg-branco dark:bg-dark-200">
        <>
          <p className="w-full pt-6 md:pt-8 lg:pt-10 text-black dark:text-white text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
            {dict.planos.subscription}
          </p>
          <p className="w-full mt-2 mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center self-center">
            Voluptate incididunt sunt amet veniam incididunt exercitation
            incididunt in aute quis.
          </p>
          <div className="flex flex-col md:flex-row self-center justify-center gap-10">
            <PlanoCard
              role={tipoPerfil || "corretor"}
              premium={false}
              card={dict.auth.signup.signup5}
              sub={dict.planos}
            />
            <PlanoCard
              role={tipoPerfil || "corretor"}
              premium={true}
              card={dict.auth.signup.signup5}
              sub={dict.planos}
            />
          </div>
        </>

        <>
          <p className="pt-6 md:pt-8 lg:pt-10 text-black dark:text-white text-3xl md:text-4xl lg:text-5xl font-extrabold text-center">
            {dict.planos.allsubscriptions}
          </p>

          <div className="w-full flex justify-center px-10 mt-10 ">
            <PlanoTable
              role={tipoPerfil || "corretor"}
              sub={dict.planos}
              />
          </div>
        </>
      </div>
    </>
  );
}
