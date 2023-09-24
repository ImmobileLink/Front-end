"use client";
import React, { useEffect, useState } from "react";
import { Database } from "../../../../../lib/database.types";
import { Imovel } from "@/app/i18n/dictionaries/types";
import { ImovelTipado, InsereImovel, TipoImovel } from "../../../../../lib/modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from 'uuid';
import Select from "react-select";
import InputMask from "react-input-mask";
import Form from "./Form";
import { Spinner } from "flowbite-react";

interface FormProps {
  props: {
    userid: string | undefined,
    textos: Imovel,
    tipos: TipoImovel[],
    outros: TipoImovel[],
    mobilias: TipoImovel[],
    condicoes: TipoImovel[],
    formOpen: boolean,
    setFormOpen: Dispatch<SetStateAction<boolean>>,
  }
}

const supabase = createClientComponentClient<Database>();

export default function Form({ props }: FormProps) {
  // Dados
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [num, setNum] = useState("");
  const [complemento, setComplemento] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img, setImg] = useState<File>();
  const [imagemId, setImagemId] = useState("");

  const [loading, setLoading] = useState(false);

  // Tipos de imóvel
  const [mobilia, setMobilia] = useState<TipoImovel>({id: '', descricao: ''});
  const [condicao, setCondicao] = useState<TipoImovel>({id: '', descricao: ''});
  const [type, setType] = useState<TipoImovel>({id: '', descricao: ''});
  const [selectedOptions, setSelectedOptions] = useState<TipoImovel>({id: '', descricao: ''});

  const [disabilitarInput, isDisabilitarInput] = useState(false);
  const [cepValid, isCepValid] = useState(false);

  const handleCadastrarImagem = async () => {
    // Enviar o arquivo para o Supabase Storage
  const { data, error } = await supabase
    .storage
    .from('imoveis') // Nome do bucket no Supabase
    .upload(props.userid + "/" + imagemId, img);  // Cria a pasta se ela ainda não existir

  if (error) {
    console.error('Erro ao fazer upload:', error.message);
  } else {
    console.log('Arquivo enviado com sucesso:', data);
  }
}

const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setImagemId(uuidv4());
    setImg(file);
  }
};

const handleOptions = async () => {
  let dados = [type, mobilia, condicao];

  // Verifique se selectedOptions não está vazio e é um array
  if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
    dados = [
      ...dados,
      ...selectedOptions.map((option) => ({
        id: option.id,
        descricao: option.descricao
      }))
    ];
  }
  return dados;
};

// Falta a validação dos dados
const handleCadastrarImovel = async (event: any) => {
  event.preventDefault();

  setLoading(true);

  const dados = await handleOptions();
  console.log(dados);

  const preco = valor.replace(",", ".");

  if (img) {
    await handleCadastrarImagem();
  }

  const imovel: InsereImovel = {
    idcorporacao: props.userid,
    descricao: descricao,
    cep: cep,
    estado: estado,
    cidade: cidade,
    bairro: bairro,
    rua: rua,
    numero: num,
    complemento: complemento,
    valor: preco,
    imagem: imagemId,
    caracteristicas: dados
  };
  const { data, error } = await supabase.from("imovel").insert(imovel).select();
  if (!error) {
    props.setFormOpen(false);
    setLoading(false);

    for (let i = 0; i < dados.length; i++) {
      const imovelTipado: ImovelTipado = {
        idimovel: data[0].id,
        idtipoimovel: dados[i].id
      }
      const { error } = await supabase.from("imoveltipado").insert(imovelTipado);
      if (error) {
        console.log(error);
      }
    }
    console.log(data);
  } else {
    console.log(error);
  }
};

const handleTipoImovel = (event: any) => {
  const selectedValue = event.target.value;
  const selectedObject = props.tipos!.find(
    (t: TipoImovel) => t.descricao === selectedValue
  );
  if (selectedObject != null) {
    setType(selectedObject);
  }
};

const getCEP = async (cep: string) => {
  try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      return data;
  } catch (error) {
      return false;
  }
};

const apagaCampos = async () => {
setEstado("");
setCidade("");
setBairro("");
setRua("");
setComplemento("");
}

const autoCompletaEndereco = async () => {
  isDisabilitarInput(false);
  const data = await getCEP(cep);

  if (!data.erro) {
      setEstado(data.uf);
      setCidade(data.localidade);
      setBairro(data.bairro);
      setRua(data.logradouro);
      if (data.complemento != "") {
          setComplemento(data.complemento);
      }
      isCepValid(true);
      isDisabilitarInput(true);
  } else {
      apagaCampos();
      isCepValid(false);
      isDisabilitarInput(false);
  }
  console.log(data.erro)
};

useEffect(() => {
  isDisabilitarInput(false);
  const regexCep = /^\d{8}$/;
  if (cep.length == 8) {
      if (!regexCep.test(cep)) {
        console.log(cep);
      } else {
        autoCompletaEndereco();
      }
  }
}, [cep]);

  return (
    <>
      <form
              onSubmit={handleCadastrarImovel}
              className="relative z-20 group"
              aria-labelledby="slide-over-title"
              aria-modal="true"
              noValidate
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto relative w-screen max-w-lg">
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 md:-ml-10 md:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => {
                            props.setFormOpen(false);
                          }}
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden bg-white py-6 shadow-xl">
                        <div className="px-4 md:px-6">
                          <h2
                            className="text-2xl font-semibold leading-6 text-gray-900"
                          >
                            {props.textos.newproperty.registerproperty}
                          </h2>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 md:px-6">
                          <label className=" text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              <span className="text-red-500">* </span>{props.textos.newproperty.requiredfields}
                          </label>
                          <div className="my-2 flex flex-wrap">
                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              CEP<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full md:w-3/4">
                              <InputMask
                                mask="99999-999"
                                maskChar={null}
                                //value={cep}
                                onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                type="text"
                                pattern="\d{5}-\d{3}"
                                placeholder=" "
                                required
                              />
                              <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Inválido
                              </span>
                            </div>

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              {props.textos.newproperty.uf}<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full md:w-3/4">
                              <input
                                disabled={disabilitarInput}
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=" "
                              />
                            </div>

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              {props.textos.newproperty.city}<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full md:w-3/4">
                              <input
                                disabled={disabilitarInput}
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                type="text"
                                pattern=".{2,}"
                                placeholder=" "
                                required
                              />
                              <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Inválido
                              </span>
                            </div>

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              {props.textos.newproperty.neighborhood}<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full md:w-3/4">
                              <input
                                disabled={disabilitarInput}
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                type="text"
                                pattern=".{2,}"
                                placeholder=" "
                                required
                              />
                              <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Inválido
                              </span>
                            </div>

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              {props.textos.newproperty.street}<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full md:w-3/4">
                              <input
                                disabled={disabilitarInput}
                                value={rua}
                                onChange={(e) => setRua(e.target.value)}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                type="text"
                                pattern=".{2,}"
                                placeholder=" "
                                required
                              />
                              <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Inválido
                              </span>
                            </div>

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              {props.textos.newproperty.number}<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full md:w-3/4">
                              <input
                                min="0"
                                value={num}
                                onChange={(e) => setNum(e.target.value.replace(/\D/g, ""))}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                type="text"
                                pattern="^[0-9]+$"
                                placeholder=" "
                                required
                              />
                              <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Inválido
                              </span>
                            </div>

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              Complemento
                            </label>
                            <div className="w-full md:w-3/4">
                              <input
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)} 
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder=" "
                              />
                            </div>

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              {props.textos.newproperty.price}<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full md:w-3/4">
                              <input
                                value={valor}
                                onChange={(e) => setValor(e.target.value.replace(/[^0-9,.]/g, ""))}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                                type="text"
                                placeholder=" "
                                pattern="^\d+(,\d{0,2})?|\d+(\.\d{0,2})?$"
                                required
                              />
                              <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                Inválido
                              </span>
                            </div>

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              Tipo de Imóvel<span className="text-red-500">* </span>
                            </label>
                            <select
                              className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:w-3/4 bg-gray-200 border-gray-200 focus:bg-white"
                              onChange={(e) => handleTipoImovel(e)}
                              defaultValue=""
                              required
                            >
                              <option disabled value="">Select</option>
                              {props.tipos!.map((t: TipoImovel) => {
                                return (<option key={t.id}>{t.descricao}</option>)
                              })}
                            </select>

                            <div className="grid grid-cols-2 w-full justify-center items-start py-2">
                              <div>
                                <label className="text-gray-700 text-sm font-bold mb-1 w-full py-2 md:pr-4 leading-normal">
                              Mobília<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full">
                            {props.mobilias!.map((option) => (
                              <div key={option.id}>
                                <label>
                                  <input
                                    type="radio"
                                    name="mobilia"
                                    value={option.id}
                                    checked={mobilia === option}
                                    onChange={() => setMobilia(option)}
                                    required
                                  />
                                  <span className="ml-2">{option.descricao}</span> 
                                </label>
                              </div>
                            ))}
                            </div>
                              </div>
                              <div>
                                <label className="text-gray-700 text-sm font-bold mb-1 w-full py-2 md:pr-4 leading-normal">
                              Condição<span className="text-red-500">* </span>
                            </label>
                            <div className="w-full">
                            {props.condicoes!.map((option) => (
                              <div key={option.id}>
                                <label>
                                  <input
                                    type="radio"
                                    name="condicao"
                                    value={option.id}
                                    checked={condicao === option}
                                    onChange={() => setCondicao(option)}
                                    required
                                  />
                                  <span className="ml-2">{option.descricao}</span>
                                </label>
                              </div>
                            ))}
                            </div>
                              </div>
                            </div>

                            {/*<Select options={props.outros} 
                              getOptionValue={(option) => option.id} 
                              getOptionLabel={(option) => option.descricao} 
                              onChange={(item) => setSelectedOptions(item)} 
                              isMulti
                              closeMenuOnSelect={false}
                            />   */}      

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              {props.textos.newproperty.description}
                            </label>
                            <div className="w-full md:w-3/4">
                              <textarea
                                cols={30}
                                rows={3}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              ></textarea>
                            </div>                 

                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              Carregar imagem
                            </label>
                            <div className="w-full md:w-3/4 pt-2 ">
                              <input
                                className="relative shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline block  border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleFileChange}
                              />
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">PNG, JPG or JPEG (MAX. 800x400px).</p>
                            </div>

                            <div className="pt-2 ml-auto w-1/2 flex justify-end">
                              <button
                                type="submit"
                                className="p-2 mt-2 grow text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2 group-invalid:pointer-events-none group-invalid:opacity-30"
                              >
                                {loading ? (
                                  <>
                                  <Spinner />
                                  <span className="pl-3">
                                    Loading...
                                  </span></>
                                )
                                : (
                                  <span>{props.textos.newproperty.register}</span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
    </>
  )
}