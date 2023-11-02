import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

export const clientSupabase = (supabaseUrl?: string, supabaseKey?: string) => {
  if(supabaseUrl && supabaseKey) {
    return createClientComponentClient<Database>({supabaseUrl, supabaseKey})
  }
  else {
    return createClientComponentClient<Database>()
  }
}