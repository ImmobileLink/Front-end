"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Database } from "../../../../../lib/database.types";
import { Imovel } from "@/app/i18n/dictionaries/types";
import {
  ImovelTipado,
  InsereImovel,
  TipoImovel,
} from "../../../../../lib/modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import InputMask from "react-input-mask";
import { Spinner } from "flowbite-react";
{/* @ts-ignore */}
import Select, { StylesConfig, ValueType } from "react-select";

interface FormProps {
  props: {
    userid: string | undefined;
    textos: Imovel;
    tipos: TipoImovel[];
    outros: TipoImovel[];
    mobilias: TipoImovel[];
    condicoes: TipoImovel[];
    formOpen: boolean;
    setFormOpen: Dispatch<SetStateAction<boolean>>;
  };
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
  const [mobilia, setMobilia] = useState<TipoImovel>({id:"", descricao:"", classificacao:""});
  const [condicao, setCondicao] = useState<TipoImovel>({id:"", descricao:"", classificacao:""});
  const [type, setType] = useState<TipoImovel>({id:"", descricao:"", classificacao:""});
  const [selectedOptions, setSelectedOptions] = useState<ValueType<TipoImovel>>({id:"", descricao:"", classificacao:""});

  const [disabilitarInput, isDisabilitarInput] = useState(false);

  const handleCadastrarImagem = async () => {
    // Enviar o arquivo para o Supabase Storage
    const { data, error } = await supabase.storage
      .from("imoveis") // Nome do bucket no Supabase
      .upload(props.userid + "/" + imagemId, img!); // Cria a pasta se ela ainda não existir

    if (error) {
      console.error("Erro ao fazer upload:", error.message);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagemId(uuidv4());
      setImg(file);
    }
  };

  const handleOptions = async () => {
    let data: TipoImovel[] = [type, mobilia, condicao];

    // Verifique se selectedOptions não está vazio e é um array
    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      data = [...data, ...selectedOptions];
    }
    
    let newdata = [...data.map((option) => ({
      id: option.id,
      descricao: option.descricao,
    }))]

    return newdata;
  };

  // Falta a validação dos dados
  const handleCadastrarImovel = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const dados = await handleOptions();
    const preco = valor.replace(",", ".");

    if (img) {
      await handleCadastrarImagem();
    }

    const imovel: InsereImovel = {
      idcorporacao: props.userid!,
      descricao: descricao,
      cep: cep,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: parseInt(num),
      complemento: complemento,
      valor: parseFloat(preco),
      imagem: imagemId,
      caracteristicas: dados,
    };
    const { data, error } = await supabase
      .from("imovel")
      .insert(imovel)
      .select();
    if (!error) {
      props.setFormOpen(false);
      setLoading(false);

      for (let i = 0; i < dados.length; i++) {
        const imovelTipado: ImovelTipado = {
          idimovel: data[0].id,
          idtipoimovel: dados[i].id,
        };
        const { error } = await supabase
          .from("imoveltipado")
          .insert(imovelTipado);
        if (error) {
          console.error(error);
        }
      }
    } else {
      console.error(error);
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
  };

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
      isDisabilitarInput(true);
    } else {
      apagaCampos();
      isDisabilitarInput(false);
    }
    console.error(data.erro);
  };

  useEffect(() => {
    isDisabilitarInput(false);
    const regexCep = /^\d{8}$/;
    if (cep.length == 8) {
      if (!regexCep.test(cep)) {
        //console.log(cep);
      } else {
        autoCompletaEndereco();
      }
    }
  }, [cep]);

  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)")
  );
  const [minSize, setMinSize] = useState(
    window.matchMedia("(min-width: 768px)")
  );

  const colourStyles: StylesConfig = {
    menu: (styles) => ({
      ...styles,
      backgroundColor: darkMode.matches ? "rgb(55 65 81)" : "rgb(243 244 246)",
    }),
    option: (styles, state) => ({
      ...styles,
      fontSize: minSize.matches ? "0.875rem" : "0.75rem",
      color: darkMode.matches ? "white" : "rgb(55 65 81)",
      backgroundColor: state.isFocused ? darkMode.matches ? "rgb(59 130 246)" : "rgb(147 197 253)" : undefined
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: darkMode.matches ? "rgb(55 65 81)" : "rgb(243 244 246)",
      borderColor: darkMode.matches ? "rgb(75 85 99)" : "rgb(209 213 219)",
      ":hover": {
        borderColor: darkMode.matches ? "rgb(75 85 99)" : "rgb(209 213 219)",
      },
      minHeight: "30px",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: darkMode.matches ? "#fff" : "rgb(55 65 81)",
      fontSize: minSize.matches ? "0.875rem" : "0.75rem",
      height: "20px",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: darkMode.matches ? "white" : "rgb(55 65 81)",
      fontSize: minSize.matches ? "0.875rem" : "0.75rem",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "rgb(55 65 81)",
      fontSize: minSize.matches ? "0.875rem" : "0.75rem",
    }),
    valueContainer: (styles) => ({ ...styles, minHeight: "30px" }),
    indicatorsContainer: (styles) => ({ ...styles, minHeight: "30px" }),
  };

  useEffect(() => {
    const mediaQueryListOne = window.matchMedia("(prefers-color-scheme: dark)");
    const mediaQueryListTwo = window.matchMedia("(min-width: 400px)");

    const handleThemeChange = (e: any) => setDarkMode(e);
    const handleWidthChange = (e: any) => setMinSize(e);

    mediaQueryListOne.addEventListener("change", handleThemeChange);
    mediaQueryListTwo.addEventListener("change", handleWidthChange);
    return () => {
      mediaQueryListOne.removeEventListener("change", handleThemeChange);
      mediaQueryListTwo.removeEventListener("change", handleWidthChange);
    };
  }, []);

  return (
    <>
      <form onSubmit={handleCadastrarImovel} className="z-50 group" noValidate>
        <div className="pointer-events-auto fixed top-0 right-0 flex pl-10">
          <div className="relative w-screen">
            <div className="fixed h-full w-screen sm:max-w-lg top-0 sm:right-0 flex-col bg-white dark:bg-dark-200 py-6 shadow-xl overflow-y-auto overflow-x-hidden">
              <div className="flex px-4 sm:px-6 items-center justify-between">
                <h2 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
                  {props.textos.newproperty.registerproperty}
                </h2>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    props.setFormOpen(false);
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-4 sm:px-6 text-xs py-2 mt-1">
                <span className="text-red-500"> * </span>
                <span className="text-gray-900 dark:text-white">
                  {props.textos.newproperty.requiredfields}
                </span>
              </div>

              <div className="mt-6 flex flex-col px-4 sm:px-6">
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-1/2 px-3 mb-6 sm:mb-0">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.cep}
                      <span className="text-red-500"> * </span>
                    </label>
                    <InputMask
                      mask="99999-999"
                      maskChar={null}
                      onChange={(e) =>
                        setCep(e.target.value.replace(/\D/g, ""))
                      }
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                      type="text"
                      pattern="\d{5}-\d{3}"
                      placeholder=" "
                      required
                    />
                    <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {props.textos.newproperty.newpropertylogs.invalidcep}
                    </span>
                  </div>
                  <div className="sm:w-1/2 px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.uf}
                      <span className="text-red-500"> * </span>
                    </label>
                    <input
                      disabled={disabilitarInput}
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500"
                      type="text"
                      placeholder=" "
                    />
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-full px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.city}
                      <span className="text-red-500"> * </span>
                    </label>
                    <input
                      disabled={disabilitarInput}
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                      type="text"
                      pattern=".{2,}"
                      placeholder=" "
                      required
                    />
                    <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {props.textos.newproperty.newpropertylogs.invalidcity}
                    </span>
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-full px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.neighborhood}
                      <span className="text-red-500"> * </span>
                    </label>
                    <input
                      disabled={disabilitarInput}
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                      type="text"
                      pattern=".{2,}"
                      placeholder=" "
                      required
                    />
                    <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {props.textos.newproperty.newpropertylogs.invalidneighborhood}
                    </span>
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-full px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.street}
                      <span className="text-red-500"> * </span>
                    </label>
                    <input
                      disabled={disabilitarInput}
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                      type="text"
                      pattern=".{2,}"
                      placeholder=" "
                      required
                    />
                    <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {props.textos.newproperty.newpropertylogs.invalidstreet}
                    </span>
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-1/2 px-3 mb-6 sm:mb-0">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.number}
                      <span className="text-red-500"> * </span>
                    </label>
                    <input
                      value={num}
                      onChange={(e) =>
                        setNum(e.target.value.replace(/\D/g, ""))
                      }
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                      type="text"
                      pattern="^[0-9]+$"
                      placeholder=" "
                      required
                    />
                    <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {props.textos.newproperty.newpropertylogs.invalidnumber}
                    </span>
                  </div>
                  <div className="sm:w-1/2 px-3 mb-6 sm:mb-0">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.complement}
                    </label>
                    <input
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500"
                      type="text"
                      placeholder=" "
                    />
                  </div>
                  <div className="sm:w-1/2 px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.price}
                      <span className="text-red-500"> * </span>
                    </label>
                    <input
                      value={valor}
                      onChange={(e) =>
                        setValor(e.target.value.replace(/[^0-9,.]/g, ""))
                      }
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                      type="text"
                      placeholder=" "
                      pattern="^\d+(,\d{0,2})?|\d+(\.\d{0,2})?$"
                      required
                    />
                    <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {props.textos.newproperty.newpropertylogs.invalidprice}
                    </span>
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-full px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.type}
                      <span className="text-red-500"> * </span>
                    </label>
                    <Select
                      placeholder={props.textos.newproperty.selectopt}
                      options={props.tipos}
                      getOptionValue={(option: ValueType<TipoImovel>) => option.id}
                      getOptionLabel={(option: ValueType<TipoImovel>) => option.descricao}
                      onChange={(option: ValueType<TipoImovel>) => setType(option)}
                      styles={colourStyles}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-1/2 px-3 mb-6 sm:mb-0">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.furniture}
                      <span className="text-red-500"> * </span>
                    </label>
                    <div className="w-full">
                      {props.mobilias!.map((option) => (
                        <div key={option.id}>
                          <label>
                            <input
                              type="radio"
                              className="h-3 w-3 align-middle"
                              name="mobilia"
                              value={option.id}
                              checked={mobilia === option}
                              onChange={() => setMobilia(option)}
                              required
                            />
                            <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-white">
                              {option.descricao}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="sm:w-1/2 px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.condition}
                      <span className="text-red-500"> * </span>
                    </label>
                    <div className="w-full">
                      {props.condicoes!.map((option) => (
                        <div key={option.id}>
                          <label>
                            <input
                              type="radio"
                              className="h-3 w-3 align-middle"
                              name="condicao"
                              value={option.id}
                              checked={condicao === option}
                              onChange={() => setCondicao(option)}
                              required
                            />
                            <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-white">
                              {option.descricao}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-full px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.others}
                    </label>
                    <Select
                      placeholder={props.textos.newproperty.selectopts}
                      options={props.outros}
                      getOptionValue={(option: ValueType<TipoImovel>) => option.id}
                      getOptionLabel={(option: ValueType<TipoImovel>) => option.descricao}
                      onChange={(option: ValueType<TipoImovel>) => setSelectedOptions(option)}
                      isMulti
                      styles={colourStyles}
                      isSearchable={false}
                      closeMenuOnSelect={false}
                    />
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-full px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.description}
                    </label>
                    <textarea
                      cols={30}
                      rows={3}
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500"
                    ></textarea>
                  </div>
                </div>
                <div className="-mx-3 sm:flex mb-6">
                  <div className="sm:w-full px-3">
                    <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                      {props.textos.newproperty.imageupload}
                    </label>
                    <input
                      className="block w-full text-xs sm:text-sm relative m-0 min-w-0 flex-auto border-solid px-3 py-1.5
                                text-gray-700 border border-gray-300 rounded bg-gray-100 focus:outline-none dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                
                                file:-mx-3 file:-my-1.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit 
                                
                                file:bg-gray-700 file:px-3 file:py-1.5 file:text-white file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] dark:file:bg-white dark:file:text-gray-700 file:cursor-pointer"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileChange}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {props.textos.newproperty.imageformat}
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className={`p-2 mt-2 grow text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2 group-invalid:pointer-events-none group-invalid:opacity-30 ${
                      type?.id.length === 0 && "pointer-events-none opacity-30"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Spinner />
                        <span className="pl-3">{props.textos.newproperty.loading}</span>
                      </>
                    ) : (
                      <span>{props.textos.newproperty.register}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
