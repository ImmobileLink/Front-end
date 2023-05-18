"use client";
import Link from "next/link";
import { useSupabase } from "./Supabase-provider";

export default function LogOut() {
  const { supabase } = useSupabase();

  const handleLogOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <>
      <Link href="/auth"> LOGIN </Link>
      <button
        type="button"
        onClick={handleLogOut}
        className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
        Logout
      </button>
    </>
  );
}
