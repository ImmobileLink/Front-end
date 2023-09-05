"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Navbarbuttons } from "@/app/i18n/dictionaries/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";

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
    <li className="relative">
      <button onClick={toggleProfileMenu} className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" >
        <Image
          className="mx-auto h-6 w-auto"
          src="assets/icons/perfil.svg"
          alt="Ícone"
          width={1}
          height={1}
        />
      </button>
      {isProfileMenuOpen && (
        <div className="absolute top-8 right-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600" >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
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
                    loading ? <Spinner/> : textos.logoutbutton
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
      )}
    </li>
  );
}
