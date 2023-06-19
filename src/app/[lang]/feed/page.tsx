import NavCard from "@/app/[lang]/(components)/NavCard";
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import type { Database } from '../../../../lib/database.types'
import FeedPrincipal from "../(components)/(feed)/FeedPrincipal";
import { getDictionary } from "../dictionaries";


interface pageProps {
  params: {
    lang: string;
  };
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt
  const supabaseServerClient = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const {data : { session }} = await supabaseServerClient.auth.getSession();
  const userId = session?.user.id;
  //requisição
  return (
    <div className="w-screen h-fit bg-branco dark:bg-escuro2 flex justify-center grow">
      <div className="w-2/12 h-screen p-3 m-3">
        <NavCard navbarbuttons={dict.navbarbuttons}/>
      </div>
      <div className="w-6/12 p-3 m-3">
        <>
        <FeedPrincipal idusuario={userId}/>
        </>
        
      </div>
      <div className="w-2/12 h-screen p-3 m-3">
        <NavCard navbarbuttons={dict.navbarbuttons}/>
      </div>     
    </div>
  )
}
