import { createClient } from '@supabase/supabase-js'

const supabaseUrl:string = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey:string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('URL ou Chave do Supabase ausentes')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)