"use client";

import { useSupabase } from "@/app/[lang]/SupabaseProvider";
import { Signin } from "@/app/i18n/dictionaries/types";
import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";

import { FcGoogle } from "react-icons/fc";

interface SignInProps {
  setAlert: Dispatch<
    SetStateAction<{ type: string; title: string; message: string }>
  >;
  signin: Signin;
}

export default function SignIn({ setAlert, signin }: SignInProps) {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    let { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha
    });

    if (!error) {
      router.push("/feed");
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: signin.logs.invalidcredentials,
      });
    }
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
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
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {signin.emaillabel}
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {signin.passwordlabel}
          </label>
        </div>

        <div>
          <button
            onClick={handleLogin}
            className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
          >
            {signin.signinbutton}
          </button>
        </div>

        <div className="flex flex-row">
          <hr className="w-5/12 h-0,5 mt-2 border-0 bg-gray-600" />
          <p className="w-2/12 h-full leading-none text-center text-md text-gray-600">
            {signin.or}
          </p>
          <hr className="w-5/12 h-0,5 mt-2 border-0 bg-gray-600" />
        </div>

        <div>
          <button
            onClick={signInWithGoogle}
            className="flex w-full justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
          >
            <FcGoogle className="text-lg m-1" /> {signin.signinwithgoogle}
          </button>
        </div>
      </div>
    </>
  );
}
