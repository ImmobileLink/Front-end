import ImmobileLogo from "@/app/[lang]/(components)/ImmobileLogo";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import Image from "next/image";
import { Database } from "../../../../lib/database.types";
import { getDictionary } from "../dictionaries";
import AuthForm from "./AuthForm";

interface PageProps {
  params: {
    lang: string;
  };
}

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})


async function getData() {
  const supabase = createServerSupabaseClient();
  let { data: tipoImovel } = await supabase
    .from("tipoImovel")
    .select("id,descricao");

  return { tipoImovel };
}

export default async function page({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang); // pt
  const data = await getData();

  return (
    <>
      <div className="flex w-screen h-screen bg-branco dark:bg-dark-200 overflow-x-hidden">
        <div className="flex w-7/12 h-fit flex-1 flex-col m-auto justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <ImmobileLogo />
          </div>

          <div className="mt-10 h-max">
            <AuthForm
              auth={dict.auth}
              data={data}
              lang={lang}
            />
          </div>
        </div>
        <div className="hidden lg:block rounded-s-giga overflow-hidden">
          <Image
            src="assets/login/bg1.jpg"
            alt="Casa"
            width={1}
            height={1}
            className="w-full h-screen"
          />
        </div>
      </div>
    </>
  );
}
