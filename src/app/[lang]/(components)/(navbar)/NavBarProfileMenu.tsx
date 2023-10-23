"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Navbarbuttons } from "@/app/i18n/dictionaries/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi2";
import { CircleFlag } from 'react-circle-flags'
import { Dropdown } from "flowbite-react";
import CountryDropdown from "./CountryDropdown";

interface NavBarProfileMenuProps {
  textos: Navbarbuttons;
  userId?: string;
}

const supabase = createClientComponentClient<Database>()

export default function NavBarProfileMenu({ textos, userId }: NavBarProfileMenuProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/auth")
  };

  return (
    <li className="hidden md:block relative w-[70px] md:w-[80px] ml-2">
      <button onClick={toggleProfileMenu} className="hidden md:flex flex-col items-center justify-center text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 p-0 w-auto dark:text-white dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:bg-transparent" >
        <HiUserCircle size={30} />
        <p className="hidden md:block md:text-sm">{textos.account}</p>
      </button>
      {isProfileMenuOpen && (
        <div className="absolute top-8 right-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600" >
          <ul className="py-2 text-start text-sm text-gray-700 dark:text-gray-400">
            {
              userId && (
                <>
                  <li>
                    <Link
                      href={`/perfil/${userId}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {textos.myprofile}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/visita/${userId}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {textos.schedule}
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
            <li>
              <div
                className="flex flex-wrap flex-row items-center justify-between px-4 py-2 gap-x-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {textos.language}
                <CountryDropdown />
              </div>
            </li>
          </ul>
          <div className="py-1">
            {
              userId ? (
                <>
                  <Link
                    href="/configuracoes"
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    {textos.settings}
                  </Link>
                  <a
                    href="#"
                    onClick={handleLogOut}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    {
                      loading ? <Spinner /> : textos.logoutbutton
                    }
                  </a>
                </>

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
      )}
    </li>
  );
}
