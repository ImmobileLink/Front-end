"use client";

import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import InputMask from "react-input-mask";
import { Signup4 } from "@/app/i18n/dictionaries/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CitySelector from '../../../(components)/CitySelector';
import Loading from "@/app/[lang]/(components)/(auth)/Loading";

interface Signup4Props {
    props: {
        creci: string;
        setCreci: Dispatch<SetStateAction<string>>;
        especialidade: { id: any; descricao: any }[];
        setEspecialidade: Dispatch<
            SetStateAction<{ id: any; descricao: any }[]>
        >;
        regiaoAtuacao: { regiao: any }[];
        setRegiaoAtuacao: Dispatch<SetStateAction<{ regiao: any }[]>>;
        especialidadesIncluidas: string[];
        setEspecialidadesIncluidas: Dispatch<SetStateAction<string[]>>;
        regioesIncluidas: string[];
        setRegioesIncluidas: Dispatch<SetStateAction<string[]>>;
    };
    tipoPerfil: number | undefined;
    setPodeAvancar: Dispatch<SetStateAction<boolean>>;
    setAlert: Dispatch<
        SetStateAction<{ type: string; title: string; message: string }>
    >;
    signup4: Signup4;
    data: {
        tipoImovel: { id: any; descricao: any }[] | null;
    };
}

interface City {
    id: number;
    nome: string;
}

export default function Signup4({
    props,
    tipoPerfil,
    setPodeAvancar,
    setAlert,
    signup4,
    data,
}: Signup4Props) {
    const [dropdownTipos, setDropdownTipos] = useState<boolean>(false); //vai reger esse dropdown de tipos de imóveis
    const [dropdownRegiao, setDropdownRegiao] = useState<boolean>(false); //vai reger esse dropdown de regioes de atuacao
    const [selectedState, setSelectedState] = useState<string>('');
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const validaForm = () => {
        setPodeAvancar(false);

        if (tipoPerfil == 1) {
            if (props.creci.length == 0) {
                return false;
            }
        }

        setPodeAvancar(true);
    };

    const _UFs = [
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

    const addEspecialidade = (id: any, descricao: any) => {
        if (!props.especialidadesIncluidas.includes(id)) {
            props.setEspecialidade((prev) => [
                ...prev,
                { id: id, descricao: descricao },
            ]);
            props.setEspecialidadesIncluidas((prev) => [...prev, id]);
        }
    };

    const removeEspecialidade = (id: any) => {
        props.setEspecialidade((prev) => prev.filter((item) => item.id !== id));
        props.setEspecialidadesIncluidas((prev) =>
            prev.filter((item) => item !== id)
        );
    };

    useEffect(() => {
        async function fetchCities() {
            if (selectedState) {
                try {
                    setLoading(true)
                    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`);
                    const citiesData = await response.json();
                    setCities(citiesData);
                    setLoading(false)
                } catch (error) {
                    console.error('Erro ao buscar municípios:', error);
                }
            } else {
                setCities([]);
            }
        }

        fetchCities();
    }, [selectedState]);

    const addRegiao = (regiao: string) => {
        if (!props.regioesIncluidas.includes(regiao)) {
            props.setRegiaoAtuacao((prev) => [
                ...prev,
                { regiao: regiao },
            ]);
            props.setRegioesIncluidas((prev) => [...prev, regiao]);
        }
    };

    const removeRegiao = (regiao: any) => {
        props.setRegiaoAtuacao((prev) => prev.filter((item) => item.regiao !== regiao));
        props.setRegioesIncluidas((prev) => prev.filter((item) => item !== regiao));
    };

    return (
        <>
            <form className="sm:mx-auto sm:w-full sm:max-w-sm">
                {tipoPerfil == 1 ? (
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <InputMask
                                mask="999999-a"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                                autoFocus
                                value={props.creci}
                                onChange={(e) =>
                                    props.setCreci(
                                        e.target.value.replace("-", "")
                                    )
                                }
                                onBlur={validaForm}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {signup4.creci}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                        </div>

                        {/* ESPECIALIDADE */}

                        <div
                            className="relative w-full mb-6 group"
                        >
                            <label className="font-medium text-gray-500 dark:text-gray-400">
                                {signup4.speciality}
                            </label>
                            <div className="mt-3 ring-2 ring-gray-300 dark:ring-gray-500 rounded-s-lg p-2 h-fit max-h-36 overflow-y-scroll">
                                <AiFillPlusCircle
                                    className="absolute text-xl right-3 hover:cursor-pointer hover:scale-110"
                                    onClick={() => {
                                        setDropdownTipos(!dropdownTipos);
                                        setDropdownRegiao(false);
                                    }}
                                />

                                <div
                                    className={
                                        props.especialidadesIncluidas.length > 0
                                            ? `flex pr-8 flex-wrap gap-2`
                                            : `flex pr-8 flex-wrap gap-2 h-5`
                                    }
                                >
                                    {props.especialidade?.map((item) => (
                                        <div
                                            className="flex bg-gray-500 dark:bg-gray-200 text-branco dark:text-black rounded-2xl px-2 w-fit"
                                            key={item.id}
                                        >
                                            {item.descricao}
                                            <AiFillCloseCircle
                                                className="text-lg ml-2 self-center hover:cursor-pointer hover:scale-110"
                                                onClick={(e) =>
                                                    removeEspecialidade(item.id)
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {dropdownTipos ? (
                                <ul className="z-40 relative lg:absolute w-full lg:w-60 h-48 overflow-y-scroll mt-1 lg:top-0 lg:-right-2/3 bg-white ring-1 ring-gray-500 rounded-sm text-black">
                                    {data.tipoImovel?.map((item) => (
                                        <li
                                            className="px-2 cursor-pointer hover:bg-gray-200"
                                            key={item.id}
                                            onClick={(e) =>
                                                addEspecialidade(
                                                    item.id,
                                                    item.descricao
                                                )
                                            }
                                        >
                                            {item.descricao}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                {/* REGIAO */}
                <div>
                    <div className="relative w-full mb-6 group">
                        <div className="flex justify-between">
                            <label className="font-medium text-gray-500 dark:text-gray-400">
                                {signup4.region}
                            </label>
                            <div className="">
                                <label className="text-sm text-gray-500 dark:text-gray-400">
                                    {signup4.cityselector.estate}
                                </label>
                                <select
                                    value={selectedState}
                                    className="bg-dark-200 mb-1 w-16"
                                    onChange={(e) => {setSelectedState(e.target.value);}}
                                    onClick={e => {
                                        setDropdownRegiao(false);
                                        setDropdownTipos(false);
                                    }}
                                >
                                    <option value=""  disabled>{signup4.cityselector.selectaestate}</option>
                                    {_UFs.map(uf => {
                                        return (
                                            <option
                                                key={uf}
                                                className="text-center"
                                            >
                                                {uf}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="mt-3 ring-2 ring-gray-300 dark:ring-gray-500 rounded-s-lg p-2 h-fit max-h-36 overflow-y-scroll">
                            <AiFillPlusCircle
                                className="absolute text-xl right-3 hover:cursor-pointer hover:scale-110"
                                onClick={(e) => {
                                    setDropdownRegiao(!dropdownRegiao);
                                    setDropdownTipos(false);
                                }}
                            />

                            <ul
                                className={
                                    props.regioesIncluidas.length > 0
                                        ? `flex pr-8 flex-wrap gap-2`
                                        : `flex pr-8 flex-wrap gap-2 h-5`
                                }
                            >
                                {props.regiaoAtuacao?.map((item) => (
                                    <li
                                        className="flex bg-gray-500 dark:bg-gray-200 text-branco dark:text-black rounded-2xl px-2 w-fit"
                                        key={item.regiao}
                                    >
                                        {item.regiao}
                                        <AiFillCloseCircle
                                            className="text-lg ml-2 self-center hover:cursor-pointer hover:scale-110"
                                            onClick={(e) =>
                                                removeRegiao(item.regiao)
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>


                        </div>
                        {dropdownRegiao ? (
                            <ul className="z-40 relative lg:absolute w-full lg:w-60 h-48 overflow-y-scroll mt-1 lg:top-0 lg:-right-2/3 bg-white ring-1 ring-gray-500 rounded-sm text-black">
                                <li>
                                    <Loading loading={loading} />
                                </li>
                                {selectedState ? (
                                    cities.length > 0 ? (
                                        cities.map(city => (
                                            <option 
                                            className="px-2 cursor-pointer hover:bg-gray-200"
                                            key={city.nome} 
                                            value={city.nome}
                                            onClick={(e) =>
                                                addRegiao(
                                                    city.nome
                                                )
                                            }
                                            >{city.nome}</option>
                                        ))
                                    ) : (
                                        <option value="" disabled>{signup4.cityselector.nocityfound}</option>
                                    )
                                ) : (
                                    <option value="" disabled>{signup4.cityselector.selectaestatefirst}</option>
                                )}
                            </ul>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </form>
        </>
    );
}
