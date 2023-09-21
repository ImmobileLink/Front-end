"use client"
import { Pesquisa } from "@/app/i18n/dictionaries/types";
import { FormEvent, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { TipoImovel, CorretorBuscado, City, CorporacaoBuscada } from "../../../../../lib/modelos";
import { _UF_converter, _UFs } from "../../../../../lib/utils/getRegiao";
import { Card } from "../../(components)/(compositions)/(card)";

interface PesquisaCardProps {
  textos: Pesquisa,
  tipoImovel: TipoImovel[] | null
}

type imovelType = {
  classificacao: string | null;
  descricao: string;
  id: string;
}

type filterType = {
  tipoUsuario: string;
  estado: string;
  cidade: string;
  avaliacao: string;
  tipo: imovelType[];
  mobilia: imovelType[];
  condicao: imovelType[];
  outros: imovelType[];
}

const supabase = createClientComponentClient<Database>()

export default function PesquisaCard({ textos, tipoImovel }: PesquisaCardProps) {
  //Estados dos combo box, usados para fazer a pesquisa
  const [filters, setFilters] = useState<filterType>({
    tipoUsuario: 'corretor',
    estado: '*',
    cidade: '*',
    avaliacao: '*',
    tipo: [],
    mobilia: [],
    condicao: [],
    outros: []
  })

  //array de cidades vindo da api do ibge
  const [cities, setCities] = useState<City[]>([]);

  //States relacionados aos resultados
  const [corretores, setCorretores] = useState<CorretorBuscado[] | null>([]);
  const [corporacoes, setCorporacoes] = useState<CorporacaoBuscada[] | null>([]);

  //loading
  const [loading, setLoading] = useState<boolean>(false);

  //mais filtros
  const [showMore, setShowMore] = useState<boolean>(false);

  //erros
  const [erro, setErro] = useState<boolean>(false);
  const [logErro, setLogErro] = useState<string>('');

  useEffect(() => {
    async function fetchCities() {
      if (filters.estado) {
        try {
          setLoading(true)
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${filters.estado}/municipios`);
          const citiesData = await response.json();
          setCities(citiesData);
          setLoading(false)
        } catch (error) {
          console.error(error);
        }
      } else {
        setCities([]);
      }
    }

    if (filters.estado != '*') {
      fetchCities();
    } else {
      setCities([]);
    }
  }, [filters.estado]);


  const handleChangeTipoUsuario = (tipoUsuario: string) => {
    setFilters((prev) => ({ ...prev, tipoUsuario: tipoUsuario, avaliacao: "*", tipo: [], condicao: [], mobilia: [], outros: [] }));
  }

  const handleRedefinirFiltros = () => {
    setShowMore(false);
    setFilters((prev) => ({ ...prev, tipoUsuario: "corretor", estado: "*", cidade: "*", avaliacao: "*", tipo: [], condicao: [], mobilia: [], outros: [] }));
  }

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(filters, null, 2))
  }

  const handleAddTipo = (item: imovelType) => {
    if (filters.tipo.includes(item)) {
      setFilters((prev) => ({
        ...prev,
        tipo: prev.tipo.filter((items) => items !== item),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        tipo: [...prev.tipo, item]
      }))
    }
  }

  const handleAddMobilia = (item: imovelType) => {
    if (filters.mobilia.includes(item)) {
      setFilters((prev) => ({
        ...prev,
        mobilia: prev.mobilia.filter((items) => items !== item),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        mobilia: [...prev.mobilia, item]
      }))
    }
  }

  const handleAddCondicao = (item: imovelType) => {
    if (filters.condicao.includes(item)) {
      setFilters((prev) => ({
        ...prev,
        condicao: prev.condicao.filter((items) => items !== item),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        condicao: [...prev.condicao, item]
      }))
    }
  }

  const handleAddOutros = (item: imovelType) => {
    if (filters.outros.includes(item)) {
      setFilters((prev) => ({
        ...prev,
        outros: prev.outros.filter((items) => items !== item),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        outros: [...prev.outros, item]
      }))
    }
  }

  return (
    <>
      <Card.Root>
        <Card.Title title={textos.labels.title} />
        <Card.Content>
          <form onSubmit={e => { handleSubmitSearch(e) }} className="flex flex-col space-y-2 px-4">
            {/* tipoUsuario */}
            <div className="w-full flex justify-around">
              <div onClick={e => handleChangeTipoUsuario("corretor")}>
                <input type="radio" id="corretor" name="tipoUsuario" value="corretor" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="corretor" className="ml-2 font-medium text-gray-900 dark:text-gray-300">{textos.usertypevalue.broker}</label>
              </div>
              <div onClick={e => handleChangeTipoUsuario("corporacao")}>
                <input type="radio" id="corporacao" name="tipoUsuario" value="corporacao" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="corporacao" className="ml-2 font-medium text-gray-900 dark:text-gray-300">{textos.usertypevalue.corporation}</label>
              </div>
            </div>
            <div className="flex justify-center align-middle items-center">
              <hr className="w-2/3 h-0,5 mt-2 border-0 bg-gray-300 dark:bg-gray-700" />
            </div>
            {/* estado */}
            <div className="w-full flex flex-col justify-around">
              <label>{textos.labels.state}</label>
              <select defaultValue={'*'} onChange={e => { setFilters(prev => ({ ...prev, estado: e.target.value })) }} className="block w-full p-2.5 bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={'*'}>*</option>
                {
                  _UFs.map((item, index) => {
                    return (
                      <option value={item} key={index}>{_UF_converter[item]}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="flex justify-center align-middle items-center">
              <hr className="w-2/3 h-0,5 mt-2 border-0 bg-gray-300 dark:bg-gray-700" />
            </div>
            {/* cidade */}
            <div className="w-full flex flex-col justify-around">
              <label>{textos.labels.city}:</label>
              <select defaultValue={""} onChange={e => { setFilters(prev => ({ ...prev, cidade: e.target.value })) }} className="block w-full p-2.5 bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">*</option>
                {
                  filters.estado ? (
                    cities.map((city, index) => (
                      <option
                        className="px-2 cursor-pointer hover:bg-gray-200"
                        key={index}
                        value={city.nome}
                      >{city.nome}</option>
                    ))
                  ) : (
                    <option value="" disabled>{textos.labels.selectaestatefirst}</option>
                  )
                }
              </select>
            </div>
            {
              filters.tipoUsuario == 'corretor' && (
                <>
                  <div className="flex justify-center align-middle items-center">
                    <hr className="w-2/3 h-0,5 mt-2 border-0 bg-gray-300 dark:bg-gray-700" />
                  </div>
                  {/* avaliacao */}
                  <div className="w-full flex flex-col justify-around">
                    <label className="mr-4">{textos.labels.rating}:</label>
                    <select id="avaliacao-select" defaultValue={'*'} onChange={(e) => { setFilters(prev => ({ ...prev, avaliacao: e.target.value })) }} className="block w-full p-2.5 bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={"*"}>*</option>
                      <option value={"1"}>1+</option>
                      <option value={"2"}>2+</option>
                      <option value={"3"}>3+</option>
                      <option value={"4"}>4+</option>
                      <option value={"5"}>5</option>
                    </select>
                  </div>
                  {
                    showMore ? (
                      <>
                        <div className="flex justify-center align-middle items-center">
                          <hr className="w-2/3 h-0,5 mt-2 border-0 bg-gray-300 dark:bg-gray-700" />
                        </div>
                        {/* tipo */}
                        <label>{textos.labels.specializations}</label>
                        <div className="w-full flex flex-col justify-around">
                          <label className="text-center">{textos.labels.type}</label>
                          <div className="flex flex-wrap max-h-16 overflow-y-scroll mt-2">
                            {
                              tipoImovel?.map((item, index) => {
                                if (item.classificacao == "Tipo") {
                                  return (
                                    <div key={index} className="flex w-1/2 items-center mb-4">
                                      <input onClick={e => handleAddTipo(item)} type="checkbox" name={item.id} id={item.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                      <p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">{item.descricao}</p>
                                    </div>
                                  )
                                }
                              })
                            }
                          </div>
                        </div>
                        {/* mobilia */}
                        <div className="w-full flex flex-col justify-around">
                          <label className="text-center">{textos.labels.furniture}</label>
                          <div className="flex flex-wrap max-h-16 overflow-y-scroll mt-2">
                            {
                              tipoImovel?.map((item, index) => {
                                if (item.classificacao == "Mobília") {
                                  return (
                                    <div key={index} className="flex w-1/2 items-center mb-4">
                                      <input onClick={e => handleAddMobilia(item)} type="checkbox" name={item.id} id={item.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                      <p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">{item.descricao}</p>
                                    </div>
                                  )
                                }
                              })
                            }
                          </div>
                        </div>
                        {/* condicao */}
                        <div className="w-full flex flex-col justify-around">
                          <label className="text-center">{textos.labels.condition}</label>
                          <div className="flex flex-wrap max-h-16 overflow-y-scroll mt-2">
                            {
                              tipoImovel?.map((item, index) => {
                                if (item.classificacao == "Condição") {
                                  return (
                                    <div key={index} className="flex w-1/2 items-center mb-4">
                                      <input onClick={e => handleAddCondicao(item)} type="checkbox" name={item.id} id={item.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                      <p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">{item.descricao}</p>
                                    </div>
                                  )
                                }
                              })
                            }
                          </div>
                        </div>
                        {/* outros */}
                        <div className="w-full flex flex-col justify-around">
                          <label className="text-center">{textos.labels.others}</label>
                          <div className="flex flex-wrap max-h-16 overflow-y-scroll mt-2">
                            {
                              tipoImovel?.map((item, index) => {
                                if (item.classificacao == "Outros") {
                                  return (
                                    <div key={index} className="flex w-1/2 items-center mb-4">
                                      <input onClick={e => handleAddOutros(item)} type="checkbox" name={item.id} id={item.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                      <p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">{item.descricao}</p>
                                    </div>
                                  )
                                }
                              })
                            }
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-center align-middle items-center py-3">
                        <div className="w-2/3 flex justify-center align-middle items-center gap-2">
                          <hr className="w-full h-0,5 border-0 bg-gray-300 dark:bg-gray-700" />
                          <div onClick={e => setShowMore(true)} className="w-fit h-full text-center text-xs text-gray-400 dark:text-gray-300 hover:font-semibold hover:cursor-pointer">
                            {textos.labels.advanced}
                          </div>
                          <hr className="w-full h-0,5 border-0 bg-gray-300 dark:bg-gray-700" />
                        </div>
                      </div>
                    )
                  }

                </>
              )
            }
            {/* onClick={consultaBd} */}
            <div className="flex flex-col-reverse w-full lg:flex-row justify-center items-center align-center m-auto">
              <button type="reset" onClick={handleRedefinirFiltros} className="flex p-2 cursor-pointer text-sm px-10 py-2.5 mb-1 hover:underline">
                {textos.labels.reset}
              </button>
              <button type="submit" className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">
                {textos.labels.search}
              </button>
            </div>
          </form>
        </Card.Content>
      </Card.Root>
    </>
  );
}