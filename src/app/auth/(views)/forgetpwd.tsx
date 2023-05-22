"use client";

import { useSupabase } from "@/app/Supabase-provider";
import { Dispatch, SetStateAction, useState } from "react";

interface ForgetPwd {
  onAlert: Dispatch<SetStateAction<{ type: string, message: string }>>;
}

export default function ForgetPwd({ onAlert }: ForgetPwd) {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");

  const validaEmail = async () => {
    let { data: usuario, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("email", email);

    if (!error) {
      if (usuario?.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false
    }
  };

  const handleChangePassword = async () => {
    if (await validaEmail()){
      let {data, error}  = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "localhost:3000/auth/recovery",
      });
  
      if(!error){
        onAlert({type: "info", message: "Email para redefinição de senha enviado"})
      }else{
        onAlert({type: "warning", message: error.message})
      }
    }else {
      onAlert({type: "warning", message: "Esse email não está cadastrado"});

  }}

  return (
    <>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            Endereço de E-mail
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secundaria-100 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleChangePassword}
            className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
          >
            Enviar e-mail de redefinição de senha
          </button>
        </div>
      </div>
    </>
  );
}
