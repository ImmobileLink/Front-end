"use client";

import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import Loading from "@/app/[lang]/(components)/(auth)/Loading";
import { _UFs } from "@/../../lib/utils/getRegiao"
import { useProfileStore } from "../../../../../../../../../lib/store/profileStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../../lib/database.types";
import { adicionarEspecialidade, removerEspecialidade } from "../../../../../../../../../lib/utils/EditProfile";
import { useProfileContext } from "../../../Provider/ProviderProfile";

interface EditEspecialidades {
    props: any;
    imoveis: { id: any; descricao: any }[] | null;
}


export default function EditEspecialidades({ props, imoveis }: EditEspecialidades) {

    const [especialidade, setEspecialidade] = useState<{ id: any, descricao: string }[] | null>([]);
    const [especialidadesIncluidas, setEspecialidadesIncluidas] = useState<string[]>([]);
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)

    const state = useProfileStore.getState()

    const { especialidades, setEspecialidades } = useProfileContext();


    useEffect(() => {
        const fetchData = async () => {
           
            if (especialidades) {
                setEspecialidade(especialidades)
                especialidades.forEach((item) => {
                    setEspecialidadesIncluidas((prev) => [...prev, item.id])
                })
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setEspecialidades(especialidade);
        console.log(especialidade)
    }, [especialidade])

    const addEspecialidade = async (id: any, descricao: any) => {

        if (!especialidadesIncluidas.includes(id)) {
            const prevEspecialidade = [...especialidade!];
            const prevEspecialidadesIncluidas = [...especialidadesIncluidas];
            setEspecialidade((prev) => [
                ...prev!,
                { id: id, descricao: descricao },
            ]);
            setEspecialidadesIncluidas((prev) => [...prev, id]);
            const { error } = await adicionarEspecialidade(state.profileData?.id!, id)
            if (!error) {
                setSucess(true)
                props.setDropdownTipos(!props.dropdownTipos);
                setTimeout(() => {
                    setSucess(false)
                }, 3000);
            } else {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 3000);
                setEspecialidade(prevEspecialidade);
                setEspecialidadesIncluidas(prevEspecialidadesIncluidas);
            }
        }
    };

    const removeEspecialidade = async (id: any) => {
        const prevEspecialidade = [...especialidade!];
        const prevEspecialidadesIncluidas = [...especialidadesIncluidas];

        setEspecialidade((prev) => prev!.filter((item) => item.id !== id));
        setEspecialidadesIncluidas((prev) => prev.filter((item) => item !== id));

        const { error } = await removerEspecialidade(state.profileData?.id!, id);

        if (!error) {
            setSucess(true);
            setTimeout(() => {
                setSucess(false);
            }, 3000);
            setEspecialidades(especialidade);
        } else {
            setEspecialidade(prevEspecialidade);
            setEspecialidadesIncluidas(prevEspecialidadesIncluidas);
        }
    };

    return (
        <>
            <div>

                {/* ESPECIALIDADE */}

                <div className="relative w-full mb-6 group">
                    <label className="font-medium text-gray-500 dark:text-gray-400">
                        Especialidade
                    </label>
                    <div className="mt-3 ring-2 ring-gray-300 dark:ring-gray-500 rounded-s-lg p-2 h-fit max-h-36 overflow-y-scroll">
                        <AiFillPlusCircle
                            className="absolute text-xl right-3 hover:cursor-pointer hover:scale-110"
                            onClick={() => {
                                props.setDropdownTipos(!props.dropdownTipos);
                                props.setDropdownRegiao(false);
                            }}
                        />

                        <div
                            className={
                                especialidadesIncluidas.length > 0
                                    ? `flex pr-8 flex-wrap gap-2`
                                    : `flex pr-8 flex-wrap gap-2 h-5`
                            }
                        >
                            {especialidade?.map((item) => (
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

                    {props.dropdownTipos && (
                        <ul className="z-40 relative lg:absolute w-full lg:w-60 h-48 overflow-y-scroll mt-1 bg-white ring-1 ring-gray-500 rounded-sm text-black">
                            {imoveis?.map((item) => (
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
                    )}
                    {sucess && <p className="text-green-500 text-xs mt-1">Especialidade atualizada!</p>}
                    {error && <p className="text-red-500 text-xs mt-1">Falha ao atualizar especialidades</p>}
                </div>

            </div>
        </>
    );
}
