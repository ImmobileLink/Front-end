import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";
import { useTheme } from "next-themes";
import { useState } from "react";

function Cadastro() {
  const session = useSession();

  const { systemTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSignUp = (e: any) => {
    e.preventDefault;

    supabase.auth
      .signUp({
        email: email,
        password: senha,
      })
      .then((response) => {
        console.log("Response:", response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSignUp(e)}>
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Senha
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
            type="submit"
            className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
          >
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}

export default Cadastro;
