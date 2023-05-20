"use client";

import { useSupabase } from "@/app/Supabase-provider";
import { useState } from "react";

interface RecoveryFormProps {}

export default function RecoveryForm({}: RecoveryFormProps) {
  const { supabase } = useSupabase();
  const [senha, setSenha] = useState("");

  const handleUpdatePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: senha,
    });
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-branco dark:bg-escuro2">
        <div className="flex w-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                Nova senha
              </label>
            </div>
            <div className="mt-">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setSenha(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <button
                onClick={handleUpdatePassword}
                className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
