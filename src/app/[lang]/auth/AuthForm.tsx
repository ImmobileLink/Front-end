"use client";
import { useState } from "react";
import SignIn from "./(views)/signin";
import SignUp from "./(views)/(signup)/signup";
import ForgetPwd from "./(views)/forgetpwd";
import Alert from "@/app/[lang]/(components)/Alert";
import { Auth } from "@/app/i18n/dictionaries/types";

interface AuthFormProps {
    auth: Auth;
    data: {
        tipoImovel: { id: any; descricao: any }[] | null;
        regiao: { id: any; regiao: any }[] | null;
    };
    lang: string;
}

export default function AuthForm({ auth, data, lang }: AuthFormProps) {
    const [view, setView] = useState("signin"); //signin, signup, forgetpwd
    const [alert, setAlert] = useState({ type: "", title: "", message: "" });
    const [fieldErros, setFieldErros] = useState({});

    function handleChangeView(e: string) {
        setView(e);
        setAlert({ type: "", title: "", message: "" });
    }

    return (
        <>
            {view == "signin" ? (
                <SignIn setAlert={setAlert} signin={auth.signin} lang={lang} />
            ) : view == "signup" ? (
                <SignUp
                    fieldErros={fieldErros}
                    setFieldErros={setFieldErros}
                    setAlert={setAlert}
                    signup={auth.signup}
                    data={data}
                    lang={lang}
                />
            ) : view == "forgetpwd" ? (
                <ForgetPwd
                    setAlert={setAlert}
                    forgetpassword={auth.forgetpassword}
                />
            ) : (
                <h1>ERRO</h1>
            )}
            <div className="flex flex-col align-middle justify-center">
                {alert.message.length > 1 ? (
                    <div className="pt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Alert
                            type={alert.type}
                            title={alert.title || auth.always.error}
                            text={alert.message}
                        />
                    </div>
                ) : (
                    <div></div>
                )}
                {view == "signin" ? (
                    <>
                        <div className="flex mt-10 w-full justify-center text-sm text-gray-500">
                            <p>{auth.always.donthaveanaccount}</p>
                            <button
                                onClick={() => handleChangeView("signup")}
                                className="font-semibold ml-2 text-blue-500 hover:text-secundaria-100"
                            >
                                {auth.always.signup}
                            </button>
                        </div>
                        <div className="flex mt-1 w-full justify-center text-sm text-gray-500">
                            <button
                                onClick={() => handleChangeView("forgetpwd")}
                                className="text-gray-500"
                            >
                                {auth.always.forgetpassword}
                            </button>
                        </div>
                    </>
                ) : view == "signup" || view == "forgetpwd" ? (
                    <div className="flex mt-10 w-full justify-center text-sm text-gray-500">
                        <p>{auth.always.alreadyhaveanaccount}</p>
                        <button
                            onClick={() => handleChangeView("signin")}
                            className="font-semibold ml-2 text-blue-500 hover:text-secundaria-100"
                        >
                            {auth.always.singin}
                        </button>
                    </div>
                ) : (
                    <p></p>
                )}
                <div className="flex justify-center">
                <div className="w-72 flex align-center text-center justify-center mt-10">
                    <p className="text-gray-500 text-xs">
                        {view == "signin" ? (
                            <>
                                Ao fazer login você concorda com os
                                <button
                                    onClick={() => console.log("termos")}
                                    className="font-semibold ml-1 mr-1 text-blue-500 hover:text-secundaria-100"
                                >
                                    Termos de Uso
                                </button>{" "}
                                da plataforma.
                            </>
                        ) : view == "signup" ? (
                          <>
                          Ao criar uma conta você concorda com os
                          <button
                              onClick={() => console.log("termos")}
                              className="font-semibold ml-1 mr-1 text-blue-500 hover:text-secundaria-100"
                          >
                              Termos de Uso
                          </button>{" "}
                          da plataforma.
                      </>
                        ) : null}
                    </p>
                </div>
                </div>
            </div>
        </>
    );
}
