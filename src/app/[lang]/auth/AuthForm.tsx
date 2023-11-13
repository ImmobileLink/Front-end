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
        tipoImovel: { id: string; descricao: string }[] | null;
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
            ) : view == "terms" ? (
                <>
                    <div className="h-96 md:h-80 overflow-y-scroll">
                        <h1 className="text-xl text-bold">
                            {auth.terms.title}
                        </h1>
                        <br />
                        <b>{auth.terms.warning}</b>

                        <p>{auth.terms.introduction}</p>
                        <br />
                        <p>
                            <b>{auth.terms.simulationTitle}</b>
                            {auth.terms.simulation}
                        </p>
                        <br />
                        <p>
                            <b>{auth.terms.fictiontitle}</b>
                            {auth.terms.fiction}
                        </p>
                        <br />
                        <p>
                            <b>{auth.terms.responsibletitle}</b>
                            {auth.terms.responsible}
                        </p>
                        <br />
                        <p>
                            <b>{auth.terms.copyrighttitle}</b>
                            {auth.terms.copyright}
                        </p>
                        <br />
                        <p>
                            <b>{auth.terms.feedbacktitle}</b>
                            {auth.terms.feedback}
                        </p>
                        <br />
                        <p>{auth.terms.disclaimer1}</p>
                        <br />
                        <p>{auth.terms.disclaimer2}</p>
                        <br />
                        <a>Atenciosamente,</a>
                        <br />
                        <a
                            className="font-semibold text-blue-500"
                            target="_blank"
                            href="https://immobilelink.blogspot.com/"
                        >
                            {auth.terms.teamimmobile}
                        </a>
                        <br />
                        <br />
                        <p>{auth.terms.location}</p>
                    </div>
                    <div className="flex mt-10 w-full justify-center text-sm text-gray-500">
                        <p>{auth.always.alreadyhaveanaccount}</p>
                        <button
                            onClick={() => handleChangeView("signin")}
                            className="font-semibold ml-2 text-blue-500 hover:text-secundaria-100"
                        >
                            {auth.always.singin}
                        </button>
                    </div>
                </>
            ) : (
                <h1>ERRO</h1>
            )}
            <div className="flex flex-col align-middle justify-center">
                {alert.message.length > 1 ? (
                    <div className="pt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Alert
                            /*// @ts-ignore */
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
                                    {auth.always.bylogginin}
                                    <button
                                        onClick={() =>
                                            handleChangeView("terms")
                                        }
                                        className="font-semibold ml-1 mr-1 text-blue-500 hover:text-secundaria-100"
                                    >
                                        {auth.always.terms}
                                    </button>{" "}
                                    {auth.always.ofthisplataform}
                                </>
                            ) : view == "signup" ? (
                                <>
                                    {auth.always.bycreatinganaccount}
                                    <button
                                        onClick={() =>
                                            handleChangeView("terms")
                                        }
                                        className="font-semibold ml-1 mr-1 text-blue-500 hover:text-secundaria-100"
                                    >
                                        {auth.always.terms}
                                    </button>{" "}
                                    {auth.always.ofthisplataform}
                                </>
                            ) : null}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
