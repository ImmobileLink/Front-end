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
import ChatIcon from "./ChatIcon";
import { MdPersonSearch } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5"
import { AiFillHome } from "react-icons/ai";
import { HiBell, HiHome } from "react-icons/hi2";

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
    <>
      <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 ">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-6xl flex flex-wrap items-center justify-between mx-auto p-2 sm:p-4">
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
              <span className="block self-center text-md md:text-2xl font-semibold whitespace-nowrap dark:text-white">
                ImmobileLink
              </span>
            </Link>
          </div>
          {/* <div className="block w-auto">
            <ul className="flex flex-row font-medium p-0 border-gray-100 rounded-lg  space-x-8 mt-0 border-0 bg-white dark:bg-gray-900 dark:border-gray-700">
              <li className="hidden md:block">
                <Link href="/feed" className="p-0 disabled:cursor-default">
                  <Image
                    className="mx-auto h-6 w-auto"
                    src="assets/icons/home.svg"
                    alt="Ícone"
                    width={1}
                    height={1}
                  />
                </Link>
              </li>
              <li className="hidden md:block">
                <Link href="/pesquisa" className="p-0 disabled:cursor-default">
                  <MdPersonSearch className="text-gray-400 h-7 w-auto" />
                </Link>
              </li>
              {
                userData.id && (
                  <>
                    <li>
                      <Link href="/notificacoes" className="block text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:bg-transparent">
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
                      <ChatIcon userId={userData.id} />
                    </li>
                    <li>
                      <NavBarHamburguerMenu textos={dict.navbarbuttons} userId={userData.id} />
                    </li>
                  </>
                )
              }
              <NavBarProfileMenu textos={dict.navbarbuttons} userId={userData.id} />
            </ul>
          </div> */}
          <div className="block w-auto">
            <ul className="flex font-medium p-0 gap-x-1 sm:gap-x-3 text-end border-gray-100 rounded-lg flex-row mspace-x-8 mt-0 border-0">
                            <li className="hidden md:block">
                <Link href="/feed" className="p-0 w-auto text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 dark:text-white dark:hover:bg-transparent">
                  <HiHome size={32}/>
                </Link>
              </li>
              <li className="hidden md:block">
                <Link href="/pesquisa" className="p-0 w-auto text-center text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 dark:text-white dark:hover:bg-transparent">
                  <MdPersonSearch size={32} />
                </Link>
              </li>
            {
                userData.id && (
                  <>
                    <li>
                      <Link href="/notificacoes" className="p-0 w-auto text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 dark:text-white dark:hover:bg-transparent">
                        <HiBell size={32}/>
                      </Link>
                    </li>
                    <li>
                      <ChatIcon userId={userData.id} />
                    </li>
                    <li className="block md:hidden">
                      <NavBarHamburguerMenu textos={dict.navbarbuttons} userId={userData.id} />
                    </li>
                  </>
                )
              }
              <NavBarProfileMenu textos={dict.navbarbuttons} userId={userData.id} />
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}