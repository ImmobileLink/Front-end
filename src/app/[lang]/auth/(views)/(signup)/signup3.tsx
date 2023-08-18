"use client";

import { Signup3 } from "@/app/i18n/dictionaries/types";
import InputMask from "react-input-mask";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
    fieldErros: { [k: string]: any };
    signup3: Signup3;
}

export default function Signup3({
    props,
    tipoPerfil,
    setPodeAvancar,
    setAlert,
    fieldErros,
    signup3,
}: Signup3Props) {
    const [disabilitarInput, isDisabilitarInput] = useState(false);

    /**
     * TO DO:
     * Remover TODOS onBlur
     * Remover o "pode avançar", não é necessário.
     * Ajustar validações do assignError
     * Ajustar todas mensagens e conteineres coloridos com erro
     * 
     */

    const validaForm = () => {
        setPodeAvancar(false);

        if (tipoPerfil == 1) {
            if (props.nome == "") {
                return false;
            }

            if (props.cpf == "") {
                return false;
            }
        } else {
            if (props.nomeFantasia == "") {
                return false;
            }

            if (props.cnpj == "") {
                return false;
            }
        }

        if (props.cep.length != 8) {
            return false;
        }

        if (!props.cepValid) {
            return false;
        }

        setPodeAvancar(true);
    };

    const autoCompletaEndereco = async () => {
        isDisabilitarInput(false);
        if (props.cep != "") {
            const regexCep = /^\d{8}$/;
            if (!regexCep.test(props.cep)) {
                setAlert({
                    type: "warning",
                    title: "",
                    message: signup3.logs.invalidcep,
                });
                props.isCepValid(false);
            } else {
                const res = await fetch(
                    `https://viacep.com.br/ws/${props.cep}/json/`
                );
                const data = await res.json();

                if (!data.erro) {
                    props.setEstado(data.uf);
                    props.setCidade(data.localidade);
                    props.setBairro(data.bairro);
                    props.setLogradouro(data.logradouro);
                    props.setComplemento(data.complemento);

                    setAlert({
                        type: "warning",
                        title: "",
                        message: "",
                    });
                    props.isCepValid(true);
                    isDisabilitarInput(true);
                } else {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup3.logs.invalidcepnotfound,
                    });
                    props.setEstado("");
                    props.setCidade("");
                    props.setBairro("");
                    props.setLogradouro("");
                    props.setComplemento("");
                    props.isCepValid(false);
                    isDisabilitarInput(false);
                }
            }
        }
    };

    useEffect(() => {
        isDisabilitarInput(false);
        if (props.cep.length != 8 && props.cep != "") {
            setAlert({
                type: "warning",
                title: "",
                message: signup3.logs.invalidcep,
            });
        } else {
            setAlert({
                type: "warning",
                title: "",
                message: "",
            });
            if (props.cep != "") {
                const regexCep = /^\d{8}$/;
                if (!regexCep.test(props.cep)) {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: signup3.logs.invalidcep,
                    });
                } else {
                    setAlert({
                        type: "warning",
                        title: "",
                        message: "",
                    });
                    autoCompletaEndereco();
                }
            }
        }
    }, [props.cep]);

    const _UFs = [
        "UF",
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
    ];

    const handleUFChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value != "UF") {
            props.setEstado(value);
        } else {
            props.setEstado("");
        }
    };
    // console.log(fieldErros)

    return (
        <>
            <form className=" sm:mx-auto sm:w-full sm:max-w-sm">
                {/* os dados que diferem de um corretor pra uma empresa */}
                {tipoPerfil == 1 ? (
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                autoFocus
                                value={props.nome}
                                onChange={(e) => props.setNome(e.target.value)}
                                onBlur={validaForm}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                    value={props.cpf}
                                    onChange={(e) =>
                                        props.setCpf(
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                    onBlur={validaForm}
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                    value={props.cnpj}
                                    onChange={(e) =>
                                        props.setCnpj(
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                    onBlur={validaForm}
                                />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    {signup3.cnpj}
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                autoFocus
                                value={props.nomeFantasia}
                                onChange={(e) =>
                                    props.setNomeFantasia(e.target.value)
                                }
                                onBlur={validaForm}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {signup3.fantasyname}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <InputMask
                                type="text"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                mask="99.999.999/9999-99"
                                required
                                value={props.cnpj}
                                onChange={(e) =>
                                    props.setCnpj(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                onBlur={validaForm}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {signup3.cnpj}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* celular & telefone */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <InputMask
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            mask="(99) 99999-9999"
                            value={props.celular}
                            onChange={(e) =>
                                props.setCelular(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            onBlur={validaForm}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {signup3.phone1}
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <InputMask
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            mask="(99) 9999-9999"
                            value={props.telefone}
                            onChange={(e) =>
                                props.setTelefone(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            onBlur={validaForm}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {signup3.phone2}
                        </label>
                    </div>
                </div>

                {/* comercial & { cep & UF } */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <InputMask
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            mask="(99) 9999-9999"
                            value={props.comercial}
                            onChange={(e) =>
                                props.setComercial(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            onBlur={validaForm}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {signup3.phone3}
                        </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <InputMask
                                type="text"
                                mask="99999-999"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={props.cep}
                                onChange={(e) =>
                                    props.setCep(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                onBlur={autoCompletaEndereco}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {signup3.cep}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                        </div>
                        <div className="z-0 group ">
                            <label className="text-sm text-gray-500 dark:text-gray-400">
                                {signup3.uf}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                            <select
                                className="bg-dark-200 mb-1"
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

                {/* cidade & bairro */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            className="disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={props.cidade}
                            disabled={disabilitarInput}
                            onChange={(e) => props.setCidade(e.target.value)}
                            onBlur={validaForm}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {signup3.city}
                            <span className="text-primaria">{" *"}</span>
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            className="disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            maxLength={11}
                            disabled={disabilitarInput}
                            value={props.bairro}
                            onChange={(e) => props.setBairro(e.target.value)}
                            onBlur={validaForm}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {signup3.neighborhood}
                            <span className="text-primaria">{" *"}</span>
                        </label>
                    </div>
                </div>

                {/* rua */}
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        className="disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        disabled={disabilitarInput}
                        value={props.logradouro}
                        onChange={(e) => props.setLogradouro(e.target.value)}
                        onBlur={validaForm}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {signup3.street}
                        <span className="text-primaria">{" *"}</span>
                    </label>
                </div>

                {/* numero & complemento */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="number"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            onChange={(e) =>
                                props.setNumero(e.target.valueAsNumber)
                            }
                            onBlur={validaForm}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {signup3.number}
                            <span className="text-primaria">{" *"}</span>
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            maxLength={18}
                            value={props.complemento}
                            onChange={(e) =>
                                props.setComplemento(e.target.value)
                            }
                            onBlur={validaForm}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {signup3.complement}
                        </label>
                    </div>
                </div>
            </form>
        </>
    );
}
