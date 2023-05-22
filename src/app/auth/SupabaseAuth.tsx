"use client";
import { useState } from "react";
import SignIn from "./(views)/signin";
import SignUp from "./(views)/signup";
import ForgetPwd from "./(views)/forgetpwd";
import Alert from "../(components)/Alert"
interface SupabaseAuthProps { }

export default function SupabaseAuth({ }: SupabaseAuthProps) {
  const [view, setView] = useState("signin"); //signin, signup, forgetpwd
  const [alert, setAlert] = useState({type: "", message: ""});

  function handleChangeView(e: string) {
    setView(e);
    setAlert({type: "", message: ""});
  }


  return (
    <>
      {view == "signin" ? (
        <SignIn onAlert={setAlert}/>
      ) : view == "signup" ? (
        <SignUp onDone={setView} onAlert={setAlert} />
      ) : view == "forgetpwd" ? (
        <ForgetPwd onAlert={setAlert}/>
      ) : (
        <p>ERRO</p>
      )}
      <div className="flex flex-col align-middle justify-center">
        {alert.message.length > 1 ? (
            <div className="pt-6">
              <Alert
                type={alert.type}
                title="Erro"
                text={alert.message}
              />
            </div>
          ) : (
            <div></div>
          )             
        }
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
        ) : view == view || view == "forgetpwd" ? (
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
        )
        }
      </div>
    </>
  );
}
