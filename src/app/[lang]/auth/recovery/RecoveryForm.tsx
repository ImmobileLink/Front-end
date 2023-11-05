"use client";

import Alert from "@/app/[lang]/(components)/Alert";
import { useState } from "react";
import { clientSupabase } from "lib/utils/clientSupabase";
import { restorePasswordAPI } from "../authUtils";
import { Recovery } from "@/app/i18n/dictionaries/types";

interface RecoveryFormProps {
  dict: Recovery
}
const supabase = clientSupabase()

export default function RecoveryForm({ dict }: RecoveryFormProps) {
  const [senha, setSenha] = useState("");
  const [alert, setAlert] = useState({ type: "", title: "", message: "" });

  const handleUpdatePassword = async () => {
    const result = await restorePasswordAPI(senha, supabase)

    if (result) {
      setAlert({
        type: "success",
        title: "Pronto!",
        message: dict.logs.passwordchanged,
      });
    } else {
      setAlert({
        type: "danger",
        title: "Erro!",
        message: dict.logs.passwordnotchanged,
      });
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            Nova senha
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={(e) => setSenha(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secundaria-100 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleUpdatePassword}
            className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
          >
            Atualizar
          </button>
        </div>
        {alert.title ? (
          <Alert
            /* @ts-ignore */
            type={alert.type}
            title={alert.title}
            text={alert.message}
          />
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
