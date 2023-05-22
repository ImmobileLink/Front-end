// TODO
// substitui esses console.log para mostrar um alerta (olha o arquivo Alert do app) nos seguintes eventos
// cadastro efetuado com sucesso
// erro - mostra o log pro usuario, seja por validação ou campo faltando
//
// tenta ver se consegue dar uma arrumada no código, ta demorando muito
// eu coloquei pra dar 'onDone("signin")', que muda a view pra tela de login, pode mudar se quiser
//
// fluxo atual: valida o email -> cadastra no signUp (vai pra tabela users do auth) -> adiciona na tabela usuario do public
// eu tava querendo ver se linkava o email do usuario(public) com o email do users(auth), mas pra isso eu tinha que
"use client";

import { useSupabase } from "@/app/Supabase-provider";
import { Dispatch, SetStateAction, useState } from "react";
import Alert from "./../../(components)/Alert";

interface SignUpProps {
  onDone: Dispatch<SetStateAction<string>>;
  onAlert: Dispatch<SetStateAction<{ type: string, message: string }>>;}

export default function SignUp({ onDone, onAlert }: SignUpProps) {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showLog, setShowLog] = useState(false);

  const validaEmail = async () => {
    let { data: usuario, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("email", email);

    console.log(usuario);
    if (!error) {
      if (usuario?.length) {
        return false;
      } else {
        return true;
      }
    } else {
      //tenta ver o arquivo Alert que ta no app
      console.log("ERRO: ", error.message);
    }
  };

  const handleSignUp = async () => {
    if (await validaEmail()) {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });

      if (!error) {
        setShowLog(true);
        onAlert({type: "", message: ""})
      } else {
        onAlert({type: "warning", message: error.message});
      }
    } else {
      onAlert({type: "warning", message: "Esse email já esta sendo usado"});
    }
  };

  return (
    <>
      {!showLog ? (
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
              onClick={handleSignUp}
              className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
            >
              Cadastrar
            </button>
          </div>
          {/* {error.length > 1 ? (
            <Alert
              type="danger"
              title="Erro"
              text={error}
            />
          ) : (
            <></>
          )} */}
        </div>
      ) : (
        <div className="flex justify-center flex-col">
          <Alert
            type="success"
            title="Quase lá"
            text="Boa, acabaste de te registrar! Confirme seu email na caixa de entrada e faça o login"
          />
        </div>
      )}
    </>
  );
}
