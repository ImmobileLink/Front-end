import Image from "next/image";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { getDictionary } from "../../dictionaries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../../lib/database.types";
import { userData } from "../../../../../lib/modelos";
import NavBarHamburguerMenu from "./NavBarHamburguerMenu";
import NavBarProfileMenu from "./NavBarProfileMenu";
import { cache } from "react";

interface NavBarProps {
  params: {
    lang: string;
  };
}


const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

async function getUserData(user: userData) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  user.id = session?.user.id;

  return user;
}

export default async function NavBar({ params: { lang } }: NavBarProps) {
  let user: userData = {
    id: undefined
  }
  
  const userData = await getUserData(user);
  const dict = await getDictionary(lang); // pt

  return (
    <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 ">
      <div className="max-w-2xl md:max-w-3xl lg:max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Link
            href="/feed"
            className="flex items-center"
          >
            <Image
              className="w-10 h-10"
              src="assets/favicon/favicon-32x32.png"
              alt="logo"
              width={10}
              height={10}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ImmobileLink
            </span>
          </Link>
          <div className="ml-5 relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BsSearch className="text-gray-300" />
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="melhoria futura..."
            />
          </div>
        </div>
        <NavBarHamburguerMenu textos={dict.navbarbuttons} userId={userData.id} />
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/feed" className="py-2 pl-3 pr-4 md:p-0 disabled:cursor-default">
                <Image
                  className="mx-auto h-6 w-auto"
                  src="assets/icons/home.svg"
                  alt="Ícone"
                  width={1}
                  height={1}
                />
              </Link>
            </li>
            {
              userData.id && (
                <>
                  <li>
                    <Link href="/notificacoes" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <Image
                        className="mx-auto h-6 w-auto"
                        src="assets/icons/notificacao.svg"
                        alt="Ícone"
                        width={1}
                        height={1}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href="/chat" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <Image
                        className="mx-auto h-6 w-auto"
                        src="assets/icons/chat.svg"
                        alt="Ícone"
                        width={1}
                        height={1}
                      />
                    </Link>
                  </li>
                </>
              )
            }
            <NavBarProfileMenu textos={dict.navbarbuttons} userId={userData.id} />
          </ul>
        </div>
      </div>
    </nav>
  );
}