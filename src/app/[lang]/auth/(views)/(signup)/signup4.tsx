"use client";

import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import InputMask from "react-input-mask";
import { Signup4 } from "@/app/i18n/dictionaries/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loading from "@/app/[lang]/(components)/(auth)/Loading";
import { _UFs } from "../../../../../../lib/utils/externalApis";
import { stringify } from 'querystring';
import { fetchCitiesAPI } from "../../../../../../lib/utils/externalApis";

interface Signup4Props {
    props: {
        creci: string;
        setCreci: Dispatch<SetStateAction<string>>;
        especialidade: { id: any; descricao: any }[];
        setEspecialidade: Dispatch<
            SetStateAction<{ id: any; descricao: any }[]>
        >;
        regiaoAtuacao: { estado: string, cidade: string }[];
        setRegiaoAtuacao: Dispatch<SetStateAction<{ estado: string, cidade: string }[]>>;
        especialidadesIncluidas: string[];
        setEspecialidadesIncluidas: Dispatch<SetStateAction<string[]>>;
        regioesIncluidas: { estado: string, cidade: string }[];
        setRegioesIncluidas: Dispatch<SetStateAction<{ estado: string, cidade: string }[]>>;
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
    fieldErros: { [k: string]: any };
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
    fieldErros,
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
                setLoading(true)
                const result = await fetchCitiesAPI(selectedState)
                if (result) {
                    setCities(result);
                }
                else {
                    console.error(signup4.logs.uferror);
                }
                setLoading(false)
            } else {
                setCities([]);
            }
        }

        fetchCities();
    }, [selectedState, signup4.logs.uferror]);

    const addRegiao = ({ estado, cidade }: { estado: string, cidade: string }) => {
        if (!props.regioesIncluidas.some(item => item.estado === estado && item.cidade === cidade)) {
            props.setRegiaoAtuacao((prev) => [
                ...prev,
                { estado: estado, cidade: cidade },
            ]);
            props.setRegioesIncluidas((prev) => [...prev, { estado: estado, cidade: cidade }]);
        }
    };

    const removeRegiao = ({ estado, cidade }: { estado: string, cidade: string }) => {
        props.setRegiaoAtuacao((prev) => prev.filter((item) => (item.cidade !== cidade || item.estado !== estado)));
        props.setRegioesIncluidas((prev) => prev.filter((item) => (item.cidade !== cidade || item.estado !== estado)));
    };

    return (
        <>
            <form className="sm:mx-auto sm:w-full sm:max-w-sm">
                {tipoPerfil == 1 ? (
                    <div>
                        <div className="relative z-0 w-full mb-6 group">
                            <InputMask
                                mask="999999-a"
                                className={`${fieldErros?.creci?.[0] != undefined ? "bg-red-500/50" : "bg-transparent"} block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                required

                                value={props.creci}
                                onChange={(e) =>
                                    props.setCreci(
                                        e.target.value.replace("-", "")
                                    )
                                }
                                onBlur={validaForm}
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                                {signup4.creci}
                                <span className="text-primaria">{" *"}</span>
                            </label>
                            <label className="text-red-500 text-xs">
                                {fieldErros?.creci?.[0]}
                            </label>
                        </div>

                        {/* ESPECIALIDADE */}

                        <div className="relative w-full mb-6 group">
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
                                    className="bg-branco dark:bg-dark-200 mb-1 w-16 mx-1"
                                    onChange={(e) => { setSelectedState(e.target.value); }}
                                    onClick={e => {
                                        setDropdownRegiao(false);
                                        setDropdownTipos(false);
                                    }}
                                >
                                    <option value="" disabled>{signup4.cityselector.ufacronim}</option>
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
                                        key={item.cidade}
                                    >
                                        {item.estado + " - " + item.cidade}
                                        <AiFillCloseCircle
                                            className="text-lg ml-2 self-center hover:cursor-pointer hover:scale-110"
                                            onClick={(e) =>
                                                removeRegiao({ estado: item.estado, cidade: item.cidade })
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
                                                key={selectedState + city.nome}
                                                value={city.nome}
                                                onClick={(e) =>
                                                    addRegiao({ estado: selectedState, cidade: city.nome })
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
