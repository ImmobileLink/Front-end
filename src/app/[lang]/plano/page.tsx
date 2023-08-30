import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../lib/database.types";
import { getDictionary } from "../dictionaries";
import PlanoTable from "./components/PlanoTable";
import { Page } from "../(components)/(compositions)/(page)";
import { getTipoUsuario } from "../../../../lib/utils/userData";
import { userData } from "../../../../lib/modelos";
import { cache } from "react";

interface pageProps {
  params: {
    lang: string;
  };
}

let user: userData = {
  links: [],
  assoc: []
};

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

async function getUserData() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    user = await getTipoUsuario(user, session.user.id);
  }
  return user;
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const userData = await getUserData();

  console.log(userData);

  return (
    <>
      <p className="w-full pt-6 md:pt-8 lg:pt-10 text-black dark:text-white text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
        {dict.planos.subscription}
      </p>
      <p className="w-full mt-2 mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center self-center">
        Voluptate incididunt sunt amet veniam incididunt exercitation
        incididunt in aute quis.
      </p>
      <div className="w-auto flex justify-center px-10 mt-10 ">
        <PlanoTable
          id={userData.id}
          role={userData.type || "corretor"}
          sub={dict.planos}
        />
      </div>
    </>
  );
}
