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

export default function PesquisaCard({textos, regioes, especialidades}: PesquisaCardProps) {
    //Configura o tipo para pegar os valores do objeto publicacao
    type ObjectKey = keyof typeof usuarios;

  //Transforma o objeto recebido do banco de dados em um vetor
  const vetorregiao = Object.values(regioes)
  const vetorespecialidade = Object.values(especialidades)

  //Estados dos combo box, usadosp para fazer a pesquisa
  const [userType, setUserType] = useState(textos.usertypevalue.broker);
  const [region, setRegion] = useState('');
  const [rating, setRating] = useState('*');
  const [specialty, setSpecialty] = useState('');

  const [resultado, setResultado] = useState(false);
  const [usuarios, setUsuarios] = useState<any>();

  const consultaBd = async () => {
    let avaliacao = "0";
    if(rating != "*"){
      avaliacao = rating.substring(0,1)
    }
    if(userType == textos.usertypevalue.broker){
      const corretores = await supabase
      .from('corretor')
      .select("*")
    //   .select(`
    //   id, idusuario, nome, cpf, cnpj, avaliacao, creci, status, cep, estado, cidade, bairro, comercial,
    //   usuarioporarea(idusuario, idregiao),
    //   corretorTemEspecialidade(idcorretor, idtipoimovel),
    //   tipoImovel(id, descricao)
    // `)
      const dados = corretores.data
      setUsuarios(dados)
      setResultado(true)
    }
  }

  return (
    <>
      <p className="text-4xl m-4">Encontrar usuários</p>
      <div className="flex mb-4">
        <div className="flex-col m-4">
          <label className="mr-4">{textos.labels.usertype}:</label>
          <select className="text-black w-50"
          onChange={(e) => {setUserType(e.target.value)}}>
            <option>{textos.usertypevalue.broker}</option>
            <option>{textos.usertypevalue.corporation}</option>
          </select>
          {
          userType == textos.usertypevalue.broker 
          ?
            <div className="flex-col mt-3">
            <label className="mr-4">{textos.labels.specialty}:</label>
            <select className="text-black w-50"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}>
              {vetorespecialidade.map((especialidade: any) => {
                return (
                  <option>{especialidade.descricao}</option>
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
          value={region}
          onChange={(e) => setRegion(e.target.value)}>
            {vetorregiao.map((regiao: any) => {
              return (
                <option>{regiao.regiao}</option>
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
          usuarios.map((usuario: Object) => {
            <p>oi</p>
          })
        :
        <div>iu</div>
        
      }      
      
    </>  
  );
}
