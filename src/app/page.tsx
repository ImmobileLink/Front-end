import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import type { Database } from "../../lib/database.types";

// do not cache this page
export const revalidate = 0;

export default async function ServerComponent() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { data } = await supabase.from("usuario").select("*");

  return <>{JSON.stringify(data, null, 2)}</>;
}
