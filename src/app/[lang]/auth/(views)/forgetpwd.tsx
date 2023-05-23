"use client";

import { useSupabase } from "@/app/[lang]/SupabaseProvider";
import { Forgetpassword } from "@/app/i18n/dictionaries/types";
import { Dispatch, SetStateAction, useState } from "react";

interface ForgetPwd {
  setAlert: Dispatch<
    SetStateAction<{ type: string; title: string; message: string }>
  >;
  forgetpassword: Forgetpassword;
}

export default function ForgetPwd({ setAlert, forgetpassword }: ForgetPwd) {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [existeUsuario, setExisteUsuario] = useState(false);

  const verificaEmailDB = async () => {
    let { data, error } = await supabase
      .from("usuario")
      .select("email")
      .eq("email", email)
      .limit(1);

    setExisteUsuario(data?.length ? true : false);
  };

  const validaForm = () => {
    //validação dos inputs
    if (email.length <= 6) {
      setAlert({
        type: "warning",
        title: "",
        message: forgetpassword.logs.invalidemail,
      });
      return false;
    }

    //validação no BD (so vai chegar aqui se os inputs estiverem preenchidos)
    if (!existeUsuario) {
      setAlert({
        type: "warning",
        title: "",
        message: forgetpassword.logs.emailnotfound,
      });
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (validaForm()) {
      let { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.NEXT_PUBLIC_SITE_PASSWORD_RECOVERY,
      });

      if (!error) {
        setAlert({
          type: "success",
          title: forgetpassword.success,
          message: forgetpassword.logs.emailsend,
        });
      } else {
        setAlert({ type: "warning", title: "", message: error.message });
      }
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            {forgetpassword.emaillabel}
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              onBlur={verificaEmailDB}
              className="block w-full rounded-md border-0 py-1.5 pl-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secundaria-100 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleChangePassword}
            className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
          >
            {forgetpassword.forgetpasswordbutton}
          </button>
        </div>
      </div>
    </>
  );
}
