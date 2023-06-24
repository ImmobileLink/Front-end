"use client";

//a ideia é oque, todos os valores dos useState vao ficar no componente principal (esse mesmo)
//o que vai passar de uma tela pra outra é a função setXXX somente dos campos que ele vai
//editar naquela tela, que vai editar o estado que ta nesse componente
//quando clicar em avançar muda de tela e atualiza o Stepper

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

interface SignUpProps {
  setAlert: Dispatch<
    SetStateAction<{ type: string; title: string; message: string }>
  >;
  signup: Signup;
  data: {
    tipoImovel: { id: any; descricao: any }[] | null;
    regiao: { id: any; regiao: any }[] | null;
  };
}

const supabase = createClientComponentClient<Database>()

export default function SignUp({ setAlert, signup, data }: SignUpProps) {
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

  //signup4
  const [creci, setCreci] = useState<string>("");
  const [especialidade, setEspecialidade] = useState<
    { id: any; descricao: any }[]
  >([]);
  const [regiaoAtuacao, setRegiaoAtuacao] = useState<
    { id: any; regiao: any }[]
  >([]);
  const [especialidadesIncluidas, setEspecialidadesIncluidas] = useState<
    string[]
  >([]);
  const [regioesIncluidas, setRegioesIncluidas] = useState<string[]>([]);

  //signup5
  const [premium, setPremium] = useState<boolean>(false);

  const handleBotaoVoltarTela = () => {
    setAlert({
      type: "warning",
      title: "",
      message: "",
    });
    telaAtual > 1 ? setTelaAtual(telaAtual - 1) : {};
    setPodeAvancar(true);
  };

  const handleBotaoAvancarTela = () => {
    if (podeAvancar) {
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
  };

  const handleSignUp = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
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
          arrayUsuarioPorRegiao.push({ idusuario: userId, idregiao: item.id });
        });

        const { error } = await supabase
          .from("usuarioporregiao")
          .insert(arrayUsuarioPorRegiao);
      }

      router.refresh()
    }
  };

  return (
    <>
      {!isOK ? (
        <div>
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
