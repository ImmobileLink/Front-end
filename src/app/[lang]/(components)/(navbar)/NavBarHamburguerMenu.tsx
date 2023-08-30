"use client";
import { Navbarbuttons } from "@/app/i18n/dictionaries/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import { Database } from "../../../../../lib/database.types";
import Link from "next/link";
import { Spinner } from "flowbite-react";

interface NavBarHamburguerMenuProps {
  textos: Navbarbuttons;
  userId?: string;
}

const supabase = createClientComponentClient<Database>()

export default function NavBarHamburguerMenu({ textos, userId }: NavBarHamburguerMenuProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [isHamburguerMenuOpen, setIsHamburguerMenuOpen] = useState<boolean>(false);

  const toggleHamburguerMenu = () => {
    setIsHamburguerMenuOpen(!isHamburguerMenuOpen);
  }

  const handleLogOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/auth")
  };

  return (
    <>
      <div className="relative md:hidden">
        <button onClick={toggleHamburguerMenu} className="flex items-center justify-between w-full p-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
          <BsList className="text-3xl" />
        </button>
        {
          isHamburguerMenuOpen && (
            <div className="absolute top-12 right-0 z-10 w-44 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600" >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                <li>
                  <Link
                    href="/feed"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {textos.feed}
                  </Link>
                </li>
                {
                  userId && (
                    <>
                      <li>
                        <Link
                          href={`perfil/${userId}`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {textos.myprofile}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/visitas"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {textos.schedule}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pesquisa"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {textos.search}
                        </Link>
                      </li>
                    </>
                  )
                }
                <li>
                  <Link
                    href="/plano"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {textos.subscription}
                  </Link>
                </li>
              </ul>
              <div className="py-1">
                {
                  userId ? (
                    <a
                      href="#"
                      onClick={handleLogOut}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      {
                        loading ? <Spinner /> : textos.logoutbutton
                      }
                    </a>
                  ) : (
                    <Link
                      href="/auth"
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      {textos.loginbutton}
                    </Link>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}
