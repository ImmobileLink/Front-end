import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"
import { Database } from "../database.types"


export async function serverSupabase(supabaseUrl?: string, supabaseKey?: string) {
  const createServerSupabaseClient = cache((supabaseUrl?: string, supabaseKey?: string) => {
    const cookieStore = cookies()
    if (supabaseUrl && supabaseKey) {
      return createServerComponentClient<Database>({ cookies: () => cookieStore }, { supabaseUrl, supabaseKey })
    }
    else {
      return createServerComponentClient<Database>({ cookies: () => cookieStore })
    }
  })
  if (supabaseUrl && supabaseKey) {
    const result = createServerSupabaseClient(supabaseUrl, supabaseKey)
    return result
  }
  else {
    const result = createServerSupabaseClient()
    return result
  }
}


