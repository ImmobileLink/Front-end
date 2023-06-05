"use client"
import React from "react";
import { Pesquisa } from "@/app/i18n/dictionaries/types";
import { useState } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import UserCard from "./UserCard";


interface PesquisaCardProps {
  textos: Pesquisa,
  regioes: any,
  especialidades: any
}

export default function PesquisaCard({ textos, regioes, especialidades }: PesquisaCardProps) {

  //Transforma o objeto recebido do banco de dados em um vetor
  const vetorregiao: any = Object.values(regioes)
  const vetorespecialidade: any = Object.values(especialidades)
  console.log(vetorespecialidade)

  //Estados dos combo box, usadosp para fazer a pesquisa
  const [userType, setUserType] = useState(textos.usertypevalue.broker);
  const [region, setRegion] = useState<any>(vetorregiao[0].id);
  const [rating, setRating] = useState('*');
  const [specialty, setSpecialty] = useState<any>(vetorespecialidade[0]);

  const [resultado, setResultado] = useState(false);
  const [usuarios, setUsuarios] = useState<any>();

  //Faz a consulta do banco de dados baseado nos combo box selecionados
  const consultaBd = async () => {
    //Faz a conversão do combo box de avaliacao para números
    let avaliacao = "0";
    if (rating != "*") {
      avaliacao = rating.substring(0, 1)
    }
    //Se for um corretor
    if (userType == textos.usertypevalue.broker) {
      
      let { data, error } = await supabase
        .rpc('get_corretores_por_regiao_tipoimovel_avaliacao', {
          avaliac: avaliacao,
          idregiao: region.id,
          idtipoimovel: specialty.id
        })

      if (error) console.error(error)
      else console.log(data)

    }
  }

  //Faz o set do estado "Region" com o id da região
  const handleRegionChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedRegion: any = vetorregiao.find((regiao: any) => regiao.regiao === selectedValue);
    setRegion(selectedRegion)
    console.log(selectedRegion.id)
  };

  //Faz o set do estado "Specialty" com o id da especialidade
  const handleSpecialtyChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedSpecialty: any = vetorregiao.find((regiao: any) => regiao.regiao === selectedValue);
    setSpecialty(selectedSpecialty)
  };


  return (
    <>
      <p className="text-4xl m-4">Encontrar usuários</p>
      <div className="flex mb-4">
        <div className="flex-col m-4">
          <label className="mr-4">{textos.labels.usertype}:</label>
          <select className="text-black w-50"
            onChange={(e) => { setUserType(e.target.value) }}>
            <option>{textos.usertypevalue.broker}</option>
            <option>{textos.usertypevalue.corporation}</option>
          </select>
          {
            userType == textos.usertypevalue.broker
              ?
              <div className="flex-col mt-3">
                <label className="mr-4">{textos.labels.specialty}:</label>
                <select className="text-black w-50"
                  value={specialty.descricao}
                  onChange={(e) => handleSpecialtyChange(e)}>
                  {vetorespecialidade.map((especialidade: any) => {
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
            value={region.regiao}
            onChange={(e) => handleRegionChange(e)}>
            {vetorregiao.map((regiao: any) => {
              return (
                <option key={regiao.id}>{regiao.regiao}</option>
              )
            })}
          </select>
        </div>

        <div className="m-4">
          <label className="mr-4">{textos.labels.rating}:</label>
          <select className="text-black w-50"
            value={rating}
            onChange={(e) => setRating(e.target.value)}>
            <option>*</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
            <option>5</option>
          </select>
        </div>
      </div>

      <button onClick={consultaBd} className="flex mx-auto mt-2 p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
        Pesquisar
      </button>

      {
        resultado ?
          <div className="flex flex-col mt-10 justify-center items-center
                        md:flex-row">
            {
              usuarios.map((usuario: any) => {
                return (
                  <UserCard key={usuario.id} usuario={usuario} />
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
