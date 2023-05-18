"use client";
import { useState } from "react";
import SignIn from "./(views)/Signin";
import SignUp from "./(views)/Signup";
import ForgetPwd from "./(views)/Forgetpwd";

export default function SupabaseAuth() {
  const [view, setView] = useState("signin"); //signin, signup, forgetpwd

  function handleChangeView(e: string) {
    setView(e);
  }

  return (
    <>
      {view == "signin" ? (
        <SignIn onDone={setView} />
      ) : view == "signup" ? (
        <SignUp onDone={setView} />
      ) : view == "forgetpwd" ? (
        <ForgetPwd onDone={setView} />
      ) : (
        <p>ERRO</p>
      )}
      <div className="flex flex-col align-middle justify-center">
        {view == "signin" ? (
          <>
            <div className="flex mt-10 w-full justify-center text-sm text-gray-500">
              <p>Não tem uma conta?</p>
              <button
                onClick={() => handleChangeView("signup")}
                className="font-semibold ml-2 text-blue-500 hover:text-secundaria-100"
              >
                Cadastre-se
              </button>
            </div>
            <div className="flex mt-1 w-full justify-center text-sm text-gray-500">
              <button
                onClick={() => handleChangeView("forgetpwd")}
                className="text-gray-500"
              >
                Esqueceu a senha?
              </button>
            </div>
          </>
        ) : view == "signup" ? (
          <div className="flex mt-10 w-full justify-center text-sm text-gray-500">
            <p>Já tem uma conta?</p>
            <button
              onClick={() => handleChangeView("signin")}
              className="font-semibold ml-2 text-blue-500 hover:text-secundaria-100"
            >
              Entre já
            </button>
          </div>
        ) : view == "forgetpwd" ? (
          <div className="flex mt-10 w-full justify-center text-sm text-gray-500">
            <p>Já tem uma conta?</p>
            <button
              onClick={() => handleChangeView("signin")}
              className="font-semibold ml-2 text-blue-500 hover:text-secundaria-100"
            >
              Entre já
            </button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
