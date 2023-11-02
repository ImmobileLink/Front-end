import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import NavBarHamburguerMenu from "./NavBarHamburguerMenu";
import NavBarProfileMenu from "./NavBarProfileMenu";
import ChatIcon from "./ChatIcon";
import { MdPersonSearch } from "react-icons/md";
import { HiHome } from "react-icons/hi2";
// import { getMessageNotifications } from "../../../../../lib/utils/userNotification";
import NotificationDropdown from "./NotificationDropdown";
import { serverSupabase } from "lib/utils/serverSupabase";
import { getUserData } from "lib/utils/userData";

interface NavBarProps {
  params: {
    lang: string;
  };
}

export default async function NavBar({ params: { lang } }: NavBarProps) {
  const supabase = await serverSupabase()
  
  const userData = await getUserData(supabase);
  const dict = await getDictionary(lang); // pt
 
  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 h-[72px] max-h-[72px]">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-6xl flex flex-wrap items-center justify-between mx-auto px-2 py-4 md:pt-3 md:pb-3 max-h-[72px]">
          <div className="flex items-center">
            <Link
              href="/"
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
          <div className="block w-auto">
            <ul className="flex font-medium p-0 gap-x-2 md:gap-x-3 justify-between text-end border-gray-100 rounded-lg flex-row mspace-x-8 mt-0 border-0">
              <li className="hidden md:block mr-2">
                <Link href="/feed" className="flex flex-col justify-center items-center p-0 w-auto text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 dark:text-white dark:hover:bg-transparent">
                  <HiHome size={30} />
                  <p className="hidden md:block md:text-sm">{dict.navbarbuttons.feed}</p>
                </Link>
              </li>
              <li className="hidden md:block">
                <Link href="/pesquisa" className="flex flex-col justify-center items-center p-0 w-auto text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 dark:text-white dark:hover:bg-transparent">
                  <MdPersonSearch size={30} />
                  <p className="hidden md:block md:text-sm">{dict.navbarbuttons.search}</p>
                </Link>
              </li>
              {
                userData.id && (
                  <>
                    <li>                
                      <NotificationDropdown textos={dict.navbarbuttons} userId={userData.id}/>
                    </li>
                    <li>
                      <ChatIcon userId={userData.id} textos={dict.navbarbuttons}/>
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