import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import logo from "../../public/logo.png";
import logowh from "../../public/logo-wh.png";
import bg from "../../public/bg1.jpg";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState<boolean>(false);
  const { systemTheme } = useTheme();

  //pegar o estado do usuário (redux?) para verificar se ele já está logado

  //chamar o supabase.Auth
  const handleLogin = (e: any) => {
    e.preventDefault();
    alert(
      "email: " +
        email +
        "\nsenha: " +
        senha +
        "\nlembrar: " +
        (lembrar ? "sim" : "não")
    );
  };

  const hangleLoginWithGoogle = (e: any) => {
    e.preventDefault();
    alert("Entrar com Google");
  };

  //quando o cara esquecer a senha, não sei se o supabase tem algo pra isso
  const handleForgotPassword = (e: any) => {
    alert("mas tu é burro né?");
  };

  return (
    <>
      <div className="flex w-screen h-screen bg-branco dark:bg-escuro2">
        <div className="flex w-7/12 h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {systemTheme != "dark" ? (
              <Image
                className="mx-auto h-14 w-auto"
                src={logo}
                alt="Your Company"
              />
            ) : (
              <Image
                className="mx-auto h-14 w-auto"
                src={logowh}
                alt="Your Company"
              />
            )}
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              method="POST"
              onSubmit={handleLogin}
            >
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

              <div className="flex justify-between">
                <div className="text-sm">
                  <input
                    type="checkbox"
                    name="lembrar"
                    id="lembrar"
                    onClick={(e) => setLembrar(!lembrar)}
                    className="accent-secundaria-100 bg-white"
                  />
                  <label
                    htmlFor="lembrar"
                    className="pl-1 font-medium text-gray-900 dark:text-gray-100"
                  >
                    Lembrar
                  </label>
                </div>
                <div className="text-sm">
                  <div
                    onClick={(e) => {
                      handleForgotPassword(e);
                    }}
                    className="font-semibold cursor-pointer text-blue-500 hover:text-secundaria-100"
                  >
                    Esqueceu a senha?
                  </div>
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

              <div className="flex flex-row">
                <hr className="w-5/12 h-0,5 mt-2 border-0 bg-gray-600" />
                <p className="w-2/12 h-full leading-none text-center text-md text-gray-600">
                  OU
                </p>
                <hr className="w-5/12 h-0,5 mt-2 border-0 bg-gray-600" />
              </div>

              <div>
                <button
                  onClick={hangleLoginWithGoogle}
                  className="flex w-full justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                >
                  <FcGoogle className="text-lg m-1" /> Entrar com o Google
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Não tem uma conta?{" "}
              <Link
                href="/cadastro"
                className="font-semibold leading-6 text-blue-500 hover:text-secundaria-100"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden lg:block rounded-s-giga overflow-hidden">
          <Image
            src={bg}
            alt="Casa"
            className="w-full h-screen"
          />
        </div>
      </div>
    </>
  );
}
