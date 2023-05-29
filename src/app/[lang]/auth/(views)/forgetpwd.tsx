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
      <div className="space-y-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={verificaEmailDB}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {forgetpassword.emaillabel}
          </label>
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
