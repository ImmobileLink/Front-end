"use client"
import { Pesquisa } from "@/app/i18n/dictionaries/types";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import UserCard from "./UserCard";
import { TipoImovel, CorretorBuscado, CorporacaoPorRegiao, City } from "../../../../../lib/modelos";
import { _UFs } from "../../../../../lib/utils/getRegiao";
import { Spinner } from "flowbite-react";
import { Card } from "../../(components)/(compositions)/(card)";

interface PesquisaCardProps {
  textos: Pesquisa,
  tipoImovel: TipoImovel[] | null
}
const supabase = createClientComponentClient<Database>()

export default function PesquisaCard({ textos, tipoImovel }: PesquisaCardProps) {
  //Estados dos combo box, usados para fazer a pesquisa
  const [filters, setFilters] = useState({
    userType: 'corretor',
    state: '*',
    city: '*',
    speciality: '*',
    rating: '*'
  })

  //array de cidades vindo da api do ibge
  const [cities, setCities] = useState<City[]>([]);

  //States relacionados aos resultados
  const [corretores, setCorretores] = useState<CorretorBuscado[] | null>([]);
  const [corporacoes, setCorporacoes] = useState<CorporacaoPorRegiao[] | null>([]);

  //loading
  const [loading, setLoading] = useState<boolean>(false);

  //erros
  const [erro, setErro] = useState<boolean>(false);
  const [logErro, setLogErro] = useState<string>('');

  //Faz a consulta do banco de dados baseado nos combo box selecionados
  const consultaBd = async () => {
    //Faz a conversão do combo box de avaliacao para números
    let avnum = 0;
    if (selectedRating != "*") {
      const av = selectedRating.substring(0, 1)
      try {
        avnum = parseInt(av)
      }
      catch (e) {
        console.log("Erro no Parse Int: " + e)
      }
    }
    //Se for um corretor
    if (selectedUserType == textos.usertypevalue.broker) {

      //Caso somente o estado seja selecionado e especialidade sejam selecionados
      if ((selectedState != '' || selectedCity != '') && selectedSpecialty.id != '') {

        const { data, error } = await supabase
          .rpc('get_corretores_avaliacao_regiao_tipoimovel', {
            idtipoimovel: selectedSpecialty.id,
            idregiao: selectedRegion.id,
            avaliacao: avnum
          })

        if (error) {
          console.log(error)
          setErro(error.toString())
          setCorretores([])
        }
        else {
          setErro('')
          setCorretores(data)
          setResultado(true)
        }
      }
      else {
        //Caso apenas especialidade seja selecionada
        if (selectedRegion.id == '' && selectedSpecialty.id != '') {
          const { data, error } = await supabase
            .rpc('get_corretores_avaliacao_tipoimovel', {
              idtipoimovel: selectedSpecialty.id,
              avaliacao: avnum
            })

          if (error) {
            console.log(error)
            setErro(error.toString())
            setCorretores([])
          }
          else {
            setErro('')
            setCorretores(data)
            setResultado(true)
          }
        }
        else {
          //Caso apenas região seja selecionada
          if (selectedRegion.id != '' && selectedSpecialty.id == '') {
            const { data, error } = await supabase
              .rpc('get_corretores_avaliacao_regiao', {
                idregiao: selectedRegion.id,
                avaliacao: avnum
              })

            if (error) {
              console.log(error)
              setErro(error.toString())
              setCorretores([])
            }
            else {
              setErro('')
              setCorretores(data)
              setResultado(true)
            }
          }
          else {
            //Caso nenhum seja selecionado
            const { data, error } = await supabase
              .rpc('get_corretores_avaliacao', {
                avaliacao: avnum
              })


            if (error) {
              console.log(error)
              setErro(error.toString())
              setCorretores([])
            }
            else {
              setErro('')
              setCorretores(data)
              setResultado(true)
            }
          }
        }
      }
    }
    //Se for uma corporação
    else {
      const { data, error } = await supabase
        .from('corporacao_por_regiao')
        .select('*')
        .eq('idregiao', selectedRegion.id)

      if (error) {
        console.log(error)
        setErro(error.message)
        setCorporacoes([])
      }
      else {
        setErro('')
        setCorporacoes(data)
        setResultado(true)
      }
    }
  }

  useEffect(() => {
    async function fetchCities() {
      if (filters.state) {
        try {
          setLoading(true)
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${filters.state}/municipios`);
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

    if (filters.state != '*') fetchCities();
  }, [filters.state]);

  return (
    <>
      {/* Combo Box Container */}
      <Card.Root>
        <Card.Title title={textos.labels.title} />
        <Card.Content>
          <div className="flex flex-col lg:flex-row m-auto justify-start space-x-10 p-5 bg-blue-500">
            <div className="flex-col m-4 items-start space-y-3 bg-red-500">
              {/* USER TYPE */}
              <div className="flex items-center m-3 space-x-4">
                <label className="mr-4">{textos.labels.usertype}:</label>
                <select className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => { setFilters(prev => ({ ...prev, userType: e.target.value })) }}>
                  <option value={'corretor'}>{textos.usertypevalue.broker}</option>
                  <option value={'corporacao'}>{textos.usertypevalue.corporation}</option>
                </select>
              </div>

              {/* TIPO IMOVEL */}
              {
                filters.userType == 'corretor' && (
                  <div className="flex items-center m-3 space-x-4">
                    <label className="mr-4">{textos.labels.specialty}:</label>
                    <select className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => { setFilters(prev => ({ ...prev, rating: e.target.value })) }}>
                      <option value={'*'}>*</option>
                      {tipoImovel!.map((item: TipoImovel) => {
                        return (
                          <option value={item.id} key={item.id}>{item.descricao}</option>
                        )
                      })}
                    </select>
                  </div>
                )
              }
            </div>

            <div className="flex-col m-4 items-start space-y-3 bg-green-500">
              {/* ESTADO & CIDADE */}
              <div className="flex items-center m-3 space-x-4">
                <label>{textos.labels.state}:</label>
                <select defaultValue={'*'} onChange={e => { setFilters(prev => ({ ...prev, state: e.target.value })) }} className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value={'*'}>*</option>
                  {
                    _UFs.map((item, index) => {
                      return (
                        <option value={item} key={index}>{item}</option>
                      )
                    })
                  }
                </select>
                <label>{textos.labels.city}:</label>
                <select defaultValue={""} onChange={e => { setFilters(prev => ({ ...prev, city: e.target.value })) }} className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-42 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">*</option>
                  {
                    filters.state ? (
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
              {/* RATING */}
              {
                filters.userType == 'corretor' && (
                  <div className="flex m-3 items-center space-x-4">
                    <label className="mr-4">{textos.labels.rating}:</label>
                    <select defaultValue={'*'} onChange={(e) => { setFilters(prev => ({ ...prev, rating: e.target.value })) }} className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={"*"}>*</option>
                      <option value={"1"}>1+</option>
                      <option value={"2"}>2+</option>
                      <option value={"3"}>3+</option>
                      <option value={"4"}>4+</option>
                      <option value={"5"}>5</option>
                    </select>
                  </div>
                )

              }
            </div>
          </div>

          {/* onClick={consultaBd} */}
          <div className="flex justify-center items-center align-center m-auto">
            <button onClick={e => { setLoading(!loading) }} className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-mediumtext-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">
              Pesquisar
            </button>
          </div>
        </Card.Content>
      </Card.Root>

      {/* Container de resultado*/}
      {
        loading ? (
          <div className="w-full flex items-center justify-center">
            <Spinner className="w-10 h-auto" />
          </div>
        ) : (
          <>
            {erro && <p className="flex justify-center">{logErro}</p>}
            {
              filters.userType == 'corretor' && (
                <div className="grid md:grid-cols-2 w-full mt-10 mb-10 justify-center items-start gap-4">
                  {
                    /*
                    corretores!.map((corretor: CorretorBuscado) => {
                      return (
                        <UserCard key={corretor.id} textos={textos} corretor={corretor} corporacao={null} />
                      )
                    })
                    */
                  }
                </div>
              )
            }
            {
              filters.userType == 'corporacao' && (
                <div className="grid md:grid-cols-2 w-full mt-10 mb-10 justify-center items-start gap-4">
                  {
                    /*
                    corporacoes!.map((corporacao: CorporacaoPorRegiao) => {
                      return (
                        // <UserCard key={corporacao.id} textos={textos} corretor={null} corporacao={corporacao} />
                      )
                    })
                    */
                  }
                </div>
              )
            }
            {
              <>
                {JSON.stringify(filters, null, 2)}
                <p>tipo de usuário: {filters.userType}</p>
                <p>estado: {filters.state}</p>
                <p>cidade: {filters.city}</p>
                <p>especialidade: {filters.speciality}</p>
                <p>nota: {filters.rating}</p>
              </>
            }
          </>
        )
      }
    </>
  );
}
