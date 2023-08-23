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
            ) : view == "terms" ? (
                <>
                    <div className="h-96 md:h-80 overflow-y-scroll">
                        {
                            // os termos daqui são um placeholder - HARDCODED
                        }
                        <h1 className="text-xl text-bold">
                            TERMOS DE USO DA PLATAFORMA
                        </h1>
                        <br />
                        <b>
                            Aviso Importante: Projeto de Conclusão de Curso -
                            Uso Simulado e Fictício
                        </b>

                        <p>
                            Este site é parte de um projeto de conclusão de
                            curso e foi desenvolvido com o propósito específico
                            de apresentar o conceito de um canal de comunicação
                            de corretores com imobiliárias. Por favor, tenha em
                            mente as seguintes considerações ao utilizar esta
                            plataforma:
                        </p>
                        <br />
                        <p>
                            <b>Simulação e Ficção: </b>
                            Esta plataforma não representa uma plataforma real
                            para corretores de imóveis e não está conectada a
                            quaisquer transações ou atividades reais do mercado
                            imobiliário. Todas as interações, anúncios, imóveis
                            e informações contidas neste site são simuladas e
                            fictícias, destinadas apenas para fins acadêmicos e
                            de demonstração.
                        </p>
                        <br />
                        <p>
                            <b>Dados Fictícios: </b>
                            Quaisquer informações fornecidas para cadastro,
                            incluindo nome, endereço, números de telefone,
                            e-mails e outros detalhes, devem ser inteiramente
                            fictícios. Não é recomendado o uso de informações
                            pessoais reais ou sensíveis. Não utilizamos de forma
                            alguma as informações fornecidas neste site para
                            fins que não sejam apenas para exibição e
                            demonstração de suas funcionalidades.
                        </p>
                        <br />
                        <p>
                            <b>Uso Responsável: </b>
                            Ao interagir com esta plataforma, solicitamos que
                            você a utilize de forma responsável e respeitosa.
                            Não é permitido o compartilhamento de conteúdo
                            ofensivo, discriminatório, ilegal ou prejudicial.
                        </p>
                        <br />
                        <p>
                            <b>Direitos Autorais: </b>
                            Todas as imagens, logotipos e outros materiais
                            visuais utilizados neste site são usados com fins
                            ilustrativos e de demonstração, e os direitos
                            autorais pertencem aos seus respectivos
                            proprietários.
                        </p>
                        <br />
                        <p>
                            <b>Feedback e Contato: </b>
                            Caso deseje fornecer feedback sobre esta plataforma,
                            por favor, esteja ciente de que qualquer comentário
                            ou sugestão serão considerados para fins acadêmicos
                            e de melhoria do projeto.
                        </p>
                        <br />
                        <p>
                            Ao prosseguir e utilizar este site, você reconhece
                            que está ciente da natureza simulada e fictícia
                            desta plataforma e concorda em respeitar as
                            condições e orientações aqui apresentadas.
                        </p>
                        <br />
                        <p>
                            Para obter informações ou esclarecimentos adicionais
                            sobre este projeto de conclusão de curso, entre em
                            contato através do canal indicado no site.
                            Agradecemos por sua compreensão e interesse em nosso
                            projeto de conclusão de curso.
                        </p>
                        <br />
                        <a>Atenciosamente,</a>
                        <br />
                        <a
                            className="font-semibold text-blue-500"
                            target="_blank"
                            href="https://immobilelink.blogspot.com/"
                        >
                            Equipe ImmobileLink
                        </a>
                        <br />
                        <br />
                        <p>
                            Tecnologia em Análise e Desenvolvimento de SIstemas
                            - IFSP, 2023
                        </p>
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
