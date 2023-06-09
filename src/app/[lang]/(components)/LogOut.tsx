"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../lib/database.types";

interface LogOutProps {
  texto: string;
}

export default function LogOut({texto}: LogOutProps) {
  const supabase = createClientComponentClient<Database>()

  const handleLogOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleLogOut}
        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
        {texto}
      </button>
    </>
  );
}
