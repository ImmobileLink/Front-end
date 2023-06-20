"use client";

import { useSupabase } from "@/app/[lang]/SupabaseProvider";
import { Dispatch, SetStateAction, useState } from "react";
import Alert from "@/app/[lang]/(components)/Alert";
import { Signup } from "@/app/i18n/dictionaries/types";

interface SignUpProps {
  setAlert: Dispatch<
    SetStateAction<{ type: string; title: string; message: string }>
  >;
  signup: Signup;
}

export default function SignUp({ setAlert, signup }: SignUpProps) {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isOK, setIsOK] = useState(false);
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
        message: signup.logs.invalidemail,
      });
      return false;
    }

    if (senha.length <= 6) {
      setAlert({
        type: "warning",
        title: "",
        message: signup.logs.invalidpassword,
      });
      return false;
    }

    //validação no BD (so vai chegar aqui se os inputs estiverem preenchidos)
    if (existeUsuario) {
      setAlert({
        type: "warning",
        title: "",
        message: signup.logs.emailalreadyused,
      });
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (validaForm()) {
      let { error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });

      if (!error) {
        setIsOK(true);
        setAlert({ type: "", title: "", message: "" });
      } else {
        setAlert({
          type: "warning",
          title: "",
          message: error.message,
        });
      }
    }
  };

  return (
    <>
      {!isOK ? (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              {signup.emaillabel}
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
              >
                {signup.passwordlabel}
              </label>
            </div>
            <div className="mt-2">
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
          </div>

          <div>
            <button
              onClick={handleSignUp}
              className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
            >
              {signup.signupbutton}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-col">
          <Alert
            type="success"
            title={signup.success}
            text={signup.logs.successsignup}
          />
        </div>
      )}
    </>
  );
}