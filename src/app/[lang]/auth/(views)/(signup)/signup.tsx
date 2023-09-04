"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import Alert from "@/app/[lang]/(components)/Alert";
import Stepper from "@/app/[lang]/(components)/(auth)/Stepper";

import { Signup } from "@/app/i18n/dictionaries/types";

import SignUp1 from "./signup1";
import Signup2 from "./signup2";
import Signup3 from "./signup3";
import Signup4 from "./signup4";
import Signup5 from "./signup5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../lib/database.types";
import Loading from "@/app/[lang]/(components)/(auth)/Loading";
import { handleSignUpDB, verifyFields } from "./validations";

interface SignUpProps {
    fieldErros: Object;
    setFieldErros: Function;
    setAlert: Dispatch<
        SetStateAction<{ type: string; title: string; message: string }>
    >;
    signup: Signup;
    data: {
        tipoImovel: { id: string; descricao: string }[] | null;
    };
    lang: string;
}

const supabase = createClientComponentClient<Database>();

export default function SignUp({
    fieldErros,
    setFieldErros,
    setAlert,
    signup,
    data,
    lang,
}: SignUpProps) {
    const router = useRouter();

    const [isOK, setIsOK] = useState(false);
    const [telaAtual, setTelaAtual] = useState(1);
    const [podeAvancar, setPodeAvancar] = useState(false); //false -> bloqueia o botão next | true -> desbloqueia

    //signup1
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [confirmSenha, setConfirmSenha] = useState("");

    //signup2
    const [tipoPerfil, setTipoPerfil] = useState<number>(1); //1 -> corretor | 2 -> empresa

    //signup3
    const [nome, setNome] = useState<string>("");
    const [nomeFantasia, setNomeFantasia] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [comercial, setComercial] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [logradouro, setLogradouro] = useState<string>("");
    const [numero, setNumero] = useState<number | null>(0);
    const [complemento, setComplemento] = useState<string>("");
    const [cepValid, isCepValid] = useState<boolean>(false);

    //signup4
    const [creci, setCreci] = useState<string>("");
    const [especialidade, setEspecialidade] = useState<{ id: any; descricao: any }[]>([]);
    const [especialidadesIncluidas, setEspecialidadesIncluidas] = useState<string[]>([]);
    const [regiaoAtuacao, setRegiaoAtuacao] = useState<{ estado: string, cidade: string }[]>([]);
    const [regioesIncluidas, setRegioesIncluidas] = useState<{ estado: string, cidade: string }[]>([]);

    //signup5
    const [premium, setPremium] = useState<boolean>(false);

    //loading
    const [loading, isLoading] = useState(false);

    const handleBotaoVoltarTela = () => {
        setAlert({
            type: "warning",
            title: "",
            message: "",
        });
        telaAtual > 1 ? setTelaAtual(telaAtual - 1) : {};
        setPodeAvancar(true);
    };

    const handleBotaoAvancarTela = async () => {
        //  if (podeAvancar) {
        if (telaAtual < 5) {
            isLoading(true);
        }
        if (
            await verifyFields(
                telaAtual,
                setFieldErros,
                signup,
                tipoPerfil,
                senha,
                confirmSenha,
                email,
                supabase,
                nome,
                cpf,
                cnpj,
                nomeFantasia,
                celular,
                telefone,
                comercial,
                creci,
                estado,
                cidade,
                logradouro,
                numero,
                bairro,
                cep
            )
        ) {
            setAlert({
                type: "warning",
                title: "",
                message: "",
            });
            telaAtual < 5 ? setTelaAtual(telaAtual + 1) : {};
        } else {
            setAlert({
                type: "warning",
                title: "",
                message: signup.fixtheinputs,
            });
        }
        isLoading(false);
        // }
    };

    const handleSignUp = async () => {
        const callback = handleSignUpDB(
            tipoPerfil,
            senha,
            email,
            supabase,
            nome,
            cpf,
            cnpj,
            nomeFantasia,
            celular,
            telefone,
            comercial,
            creci,
            cep,
            estado,
            logradouro,
            numero,
            complemento,
            cidade,
            bairro,
            premium,
            especialidade,
            regiaoAtuacao
        );
        if (await callback) {
            setIsOK(true);
            router.refresh();
        } else {
            //Algo deu errado [Investigar!]
            console.log("handleSignUpDB error!");
        }
    };

    return (
        <>
            {!isOK ? (
                <div className="h-full">
                    <div>
                        {telaAtual == 1 ? (
                            <SignUp1
                                props={{ email, setEmail, senha, setSenha, confirmSenha, setConfirmSenha }}
                                fieldErros={fieldErros}
                                setPodeAvancar={setPodeAvancar}
                                signup1={signup.signup1}
                                setFieldErros={setFieldErros}
                            />
                        ) : telaAtual == 2 ? (
                            <Signup2
                                props={{ tipoPerfil, setTipoPerfil }}
                                setAlert={setAlert}
                                signup2={signup.signup2}
                            />
                        ) : telaAtual == 3 ? (
                            <Signup3
                                props={{
                                    cepValid,
                                    isCepValid,
                                    nome,
                                    setNome,
                                    nomeFantasia,
                                    setNomeFantasia,
                                    cpf,
                                    setCpf,
                                    cnpj,
                                    setCnpj,
                                    telefone,
                                    setTelefone,
                                    celular,
                                    setCelular,
                                    comercial,
                                    setComercial,
                                    cep,
                                    setCep,
                                    estado,
                                    setEstado,
                                    cidade,
                                    setCidade,
                                    bairro,
                                    setBairro,
                                    logradouro,
                                    setLogradouro,
                                    numero,
                                    setNumero,
                                    complemento,
                                    setComplemento,
                                }}
                                tipoPerfil={tipoPerfil}
                                setPodeAvancar={setPodeAvancar}
                                setAlert={setAlert}
                                setFieldErros={setFieldErros}
                                fieldErros={fieldErros}
                                signup3={signup.signup3}
                            />
                        ) : telaAtual == 4 ? (
                            <Signup4
                                props={{
                                    creci,
                                    setCreci,
                                    especialidade,
                                    setEspecialidade,
                                    regiaoAtuacao,
                                    setRegiaoAtuacao,
                                    especialidadesIncluidas,
                                    setEspecialidadesIncluidas,
                                    regioesIncluidas,
                                    setRegioesIncluidas,
                                }}
                                tipoPerfil={tipoPerfil}
                                setPodeAvancar={setPodeAvancar}
                                setAlert={setAlert}
                                signup4={signup.signup4}
                                data={data}
                                fieldErros={fieldErros}
                            />
                        ) : telaAtual == 5 ? (
                            <Signup5
                                props={{
                                    premium,
                                    setPremium,
                                }}
                                tipoPerfil={tipoPerfil}
                                setAlert={setAlert}
                                signup5={signup.signup5}
                                handleSignUp={handleSignUp}
                            />
                        ) : (
                            <h1>ERRO</h1>
                        )}
                    </div>

                    <div className="w-full flex justify-center gap-5 my-9">
                        <button
                            onClick={handleBotaoVoltarTela}
                            className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white gap-2"
                        >
                            <BsArrowLeft />
                            {signup.previousbutton}
                        </button>
                        <button
                            onClick={handleBotaoAvancarTela}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white gap-2"
                        >
                            <Loading loading={loading} />
                            {signup.nextbutton}
                            <BsArrowRight />
                        </button>
                    </div>
                    <div className="hidden md:flex w-2/5 justify-center">
                        <div className="sm:w-1/3 md:w-10/12 lg:w-8/12">
                            <Stepper
                                atual={telaAtual}
                                stepper={signup.stepper}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center flex-col">
                        <Alert
                            type="success"
                            title={signup.success}
                            text={signup.successsignup}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
