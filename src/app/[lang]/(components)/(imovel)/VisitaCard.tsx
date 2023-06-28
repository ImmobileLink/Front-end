"use client";
import React, { useState } from "react";
import { Corretor, CorretorAssociado, Visita } from "../../../../../lib/modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Formlabels } from "@/app/i18n/dictionaries/types";
import Link from "next/link";

interface VisitaCardProps {
  formlabels: Formlabels;
  onCloseModal;
  imovelData;
  corretorData;
  userSession: Session | null | undefined;
}

const supabase = createClientComponentClient<Database>()

export default function VisitaCard({ onCloseModal, imovelData, corretorData, userSession, formlabels }: VisitaCardProps) {
  const [alert, setAlert] = useState({ type: "", title: "", message: "" });
  const [selectedCorretor, setSelectedCorretor] = useState(corretorData![0]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState("");
  const [time, setTime] = useState("");

  const maskPhone = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleChange = (event) => {
    const valor = event.target.value;
    const formatPhone = maskPhone(valor);
    setPhone(formatPhone);
  };

  const validaForm = () => {
    //validação do nome do cliente
    var regexName = /^[A-Za-z]+(?:\s[a-zA-Z]+)*$/;
    if (!nome.match(regexName) || nome.length < 10) {
      setAlert({
        type: "warning",
        title: "",
        message: formlabels.formlogs.invalidname,
      });
      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    // validação do telefone
    const len = phone.replace(/\D/g, "").length;
    if (!(len == 10 || len == 11)) {
      setAlert({
        type: "warning",
        title: "",
        message: formlabels.formlogs.invalidphone,
      });
      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    // validação do email
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexEmail) || email.length <= 6) {
      setAlert({
        type: "warning",
        title: "",
        message: formlabels.formlogs.invalidemail,
      });
      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }
    return true;
  };

  const handleCorretor = (event: any) => {
    const selectedValue = event.target.value;
    const selectedObject = corretorData!.find(corretor => corretor!.nome === selectedValue);
    if (selectedObject != null) {
      setSelectedCorretor(selectedObject)
    }     
  };

  const handleDelegarVisita = async () => {
    if (validaForm()) {
      const visita: Visita = {
        idcorporacao: userSession?.user.id!,
        idcorretor: selectedCorretor.id,
        idimovel: imovelData.id,
        dadosmarcador: {
          "name": nome,
          "email": email,
          "phone": phone,
        },
        dataAgendamento: `${data} ${time}`
      };
      const { error } = await supabase
      .from('visita')
      .insert(visita)
      if(error) {
        console.log(error) 
      }
      else {
        console.log(visita);
        onCloseModal();
      }
    }
  };

  return (
    <div
      aria-hidden="true"
      className="w-full p-[2.5%] bg-[rgba(0,0,0,0.5)] fixed z-1000 flex justify-center inset-0"
    >
      <div className="bg-white flex-1 shadow-md max-w-md md:max-w-xl flex flex-col relative rounded-lg px-8 py-6 mb-4 z-1000 overflow-auto">
        <button
          type="button"
          className="text-dark-300 w-6 h-6 absolute text-inherit bg-transparent cursor-pointer border-none right-4 inset-y-2 text-lg rounded-full hover:scale-125"
          onClick={() => onCloseModal()}
        >
          X
        </button>

        <div className="mb-4">
          <div
            className="block text-gray-700 text-lg font-bold my-2"
          >
            {formlabels.brokerdata}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="inline-block relative">
              <select
                className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 my-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                //value={selectedCorretor.id}
                onChange={(e) => handleCorretor(e)}
              >
                {corretorData?.map(corretor => {
                    return (
                      <option key={corretor.id}>{corretor.nome}</option>
                    )
                  })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <Link
                href={"/pesquisa"}
                className="items-end w-full text-white bg-dark-300 hover:bg-dark-200 focus:ring-4 font-medium py-1 px-2 rounded text-sm text-center mr-2  my-3"
              >
                {formlabels.findbroker}
              </Link>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            {formlabels.clientdata}
          </div>
          <div className="bg-gray-200 rounded px-4 pt-4 pb-2">
            <div className="mb-2 flex flex-wrap">
              <label
                className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal"
              >
                {formlabels.name}
              </label>
              <div className="w-full sm:w-3/4 px-2">
                <input
                  onChange={(e) => setNome(e.target.value)}
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>
            </div>
            <div className="mb-2 flex flex-wrap">
              <label
                className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal"
              >
                {formlabels.phone}
              </label>
              <div className="w-full sm:w-3/4 px-2">
                <input
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="usertel"
                  type="tel"
                  onChange={handleChange}
                  value={phone}
                />
              </div>
            </div>
            <div className="mb-2 flex flex-wrap">
              <label
                className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal"
              >
                {formlabels.email}
              </label>
              <div className="w-full sm:w-3/4 px-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="usermail"
                  type="email"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            {formlabels.scheduling}
          </div>
          <div className="bg-gray-200 rounded px-4 pt-4 pb-2">
            <div className="mb-2 flex flex-wrap">
              <label
                className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal"
              >
                {formlabels.date}
              </label>
              <div className="w-full sm:w-3/4 px-2">
                <input
                  onChange={(e) => setData(e.target.value)}
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="date"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <label
                className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal"
              >
                {formlabels.time}
              </label>
              <div className="w-full sm:w-3/4 px-2">
                <input
                  onChange={(e) => setTime(e.target.value)}
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="usertel"
                  type="time"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleDelegarVisita}
          className="p-2 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
        >
          {formlabels.delegatevisit}
        </button>
      </div>
    </div>
  );
}
