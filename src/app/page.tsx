import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import type { Database } from "../../lib/database.types";
import LogOut from "./logOut";

// do not cache this page
export const revalidate = 0;

export default async function ServerComponent() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { data } = await supabase.from("usuario").select("*");

  return (
    <>
      <LogOut />
      {JSON.stringify(data, null, 2)}
    </>
  );
}
