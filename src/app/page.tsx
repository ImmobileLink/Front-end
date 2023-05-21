import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

import type { Database } from "../../lib/database.types";
import LogOut from "./(components)/LogOut";
import Link from "next/link";

interface pageProps {}

export default async function Page({}: pageProps) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { data } = await supabase.from("usuario").select("*");

  return (
    <>
      <h1>HOME</h1>
      <Link href="/auth">Auth</Link>
      <LogOut />
      {JSON.stringify(data, null, 2)}
    </>
  );
}
