"use client"
import { Pesquisa } from "@/app/i18n/dictionaries/types";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import UserCard from "./UserCard";
import { Regiao, TipoImovel, CorretorBuscado } from "../../../../../lib/modelos";

interface PesquisaCardProps {
  textos: Pesquisa,
  regioes: Regiao[] | null,
  especialidades: TipoImovel[] | null
}
const supabase = createClientComponentClient<Database>()

export default function PesquisaCard({ textos, regioes, especialidades }: PesquisaCardProps) {
  //Estados dos combo box, usados para fazer a pesquisa
  const [selectedUserType, setSelectedUserType] = useState(textos.usertypevalue.broker);
  const [selectedRegion, setSelectedRegion] = useState<Regiao>({id: '', regiao: ''});
  const [selectedSpecialty, setSelectedSpecialty] = useState<TipoImovel>({id: '', descricao: ''});
  const [selectedRating, setSelectedRating] = useState('*');
 
  //States relacionados aos resultados
  const [resultado, setResultado] = useState(false);
  const [erro, setErro] = useState<string>('');
  const [corretores, setCorretores] = useState<CorretorBuscado[] | null>([]);
  const [corporacoes, setCorporacoes] = useState<CorporacaoPorRegiao[] | null>([]);

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
      
      //Caso região e especialidade sejam selecionados
      if (selectedRegion.id != '' && selectedSpecialty.id != '') {

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
      const {data, error} = await supabase
      .from('corporacao_por_regiao')
      .select('*')
      .eq('idregiao', selectedRegion.id)

      if(error) {
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
  
  //Faz o set do estado "Region" com o id da região
  const handleRegionChange = (event: any) => {
    const selectedValue = event.target.value;
    if (selectedValue == "*"){
      setSelectedRegion({id: '', regiao: ''})
    }
    else {
      const selectedObject: Regiao | undefined = regioes!.find((regiao: Regiao) => regiao!.regiao === selectedValue);
      if (selectedObject != null) {
        setSelectedRegion(selectedObject)
      } 
    }    
  };

  //Faz o set do estado "Specialty" com o id da especialidade
  const handleSpecialtyChange = (event: any) => {
    const selectedValue = event.target.value;
    if (selectedValue == "*"){
      setSelectedSpecialty({id: '', descricao: ''})
    }
    else {
      const selectedObject: TipoImovel | undefined = especialidades!.find((especialidade: TipoImovel) => especialidade!.descricao === selectedValue);
      if (selectedObject != null) {
        setSelectedSpecialty(selectedObject)
      }
    }     
  };

  //Faz o set do estado "UserType" e reseta o vetor do tipo oposto, bem como os erros
  const handleUserTypeChange = (event: any) => {
    setSelectedUserType(event.target.value)
    setErro('')
    if(selectedUserType == textos.usertypevalue.broker)
      setCorporacoes([])    
    else
      setCorretores([])
  }

  return (
    <>
    {/* Combo Box Container */} 
        
      <div className="rounded-md ring-gray-300 bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md">
        <div className="justify-start">
          <p className="pt-5 pl-5 text-2xl">{textos.labels.title}</p> 
        </div>  
        <div className="flex flex-col lg:flex-row m-auto justify-start space-x-10 p-5">
          <div className="flex-col m-4 items-start space-y-3">
            <div className="flex items-center m-3 space-x-4">
              <label className="mr-4">{textos.labels.usertype}:</label>
              <select className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => handleUserTypeChange(e)}>
                <option>{textos.usertypevalue.broker}</option>
                <option>{textos.usertypevalue.corporation}</option>
              </select>
            </div>       
            {
              selectedUserType == textos.usertypevalue.broker ?
                  <div className="flex items-center m-3 space-x-4">
                    <label className="mr-4">{textos.labels.specialty}:</label>
                    <select className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={selectedSpecialty.descricao}
                      onChange={(e) => handleSpecialtyChange(e)}>
                        <option>*</option>
                      {especialidades!.map((especialidade: TipoImovel) => {
                        return (
                          <option key={especialidade.id}>{especialidade.descricao}</option>
                        )
                      })}
                    </select>
                  </div>
                :
                <div></div>
            }
          </div>

          <div className="flex-col m-4 items-start space-y-3">
            <div className="flex items-center m-3 space-x-4">
              <label>{textos.labels.region}:</label>
              <select className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedRegion.regiao}
                onChange={(e) => handleRegionChange(e)}>
                  <option>*</option>
                {regioes!.map((regiao: any) => {
                  return (
                    <option key={regiao.id}>{regiao.regiao}</option>
                  )
                })}
              </select>
            </div>

            {
              selectedUserType == textos.usertypevalue.broker ?
                <div className="flex m-3 items-center space-x-4">
                  <label className="mr-4">{textos.labels.rating}:</label>
                  <select className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}>
                    <option>*</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                    <option>5</option>
                  </select>
                </div>
              :
              <div></div>
            }
          </div>                     
        </div>
        <div className="flex pb-5 justify-center items-center align-center m-auto">
            <button onClick={consultaBd} className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-mediumtext-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">
            Pesquisar
            </button>
        </div>  
      </div> 

      {
        erro == 'invalid input syntax for type uuid: ""' ?
        <p className="flex justify-center">{textos.labels.missingcombobox}</p>
        : 
          erro != '' ?
          <p className="flex justify-center">{textos.labels.error}</p>
          :
          <p></p>        
      }

        {/* Container de resultado*/}
        {
         resultado == true &&  selectedUserType == textos.usertypevalue.broker ?
         <div className="grid md:grid-cols-2 w-full mt-10 mb-10 justify-center items-start gap-4">
           {
             corretores!.map((corretor: CorretorBuscado) => {
               return (
                 <UserCard key={corretor.id} textos={textos} corretor={corretor} corporacao={null}/>
               )
             })             
           }
         </div>         
         :
         resultado == true &&  selectedUserType == textos.usertypevalue.corporation ?
         <div className="grid md:grid-cols-2 w-full mt-10 mb-10 justify-center items-start gap-4">
           {
             corporacoes!.map((corporacao: CorporacaoPorRegiao) => {
               return (
                 <UserCard key={corporacao.id} textos={textos} corretor={null} corporacao={corporacao} />
               )
             })             
           }
         </div>
          :
          <div></div>    
        }

    </>
  );
}
