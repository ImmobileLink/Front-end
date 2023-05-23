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
      password: senha,
    });

    if (!error) {
      router.push("/pt/feed");
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
      <div className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            {signin.emaillabel}
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
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            {signin.passwordlabel}
          </label>
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
