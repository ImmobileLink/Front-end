"use client";

import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import Loading from "@/app/[lang]/(components)/(auth)/Loading";
import { _UFs } from "../../../../../../../../../lib/utils/getRegiao"
import { useProfileStore } from "../../../../../../../../../lib/store/profileStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../../lib/database.types";
import { useProfileContext } from "../../../context/ProfileContext";
import { adicionarRegiao, removerRegiao } from "../../../../../../../../../lib/utils/EditProfile";

interface EditEspecialidades {
    props: any;
}


interface City {
    id: number;
    nome: string;
}

export default function EditEspecialidades({ props }: EditEspecialidades) {

    const [selectedState, setSelectedState] = useState<string>('');
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const [sucess, setSucess] = useState<string | undefined>(undefined)

    const [regioesIncluidas, setRegioesIncluidas] = useState<{ cidade: string; estado: string; }[]>([]);


    const state = useProfileStore.getState()
    const signup4 = state.dict?.auth.signup.signup4!

    const { areasAtuacao, setAreasAtuacao } = useProfileContext();


    useEffect(() => {
        if (areasAtuacao) {
            areasAtuacao?.forEach((item) => {
                setRegioesIncluidas((prev) => [...prev, { estado: item.estado, cidade: item.cidade }]);
            })
        }
    }, [])

    useEffect(() => {
        setAreasAtuacao(regioesIncluidas)
    }, [regioesIncluidas])


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

    const addRegiao = async ({ estado, cidade }: { estado: string, cidade: string }) => {
        if (!regioesIncluidas.some(item => item.estado === estado && item.cidade === cidade)) {
            const { error } = await adicionarRegiao(state.profileData?.id!, { cidade, estado })
            if (!error) {
                props.setDropdownRegiao(!props.dropdownRegiao);
                setSucess("Regiões atualizadas!")
                setTimeout(() => {
                    setSucess(undefined)
                }, 3000);
                setRegioesIncluidas((prev) => [...prev, { estado: estado, cidade: cidade }]);
            } else {
                setError("Falha ao atualizar regiões")
                setTimeout(() => {
                    setError(undefined)
                }, 3000);
            }
        } else {
            props.setDropdownRegiao(!props.dropdownRegiao);
            setError("Região já incluida")
            setTimeout(() => {
                setError(undefined)
            }, 3000);
        }
    };

    const removeRegiao = async ({ estado, cidade }: { estado: string, cidade: string }) => {
        const { error } = await removerRegiao(state.profileData?.id!, { cidade, estado })
        if (!error) {
            setSucess("Regiões atualizadas!")
            setTimeout(() => {
                setSucess(undefined)
            }, 3000);
            setRegioesIncluidas((prev) => prev.filter((item) => (item.cidade !== cidade || item.estado !== estado)));
        } else {
            setError("Falha ao atualizar regiões")
            setTimeout(() => {
                setError(undefined)
            }, 3000);
        }
    };

    return (
        <>
            <form className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* REGIAO */}
                <div>
                    <div className="relative w-full mb-2 group">
                        <div className="flex justify-between">
                            <label className="text-gray-500 dark:text-gray-300">
                                {signup4.region}
                            </label>
                            <div className="">
                                <label className="text-sm text-gray-500 dark:text-gray-400">
                                    {signup4.cityselector.estate}
                                </label>
                                <select
                                    value={selectedState}
                                    className="bg-gray-300 dark:bg-dark-200 mb-1 w-16 mx-1"
                                    onChange={(e) => { setSelectedState(e.target.value); }}
                                    onClick={e => {
                                        props.setDropdownRegiao(false);
                                        props.setDropdownTipos(false);
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
                                    props.setDropdownRegiao(!props.dropdownRegiao);
                                    props.setDropdownTipos(false);
                                }}
                            />

                            <ul
                                className={
                                    regioesIncluidas.length > 0
                                        ? `flex pr-8 flex-wrap gap-2`
                                        : `flex pr-8 flex-wrap gap-2 h-5`
                                }
                            >
                                {regioesIncluidas?.map((item) => (
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
                        {props.dropdownRegiao && (
                            <ul className="z-40 relative lg:absolute w-full lg:w-60 h-48 overflow-y-scroll mt-1 bg-white ring-1 ring-gray-500 rounded-sm text-black">
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
                                        <option value="" disabled>Cidade não encontrada</option>
                                    )
                                ) : (
                                    <option value="" disabled>Selecione o estado primeiro</option>
                                )}
                            </ul>
                        )}
                    </div>
                    {sucess && <p className="text-green-500 text-xs mt-1">{sucess}</p>}
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
            </form>
        </>
    );
}
