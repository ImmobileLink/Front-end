"use client";
import { Feed } from "@/app/i18n/dictionaries/types";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { City, PublicacaoCompleta } from "../../../../../lib/modelos";
import { _UFs, fetchCitiesAPI } from "../../../../../lib/utils/externalApis";
import PostItem from "./PostItem";
import ModalExcluir from "./ModalExcluir";
import { getPublicacoesSalvasAPI, getPublicacoesSalvasPorEstadoAPI, getPublicacoesSalvasPorEstadoCidadeAPI } from "../feedUtils";
import { clientSupabase } from "lib/utils/clientSupabase";

interface PostListProps {
    textos: Feed;
    idusuario?: string;
    profile?: boolean;
    salvo?: boolean;
}

// const supabase = createServerComponentClient<Database>({ cookies });
const supabase = clientSupabase();

export default function PostList({ idusuario, textos, profile, salvo }: PostListProps) {
    const [selectedState, setSelectedState] = useState<string>("");
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");

    const [filter, setFilter] = useState<number>(0);

    const [posts, setPosts] = useState<PublicacaoCompleta[]>([]);
    const [erro, setErro] = useState(false);
    const [logErro, setLogErro] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [newPost, setNewPost] = useState<PublicacaoCompleta>();
    const [deletePost, setDeletePost] = useState(false);
    const [pubid, setPubid] = useState("");

    //atualiza o select das cidades quando muda o estado
    useEffect(() => {
        async function fetchCities() {
            if (selectedState) {
                const citiesData = await fetchCitiesAPI(selectedState)
                if (citiesData) {
                    setCities(citiesData);
                    setSelectedCity("");
                }
            } else {
                setCities([]);
            }
        }
        fetchCities();
    }, [selectedState]);

    useEffect(() => {
        if (!profile) {
            getPosts(filter, selectedState, selectedCity);
        } else {
            if (salvo) {
                getPostsSalvoProfile(filter, selectedState, selectedCity,)
            } else {
                getPostsProfile(filter, selectedState, selectedCity,)
            }
        }
    }, [filter, selectedState, selectedCity]);

    const getPosts = async (
        filter: number,
        selectedState?: string,
        selectedCity?: string
    ) => {
        switch (filter) {
            case 0:
                //resetar parametros de cidade e estado
                setSelectedState("");
                setSelectedCity("");

                //atualiza spinner
                setLoading(true);

                //faz consulta ao bd
                {
                    const data = await getPublicacoesSalvasAPI(idusuario, supabase)
                    //atualiza o estado dos posts
                    //se retornar 1+ posts mapeia na tela
                    if (data) {
                        if (data.length > 0) {
                            setPosts(data!);
                            //tira o log de erro
                            setErro(false);
                            // se não mostra log
                        } else {
                            setErro(true);
                            setLogErro(textos.pub.noposts);
                            setPosts([]);
                        }
                    }
                }
                setLoading(false);
                break;
            case 1:
                //resetar parametros de cidade
                setSelectedCity("");

                //atualiza spinner
                setLoading(true);

                //verifica se tem algum estado selecionado
                if (selectedState != "") {
                    if (selectedState) {
                        //faz consulta ao bd
                        let data = await getPublicacoesSalvasPorEstadoAPI(idusuario, selectedState, supabase)
                        //atualiza o estado dos posts
                        //se retornar 1+ posts mapeia na tela
                        if (data) {
                            if (data!.length > 0) {
                                setPosts(data!);
                                //tira o log de erro
                                setErro(false);
                                // se não mostra log
                            } else {
                                setErro(true);
                                setLogErro(textos.pub.noposts);
                                setPosts([]);
                            }
                        }
                    }
                } else {
                    //mostra na tela que precisa selecionar um estado
                    setErro(true);
                    setLogErro(textos.pub.selectaregion);
                    //limpa o estado dos posts
                    setPosts([]);
                }

                setLoading(false);
                break;
            case 2:
                //atualiza spinner
                setLoading(true);

                //verifica se tem algum estado/cidade selecionados
                if (selectedState != "" && selectedCity != "") {
                    if (selectedState && selectedCity) {
                        let data = await getPublicacoesSalvasPorEstadoCidadeAPI(idusuario, selectedCity, selectedState, supabase);
                        //atualiza o estado dos posts
                        //se retornar 1+ posts mapeia na tela
                        if (data) {
                            if (data!.length > 0) {
                                setPosts(data!);
                                //tira o log de erro
                                setErro(false);
                                // se não mostra log
                            } else {
                                setErro(true);
                                setLogErro(textos.pub.noposts);
                                setPosts([]);
                            }
                        }
                    }
                    //faz consulta ao bd
                } else {
                    //mostra na tela que precisa selecionar um estado
                    setErro(true);
                    setLogErro(textos.pub.selectaregion);
                    //limpa o estado dos posts
                    setPosts([]);
                }
                setLoading(false);
                break;

            default:
                break;
        }
    };

    const getPostsProfile = async (
        filter: number,
        selectedState?: string,
        selectedCity?: string,
    ) => {
        switch (filter) {
            case 0:
                //resetar parametros de cidade e estado
                setSelectedState("");
                setSelectedCity("");

                //atualiza spinner
                setLoading(true);

                //faz consulta ao bd
                {
                    let response = await supabase
                        .rpc("get_publicacoes_salvas", {
                            idusuario: idusuario!,
                        })
                        .order("atualizadoem", { ascending: false })
                        .eq('idautor', idusuario!)
                        .limit(10);
                    let { data, error } = response;
                    if (error) {
                        setLoading(false);

                        setLogErro(textos.pub.tryagainlater);
                    }

                    //atualiza o estado dos posts
                    //se retornar 1+ posts mapeia na tela
                    if (data!.length > 0) {
                        setPosts(data!);
                        //tira o log de erro
                        setErro(false);
                        // se não mostra log
                    } else {
                        setErro(true);
                        setLogErro(textos.pub.noposts);
                        setPosts([]);
                    }
                }

                setLoading(false);
                break;
            case 1:
                //resetar parametros de cidade
                setSelectedCity("");

                //atualiza spinner
                setLoading(true);

                //verifica se tem algum estado selecionado
                if (selectedState != "") {
                    //faz consulta ao bd
                    let response = await supabase
                        .rpc("get_publicacoes_salvas", {
                            idusuario: idusuario!,
                        })
                        .contains("regiao", { estado: selectedState! })
                        .order("atualizadoem", { ascending: false })
                        .eq('idautor', idusuario!)
                        .limit(10);
                    let { data, error } = response;
                    if (error) {
                        setLoading(false);
                        setLogErro(textos.pub.tryagainlater);
                    }

                    if (data!.length > 0) {
                        setPosts(data!);
                        setErro(false);
                    } else {
                        setErro(true);
                        setLogErro(textos.pub.noposts);
                        setPosts([]);
                    }
                } else {
                    //mostra na tela que precisa selecionar um estado
                    setErro(true);
                    setLogErro(textos.pub.selectaregion);
                    //limpa o estado dos posts
                    setPosts([]);
                }

                setLoading(false);
                break;
            case 2:
                //atualiza spinner
                setLoading(true);

                //verifica se tem algum estado/cidade selecionados
                if (selectedState != "" && selectedCity != "") {
                    if (selectedState && selectedCity) {
                        let data = await getPublicacoesSalvasPorEstadoCidadeAPI(idusuario, selectedCity, selectedState, supabase);
                        //atualiza o estado dos posts
                        //se retornar 1+ posts mapeia na tela
                        if (data) {
                            if (data!.length > 0) {
                                setPosts(data!);
                                //tira o log de erro
                                setErro(false);
                                // se não mostra log
                            } else {
                                setErro(true);
                                setLogErro(textos.pub.noposts);
                                setPosts([]);
                            }
                        }
                    }
                    //faz consulta ao bd
                    let response = await supabase
                        .rpc("get_publicacoes_salvas", { idusuario: idusuario! })
                        .eq("issalvo", true)
                        .order("atualizadoem", { ascending: false })
                        .limit(10);

                    let { data, error } = response;
                    if (error) {
                        setLoading(false);
                        setLogErro(textos.pub.tryagainlater);
                    }

                    //atualiza o estado dos posts
                    //se retornar 1+ posts mapeia na tela
                    if (data!.length > 0) {
                        setPosts(data!);
                        //tira o log de erro
                        setErro(false);
                        // se não mostra log
                    } else {
                        setErro(true);
                        setLogErro(textos.pub.noposts);
                        setPosts([]);
                    }
                } else {
                    //mostra na tela que precisa selecionar um estado
                    setErro(true);
                    setLogErro(textos.pub.selectaregion);
                    //limpa o estado dos posts
                    setPosts([]);
                }

                setLoading(false);
                break;

            default:
                break;
        }
    };

    return (
        <>
            <div className="w-full md:flex inline-table md:justify-between my-4 md:my-0 md:h-12 align-middle place-self-center">
                <div className="flex items-center h-full">
                    <div className="w-20 text-sm font-medium">
                        {textos.pub.regionfilter}
                    </div>
                    <select
                        defaultValue={0}
                        onChange={(e) => {
                            setFilter(parseInt(e.target.value));
                        }}
                        className="h-full block py-1 px-0 w-24 text-sm text-gray-500 bg-transparent border-0 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer hover:cursor-pointer"
                    >
                        <option value={0}>
                            {textos.pub.regioncomboboxplaceholder}
                        </option>
                        <option value={1}>
                            {textos.form.cityselector.estate}
                        </option>
                        <option value={2}>
                            {textos.form.cityselector.city}
                        </option>
                    </select>
                </div>

                <hr className="w-full hidden md:block my-2 mx-4 md:my-6 border-1 border-gray-400"></hr>

                <div className="w-fit flex justify-center align-middle">
                    {filter != 0 && (
                        <>
                            <select
                                defaultValue={textos.form.cityselector.estate}
                                onChange={(e) => {
                                    setSelectedState(e.target.value);
                                    console.log(e.target.value)
                                    console.log(selectedState)
                                }}
                                className="block py-1 px-0 w-20 mr-4 text-sm text-gray-500 bg-transparent border-0 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer hover:cursor-pointer"
                            >
                                <option
                                    key={textos.form.cityselector.estate}
                                    disabled
                                >
                                    {textos.form.cityselector.estate}
                                </option>
                                {_UFs.map((item, index) => {
                                    return <option key={index}>{item}</option>;
                                })}
                            </select>
                            {filter != 1 && (
                                <select
                                    defaultValue={
                                        textos.form.cityselector
                                            .selectaestatefirst
                                    }
                                    onChange={(e) => {
                                        setSelectedCity(e.target.value);
                                    }}
                                    className="block py-1 px-0 w-44 text-sm text-gray-500 bg-transparent border-0 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer hover:cursor-pointer"
                                >
                                    <option
                                        value={
                                            textos.form.cityselector
                                                .selectaestatefirst
                                        }
                                        disabled
                                    >
                                        {
                                            textos.form.cityselector
                                                .selectaestatefirst
                                        }
                                    </option>
                                    {selectedState &&
                                        cities.map((city, index) => (
                                            <option
                                                className="px-2 cursor-pointer hover:bg-gray-200"
                                                key={index}
                                                value={city.nome}
                                            >
                                                {city.nome}
                                            </option>
                                        ))}
                                </select>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div>
                {loading ? (
                    <div className="w-full flex items-center justify-center">
                        <Spinner className="w-10 h-auto" />
                    </div>
                ) : (
                    <>
                        {erro && (
                            <p className="flex justify-center">{logErro}</p>
                        )}
                        {posts!.map((item: PublicacaoCompleta) => {
                            return (
                                <PostItem
                                    dict={textos}
                                    idusuario={idusuario}
                                    key={item.id}
                                    publicacao={item}
                                    setDeletePost={setDeletePost}
                                    setPubid={setPubid}
                                />
                            );
                        })}
                    </>
                )}
            </div>
            {deletePost ? (
                <ModalExcluir
                    setDeletePost={setDeletePost}
                    id={pubid}
                    dict={textos}
                />
            ) : (
                <></>
            )}
        </>
    );
}
