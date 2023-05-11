import { useSession } from "@supabase/auth-helpers-react";
import Login from "./login";
import Feed from "./feed";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const session = useSession();

  console.log(session);

  return <>{!session ? <Login /> : <Feed />}</>;
}
