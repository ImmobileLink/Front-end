"use client";

import { Signup3 } from "@/app/i18n/dictionaries/types";
import InputMask from "react-input-mask";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { assignError, getCEP } from "./utils";
interface Signup3Props {
    props: {
        nome: string;
        setNome: Dispatch<SetStateAction<string>>;
        nomeFantasia: string;
        setNomeFantasia: Dispatch<SetStateAction<string>>;
        cpf: string;
        setCpf: Dispatch<SetStateAction<string>>;
        cnpj: string;
        setCnpj: Dispatch<SetStateAction<string>>;
        telefone: string;
        setTelefone: Dispatch<SetStateAction<string>>;
        celular: string;
        setCelular: Dispatch<SetStateAction<string>>;
        comercial: string;
        setComercial: Dispatch<SetStateAction<string>>;
        cep: string;
        setCep: Dispatch<SetStateAction<string>>;
        estado: string;
        setEstado: Dispatch<SetStateAction<string>>;
        cidade: string;
        setCidade: Dispatch<SetStateAction<string>>;
        bairro: string;
        setBairro: Dispatch<SetStateAction<string>>;
        logradouro: string;
        setLogradouro: Dispatch<SetStateAction<string>>;
        numero: number | null;
        setNumero: Dispatch<SetStateAction<number | null>>;
        complemento: string;
        setComplemento: Dispatch<SetStateAction<string>>;
        cepValid: boolean;
        isCepValid: Dispatch<SetStateAction<boolean>>;
    };
    tipoPerfil: number | undefined;
    setPodeAvancar: Dispatch<SetStateAction<boolean>>;
    setAlert: Dispatch<
        SetStateAction<{ type: string; title: string; message: string }>
    >;
    setFieldErros: Function;
    fieldErros: { [k: string]: any };
    signup3: Signup3;
}

export default function Signup3({
    props,
    tipoPerfil,
    setFieldErros,
    fieldErros,
    signup3,
}: Signup3Props) {
    const [disabilitarInput, isDisabilitarInput] = useState(false);

    const autoCompletaEndereco = async (erros: {}, assignError: Function) => {
        isDisabilitarInput(false);
        const data = await getCEP(props.cep);

        if (!data.erro) {
            props.setEstado(data.uf);
            props.setCidade(data.localidade);
            props.setBairro(data.bairro);
            props.setLogradouro(data.logradouro);
            props.setComplemento(data.complemento);
            props.isCepValid(true);
            isDisabilitarInput(true);
        } else {
            assignError(erros, "cep", signup3.logs.invalidcepnotfound);
            props.setEstado("");
            props.setCidade("");
            props.setBairro("");
            props.setLogradouro("");
            props.setComplemento("");
            props.isCepValid(false);
            isDisabilitarInput(false);
        }
        setFieldErros(erros);
    };

    useEffect(() => {
        isDisabilitarInput(false);
        const erros = fieldErros;
        const regexCep = /^\d{8}$/;
        if (props.cep.length == 8) {
            if (!regexCep.test(props.cep)) {
                assignError(erros, "cep", signup3.logs.invalidcep);
            } else {
                autoCompletaEndereco(erros, assignError);
                delete erros?.cep
            }
        }
    }, [props.cep]);

    const _UFs = ["UF","AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",];

    const handleUFChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value != "UF") {
            props.setEstado(value);
        } else {
            props.setEstado("");
        }
    };

    return (
        <>
            <form className=" sm:mx-auto sm:w-full sm:max-w-sm">
                {/* os dados que diferem de um corretor pra uma empresa */}
                {tipoPerfil == 1 ? (
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                className={`${fieldErros?.nome?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                placeholder=" "
                                required
                                autoFocus
                                value={props.nome}
                                onChange={(e) => props.setNome(e.target.value)}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                                {signup3.name}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                            <label className="text-red-500 text-xs">
                                {fieldErros?.nome?.[0]}
                            </label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <InputMask
                                    type="text"
                                    mask="999.999.999-99"
                                    className={`${fieldErros?.cpf?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    placeholder=" "
                                    required
                                    value={props.cpf}
                                    onChange={(e) =>
                                        props.setCpf(
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                                    {signup3.cpf}{" "}
                                    <span className="text-primaria">
                                        {" *"}
                                    </span>
                                </label>
                                <label className="text-red-500 text-xs">
                                    {fieldErros?.cpf?.[0]}
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <InputMask
                                    type="text"
                                    mask="99.999.999/9999-99"
                                    className={`${fieldErros?.cnpj?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    placeholder=" "
                                    required
                                    value={props.cnpj}
                                    onChange={(e) =>
                                        props.setCnpj(
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                                    {signup3.cnpj}
                                </label>
                                <label className="text-red-500 text-xs">
                                    {fieldErros?.cnpj?.[0]}
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                className={`${fieldErros?.nomeFantasia?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                placeholder=" "
                                required
                                autoFocus
                                value={props.nomeFantasia}
                                onChange={(e) =>
                                    props.setNomeFantasia(e.target.value)
                                }
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                                {signup3.fantasyname}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                            <label className="text-red-500 text-xs">
                                {fieldErros?.nomeFantasia?.[0]}
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <InputMask
                                type="text"
                                className={`${fieldErros?.cnpj?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                placeholder=" "
                                mask="99.999.999/9999-99"
                                required
                                value={props.cnpj}
                                onChange={(e) =>
                                    props.setCnpj(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                                {signup3.cnpj}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                            <label className="text-red-500 text-xs">
                                {fieldErros?.cnpj?.[0]}
                            </label>
                        </div>
                    </div>
                )}

                {/* celular & telefone */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <InputMask
                            type="text"
                            className={`${fieldErros?.celular?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            mask="(99) 99999-9999"
                            value={props.celular}
                            onChange={(e) =>
                                props.setCelular(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup3.phone1}
                        </label>
                        <label className="text-red-500 text-xs">
                            {fieldErros?.celular?.[0]}
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <InputMask
                            type="text"
                            className={`${fieldErros?.telefone?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            mask="(99) 9999-9999"
                            value={props.telefone}
                            onChange={(e) =>
                                props.setTelefone(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup3.phone2}
                        </label>
                        <label className="text-red-500 text-xs">
                            {fieldErros?.telefone?.[0]}
                        </label>
                    </div>
                </div>

                {/* comercial & { cep & UF } */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <InputMask
                            type="text"
                            className={`${fieldErros?.comercial?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            mask="(99) 9999-9999"
                            value={props.comercial}
                            onChange={(e) =>
                                props.setComercial(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup3.phone3}
                        </label>
                        <label className="text-red-500 text-xs">
                            {fieldErros?.comercial?.[0]}
                        </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <InputMask
                                type="text"
                                mask="99999-999"
                                className={`${fieldErros?.cep?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                placeholder=" "
                                required
                                value={props.cep}
                                onChange={(e) =>
                                    props.setCep(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                                {signup3.cep}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                            <label className="text-red-500 text-xs">
                                {fieldErros?.cep?.[0]}
                            </label>
                        </div>
                        <div className="z-0 group ">
                            <label className="text-sm text-gray-500 dark:text-gray-400">
                                {signup3.uf}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                            <select
                                className={`${fieldErros?.cep?.[0] != undefined ? "bg-red-500/50" : "bg-dark-200"} mb-1`}
                                onChange={handleUFChange}
                                disabled={disabilitarInput}
                            >
                                {_UFs.map((uf, index) => {
                                    return (
                                        <option
                                            selected={uf == props.estado}
                                            key={uf + " - " + index}
                                            className="text-center"
                                        >
                                            {uf}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="md:justify-end w-full flex">
                    <label className="text-red-500 text-xs mb-8">
                        {fieldErros?.estado?.[0]}
                    </label>
                </div>

                {/* cidade & bairro */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            className={`${fieldErros?.cidade?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            value={props.cidade}
                            disabled={disabilitarInput}
                            onChange={(e) => props.setCidade(e.target.value)}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup3.city}
                            <span className="text-primaria">{" *"}</span>
                        </label>
                        <label className="text-red-500 text-xs">
                            {fieldErros?.cidade?.[0]}
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            className={`${fieldErros?.bairro?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            maxLength={11}
                            disabled={disabilitarInput}
                            value={props.bairro}
                            onChange={(e) => props.setBairro(e.target.value)}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup3.neighborhood}
                            <span className="text-primaria">{" *"}</span>
                        </label>
                        <label className="text-red-500 text-xs">
                            {fieldErros?.bairro?.[0]}
                        </label>
                    </div>
                </div>

                {/* rua */}
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        className={`${fieldErros?.logradouro?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                        required
                        disabled={disabilitarInput}
                        value={props.logradouro}
                        onChange={(e) => props.setLogradouro(e.target.value)}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                        {signup3.street}
                        <span className="text-primaria">{" *"}</span>
                    </label>
                    <label className="text-red-500 text-xs">
                        {fieldErros?.logradouro?.[0]}
                    </label>
                </div>

                {/* numero & complemento */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="number"
                            className={`${fieldErros?.numero?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            onChange={(e) =>
                                props.setNumero(e.target.valueAsNumber)
                            }
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup3.number}
                            <span className="text-primaria">{" *"}</span>
                        </label>
                        <label className="text-red-500 text-xs">
                            {fieldErros?.numero?.[0]}
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            placeholder=" "
                            required
                            maxLength={18}
                            value={props.complemento}
                            onChange={(e) =>
                                props.setComplemento(e.target.value)
                            }
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            {signup3.complement}
                        </label>
                    </div>
                </div>
            </form>
        </>
    );
}
