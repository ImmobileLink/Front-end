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

interface SignUpProps {
    setAlert: Dispatch<
        SetStateAction<{ type: string; title: string; message: string }>
    >;
    signup: Signup;
    data: {
        tipoImovel: { id: any; descricao: any }[] | null;
    };
    lang: string;
}

const supabase = createClientComponentClient<Database>();

export default function SignUp({ setAlert, signup, data, lang }: SignUpProps) {
    const router = useRouter();

    const [isOK, setIsOK] = useState(false);
    const [telaAtual, setTelaAtual] = useState(1);
    const [podeAvancar, setPodeAvancar] = useState(false); //false -> bloqueia o botão next | true -> desbloqueia

    //signup1
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

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
    const [regiaoAtuacao, setRegiaoAtuacao] = useState<{ regiao: string }[]>([]);
    const [regioesIncluidas, setRegioesIncluidas] = useState<string[]>([]);

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
        if (podeAvancar) {
            if (telaAtual < 5) {
                isLoading(true);
            }
            if (await verifyFields()) {
                setAlert({
                    type: "warning",
                    title: "",
                    message: "",
                });
                telaAtual < 5 ? setTelaAtual(telaAtual + 1) : {};
            }
            isLoading(false);
        }
        // Isso aqui está sobreescrevendo as mensagens específicas dos erros
        // else {
        // setAlert({
        //   type: "warning",
        //   title: "",
        //   message: signup.fixtheinputs,
        // });
        // }
    };

    const verifyFields = async () => {
        switch (telaAtual) {
            case 1:
                // verifica senha
                if (!hasStrongPassword(senha)) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup1.logs.invalidpassword,
                    });
                    return false;
                }

                // verifica email
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;
                if (!regex.test(email)) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup1.logs.invalidemail,
                    });

                    return false;
                }

                let { data: usuario } = await supabase
                    .from("usuario")
                    .select("email")
                    .eq("email", email);

                if (usuario?.length) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup1.logs.emailalreadyused,
                    });
                    return false;
                }
                return true;
            case 2:
                // Nenhuma validação necessária no passo 2 por enquanto.
                return true;
            case 3:
                if (tipoPerfil == 1) {
                    // valida nome
                    if (nome.length < 4) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup3.logs.invalidname,
                        });
                        return false;
                    }
                    // valida cpf
                    if (cpf.length != 11) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup3.logs.invalidcpf,
                        });
                        return false;
                    }

                    let { data: usuario } = await supabase
                        .from("corretor")
                        .select("cpf")
                        .eq("cpf", cpf);

                    if (usuario?.length) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup3.logs.invalidcpf,
                        });
                        return false;
                    }

                    // valida cnpj
                    if (cnpj.length != 14 && cnpj.length > 0) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup3.logs.invalidcnpj,
                        });
                        return false;
                    } else if (cnpj.length == 14) {
                        let { data: usuario } = await supabase
                            .from("corretor")
                            .select("cnpj")
                            .eq("cnpj", cnpj);

                        if (usuario?.length) {
                            setAlert({
                                type: "warning",
                                title: "",
                                message: signup.signup3.logs.invalidcnpj,
                            });
                            return false;
                        }
                    }
                } else {
                    // o nome fantasia tem no mínimo 12 pontos [LegisWEB]
                    if (nomeFantasia.length < 12) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup3.logs.invalidfantasyname,
                        });
                        return false;
                    }
                    if (cnpj.length != 14) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup3.logs.invalidcnpj,
                        });
                        return false;
                    } else {
                        let { data: usuario } = await supabase
                            .from("corporacao")
                            .select("cnpj")
                            .eq("cnpj", cnpj);

                        if (usuario?.length) {
                            setAlert({
                                type: "warning",
                                title: "",
                                message: signup.signup3.logs.invalidcnpj,
                            });
                            return false;
                        }
                    }
                }
                if (
                    (celular.length != 11 && celular.length != 0) ||
                    (telefone.length != 10 && telefone.length != 0) ||
                    (comercial.length != 10 && comercial.length != 0)
                ) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup.signup3.logs.invalidphone,
                    });
                    return false;
                }
                return true;
            case 4:
                if (tipoPerfil == 1) {
                    if (creci.length < 7) {
                        setAlert({
                            type: "warning",
                            title: "",
                            message: signup.signup4.logs.invalidcreci,
                        });
                        return false;
                    } else {
                        const regexCreci = /^\d{6}[a-zA-Z]$/;
                        if (!regexCreci.test(creci)) {
                            setAlert({
                                type: "warning",
                                title: "",
                                message: signup.signup4.logs.invalidcreci,
                            });
                            return false;
                        }
                        let { data: usuario } = await supabase
                            .from("corretor")
                            .select("creci")
                            .eq("creci", creci);

                        if (usuario?.length) {
                            setAlert({
                                type: "warning",
                                title: "",
                                message: signup.signup4.logs.invalidcreci,
                            });
                            return false;
                        }
                    }
                }
                return true;
            case 5:
                // Nenhuma validação necessária no passo 5 por enquanto.
                return true;
        }
        // default
        return false;
    };

    function hasStrongPassword(object: string) {
        const password = object;
        const minLength = 6;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]/.test(
            password
        );

        if (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumber &&
            hasSpecialChar
        ) {
            return true;
        } else {
            return false;
        }
    }

    const handleSignUp = async () => {
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (!error) {
            const userId = data.user?.id!;

            if (tipoPerfil == 1) {
                let { error } = await supabase.from("corretor").insert([
                    {
                        id: userId,
                        nome: nome,
                        cpf: cpf,
                        cnpj: cnpj,
                        creci: creci,
                        cep: cep,
                        estado: estado,
                        cidade: cidade,
                        bairro: bairro,
                        logradouro: logradouro,
                        numero: numero,
                        complemento: complemento,
                        telefone: telefone,
                        celular: celular,
                        comercial: comercial,
                        premium: premium,
                    },
                ]);
                // especialidade
                {
                    let arrayEspecialidade: any = [];

                    especialidade.map((item) => {
                        arrayEspecialidade.push({
                            idcorretor: userId,
                            idtipoimovel: item.id,
                        });
                    });

                    const { error } = await supabase
                        .from("especialidade")
                        .insert(arrayEspecialidade);
                }
            } else {
                let { error } = await supabase.from("corporacao").insert([
                    {
                        id: userId,
                        nomefantasia: nomeFantasia,
                        cnpj: cnpj,
                        cep: cep,
                        estado: estado,
                        cidade: cidade,
                        bairro: bairro,
                        logradouro: logradouro,
                        numero: numero,
                        complemento: complemento,
                        telefone1: telefone,
                        telefone2: celular,
                        telefone3: comercial,
                        premium: premium,
                    },
                ]);
            }
            //usuarioporregiao
            {
                let arrayUsuarioPorRegiao: any = [];

                regiaoAtuacao.map((item) => {
                    arrayUsuarioPorRegiao.push({
                        idusuario: userId,
                        cidade: item.regiao,
                    });
                });

                const { error } = await supabase
                    .from("usuarioporregiao")
                    .insert(arrayUsuarioPorRegiao);
            }

            setIsOK(true);

            router.refresh();
        }
    };

    return (
        <>
            {!isOK ? (
                <div className="h-full">
                    <div>
                        {telaAtual == 1 ? (
                            <SignUp1
                                props={{ email, setEmail, senha, setSenha }}
                                setPodeAvancar={setPodeAvancar}
                                setAlert={setAlert}
                                signup1={signup.signup1}
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
                    <div className="w-full flex justify-center ">
                        <div className="sm:w-full md:w-10/12 lg:w-8/12">
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
