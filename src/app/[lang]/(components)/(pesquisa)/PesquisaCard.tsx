"use client"
import React from "react";
import { Pesquisa } from "@/app/i18n/dictionaries/types";
import { useState } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import UserCard from "./UserCard";
import { Regiao, TipoImovel, CorretorBuscado, CorporacaoPorRegiao } from "../../../../../lib/modelos";


interface PesquisaCardProps {
  textos: Pesquisa,
  regioes: Regiao[] | null,
  especialidades: TipoImovel[] | null
}

export default function PesquisaCard({ textos, regioes, especialidades }: PesquisaCardProps) {
  //Estados dos combo box, usados para fazer a pesquisa
  const [selectedUserType, setSelectedUserType] = useState(textos.usertypevalue.broker);
  const [selectedRegion, setSelectedRegion] = useState<Regiao>({id: '', regiao: ''});
  const [selectedSpecialty, setSelectedSpecialty] = useState<TipoImovel>({id: '', descricao: ''});
  const [selectedRating, setSelectedRating] = useState('*');
 
  //States relacionados aos resultados
  const [resultado, setResultado] = useState(false);
  const [erro, setErro] = useState(false);
  const [corretores, setCorretores] = useState<CorretorBuscado[] | null>([]);
  const [corporacoes, setCorporacoes] = useState<CorporacaoPorRegiao[] | null>([]);

  //Faz a consulta do banco de dados baseado nos combo box selecionados
  const consultaBd = async () => {
    //Faz a conversão do combo box de avaliacao para números
    let av = "0";
    let avnum = 0;
    if (selectedRating != "*") {
      av = selectedRating.substring(0, 1)
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
          avaliacao: avnum,
          idregiao: selectedRegion.id,
          idtipoimovel: selectedSpecialty.id
        })

        if (error) {
          setErro(true)
        }
        else {
          setErro(false)
          setCorretores(data)
          setResultado(true)
        }
      }  
      else {
        //Caso apenas especialidade seja selecionada
        if (selectedRegion.id == '' && selectedSpecialty.id != '') {
          const { data, error } = await supabase
          .rpc('get_corretores_avaliacao_tipoimovel', {
            avaliacao: avnum,
            idtipoimovel: selectedSpecialty.id
          })

          if (error) {
            setErro(true)
          }
          else {
            setErro(false)
            setCorretores(data)
            setResultado(true)
          }
        }
        else {
          //Caso apenas região seja selecionada
          if (selectedRegion.id != '' && selectedSpecialty.id == '') {
            const { data, error } = await supabase
            .rpc('get_corretores_avaliacao_regiao', {
              avaliacao: avnum,
              idregiao: selectedRegion.id
            })
  
            if (error) {
              setErro(true)
            }
            else {
              setErro(false)
              setCorretores(data)
              setResultado(true)
            }
          }
          else {
            const { data, error } = await supabase
            .rpc('get_corretores_avaliacao', {
              avaliacao: avnum
            })
  
            if (error) {
              setErro(true)
            }
            else {
              setErro(false)
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
        setErro(true)
      }
      else {
        setErro(false)
        setCorporacoes(data)
      }
    }
  }
  
  //Faz o set do estado "Region" com o id da região
  const handleRegionChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedObject: Regiao | undefined = regioes?.find((regiao: Regiao) => regiao?.regiao === selectedValue);
    if (selectedObject != null) {
      setSelectedRegion(selectedObject)
    }   
    console.log(selectedRegion)
  };

  //Faz o set do estado "Specialty" com o id da especialidade
  const handleSpecialtyChange = (event: any) => {
    const selectedValue = event.target.value;
    if(selectedValue == '-'){

    }
    const selectedObject: TipoImovel | undefined = especialidades?.find((especialidade: TipoImovel) => especialidade.descricao === selectedValue);
    if (selectedObject != null) {
      setSelectedSpecialty(selectedObject)
    }   
  };


  return (
    <>
      <p className="text-4xl m-4">Encontrar usuários</p>
      <div className="flex mb-4">
        <div className="flex-col m-4">
          <label className="mr-4">{textos.labels.usertype}:</label>
          <select className="text-black w-50"
            onChange={(e) => { setSelectedUserType(e.target.value) }}>
            <option>{textos.usertypevalue.broker}</option>
            <option>{textos.usertypevalue.corporation}</option>
          </select>
          {
            selectedUserType == textos.usertypevalue.broker
              ?
              <div className="flex-col mt-3">
                <label className="mr-4">{textos.labels.specialty}:</label>
                <select className="text-black w-50"
                  value={selectedSpecialty.descricao}
                  onChange={(e) => handleSpecialtyChange(e)}>
                    <option>Selecione</option>
                  {especialidades?.map((especialidade: any) => {
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

        <div className="m-4">
          <label className="mr-4">{textos.labels.region}:</label>
          <select className="text-black w-50"
            value={selectedRegion.regiao}
            onChange={(e) => handleRegionChange(e)}>
              <option>Selecione</option>
            {regioes?.map((regiao: any) => {
              return (
                <option key={regiao.id}>{regiao.regiao}</option>
              )
            })}
          </select>
        </div>

        {
          selectedUserType == textos.usertypevalue.broker
          ?
            <div className="m-4">
              <label className="mr-4">{textos.labels.rating}:</label>
              <select className="text-black w-50"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}>
                <option>*</option>
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

      <button onClick={consultaBd} className="flex mx-auto mt-2 p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
        Pesquisar
      </button>
      {
        erro ?
        <p>Selecione os filtros!</p>
        :
        <p></p>
      }

      {
        resultado == true &&  selectedUserType == textos.usertypevalue.broker ?
          <div className="flex flex-col mt-10 justify-center items-center
                        md:flex-row">
            {
              corretores?.map((corretor: CorretorBuscado) => {
                return (
                  <UserCard key={corretor.id} corretor={corretor} corporacao={null}/>
                )
              })             
            }
          </div>         
          :
          <div></div>

      }
      {
        resultado == true &&  selectedUserType == textos.usertypevalue.corporation ?
        <div className="flex flex-col mt-10 justify-center items-center
                      md:flex-row">
          {
            corporacoes?.map((corporacao: CorporacaoPorRegiao) => {
              return (
                <UserCard key={corporacao.id} corretor={null} corporacao={corporacao} />
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
