"use client";

import { useSupabase } from "../supabase-provider";

export default function SupabaseAuth() {
  const { supabase } = useSupabase();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "gomes.rhenan@aluno.ifsp.edu.br",
      password: "r12345",
      options: {
        emailRedirectTo: "/"
      }
    });
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: "gomes.rhenan@aluno.ifsp.edu.br",
      password: "r12345",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}