import { userData } from "../../../../lib/modelos";
import { getDictionary } from "../dictionaries";
import Calendario from "./components/Calendario";
import { redirect } from "next/navigation";
import { serverSupabase } from "lib/utils/serverSupabase";
import { getUserData } from "../../../../lib/utils/userData";
import { getVisitasAceitasCorporacao, getVisitasAceitasCorretor } from "./agendaUtils";

interface pageProps {
  params: {
    lang: string;
  };
}

export default async function page({ params: { lang } }: pageProps) {
  const supabase = await serverSupabase();
  const userData = await getUserData(supabase);
  const dict = await getDictionary(lang); // pt


  if (!userData.id) {
    redirect('/auth');
  }

  if (userData.type == "corretor") {
    const data = await getVisitasAceitasCorretor(supabase, userData.id);
    
    return (
      <div className="h-[calc(100vh-72px)] p-4">
        <Calendario type={userData.type!} visitas={data} locale={lang} dict={dict.agenda} />
      </div>
    );
  } else {
    const data = await getVisitasAceitasCorporacao(supabase, userData.id);
    
    return (
      <div className="h-[calc(100vh-72px)] p-4">
        <Calendario type={userData.type!} visitas={data} locale={lang} dict={dict.agenda} />
      </div>
    );
  }
  
}
