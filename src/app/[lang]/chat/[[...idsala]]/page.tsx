import { getDictionary } from "../../dictionaries";
import ChatSpace from "../components/ChatSpace";
import ChatHub from "../components/ChatHub";
import ChatSpaceClient from "../components/ChatSpaceClient";
import { ChatProvider } from "./chatContext";
import { serverSupabase } from "lib/utils/serverSupabase";
import { getUserData } from "../../../../../lib/utils/userData";

interface pageProps {
  params: {
    lang: string,
    idsala: string
  };
}

export default async function Page({ params: { lang, idsala } }: pageProps) {
  const supabase = await serverSupabase()
  const dict = await getDictionary(lang); // pt

  let salaid = ''
  if (Array.isArray(idsala)) {
    salaid = idsala[0]
  }
  else {
    salaid = idsala
  }

  const userData = await getUserData(supabase);
  return (
    <ChatProvider>
      <div className="flex fixed top-0 bottom-0 right-0 left-0 pt-[72px] justify-center lg:items-center lg:w-auto gap-5">
        <ChatHub dict={dict} idsala={salaid} userType={userData.type} userId={userData.id} userLinks={userData.links} userAssocs={userData.assoc} />
        <ChatSpaceClient dict={dict.chat} idsala={salaid} userId={userData.id}>
          <ChatSpace dict={dict.chat} idsala={salaid} userId={userData.id} />
        </ChatSpaceClient>
      </div>
    </ChatProvider>
  );
} 