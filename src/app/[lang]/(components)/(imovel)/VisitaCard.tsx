"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Corretor, InsereVisita, Visita } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import { Formlabels } from "@/app/i18n/dictionaries/types";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface VisitaCardProps {
  onCloseModal: any;
  formlabels: Formlabels;
  imovel: any;
  corretor: any;
  userid: string;
}

const supabase = createClientComponentClient<Database>();

export default function VisitaCard({ onCloseModal, formlabels, imovel, corretor, userid }: VisitaCardProps) {
  const [alert, setAlert] = useState({ type: "", title: "", message: "" });
  const [selectedCorretor, setSelectedCorretor] = useState<Corretor>(
    corretor![0]
  );
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState("");
  const [time, setTime] = useState("");
  const [visita, setVisita] = useState<Visita>();

  const maskPhone = (valor: any) => {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleChange = (event: any) => {
    const valor = event.target.value;
    const formatPhone = maskPhone(valor);
    setPhone(formatPhone);
  };

  const handleCorretor = (event: any) => {
    const selectedValue = event.target.value;
    const selectedObject = corretor!.find(
      (c: Corretor) => c!.nome === selectedValue
    );
    if (selectedObject != null) {
      setSelectedCorretor(selectedObject);
    }
  };

  const insertVisita = async (visita: InsereVisita) => {
    const { error } = await supabase.from("visita").insert(visita);
    if (error) {
      console.log(error);
    } else {
      onCloseModal();
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const visita: InsereVisita = {
      idcorporacao: userid,
      idcorretor: selectedCorretor.id,
      idimovel: imovel.id,
      dadosmarcador: {
        name: nome,
        email: email,
        phone: phone,
      },
      dataAgendamento: `${data} ${time}`,
    };

    insertVisita(visita);
  };

  return (
    <div
      aria-hidden="true"
      className="w-full z-50 p-[2.5%] bg-[rgba(0,0,0,0.5)] fixed z-1000 flex justify-center inset-0"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-dark-300 flex-1 shadow-md max-w-md md:max-w-xl flex flex-col relative rounded-lg px-8 py-6 mb-3 z-1000 overflow-auto group"
      >
        <button
          type="button"
          className="text-dark-300 w-6 h-6 absolute text-inherit bg-transparent cursor-pointer border-none right-4 inset-y-2 text-lg rounded-full hover:scale-125"
          onClick={() => onCloseModal()}
        >
          <svg
            className="h-6 w-6 mt-2 mr-8 stroke-dark-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-2">
          <div className="block text-gray-700 text-lg font-bold my-2">
            {formlabels.brokerdata}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="inline-block relative">
              <select
                className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 my-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                //value={selectedCorretor.id}
                onChange={(e) => handleCorretor(e)}
              >
                <option disabled value="">
                  {formlabels.selectbroker}
                </option>
                {corretor?.map((c: Corretor) => {
                  return <option key={c.id}>{c.nome}</option>;
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

        <div className="mb-2">
          <div className="block text-gray-700 text-lg font-bold mb-2">
            {formlabels.clientdata}
          </div>
          <div className="bg-gray-200 rounded px-4 pt-4 pb-2">
            <label className="mb-2 flex flex-wrap">
              <span className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal">
                {formlabels.name}
              </span>

              <div className="w-full sm:w-3/4 px-2">
                <input
                  onChange={(e) => setNome(e.target.value)}
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  id="client-name"
                  type="text"
                  pattern="(?=^.{4,}$)[A-Za-z\s]+"
                />
                <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {formlabels.formlogs.invalidname}
                </span>
              </div>
            </label>

            <label className="mb-2 flex flex-wrap">
              <span className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal">
                {formlabels.phone}
              </span>

              <div className="w-full sm:w-3/4 px-2">
                <input
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  id="client-phone"
                  type="tel"
                  onChange={handleChange}
                  value={phone}
                  pattern="(\(\d{2}\)\s?\d{4}-\d{4}|\(\d{2}\)\s?\d{5}-\d{4})"
                />
                <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {formlabels.formlogs.invalidphone}
                </span>
              </div>
            </label>

            <label className="mb-2 flex flex-wrap">
              <span className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal">
                {formlabels.email}
              </span>

              <div className="w-full sm:w-3/4 px-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  id="client-email"
                  type="email"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                />
                <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {formlabels.formlogs.invalidemail}
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="mb-2">
          <div className="block text-gray-700 text-lg font-bold mb-2">
            {formlabels.scheduling}
          </div>
          <div className="bg-gray-200 rounded px-4 pt-4 pb-2">
            <label className="mb-2 flex flex-wrap">
              <span className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal">
                {formlabels.date}
              </span>

              <div className="w-full sm:w-3/4 px-2">
                <input
                  onChange={(e) => setData(e.target.value)}
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  id="visit-date"
                  type="date"
                  required
                />
                <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {formlabels.formlogs.invaliddate}
                </span>
              </div>
            </label>

            <label className="flex flex-wrap">
              <span className="text-gray-700 text-sm font-bold mb-1 w-full sm:w-1/4 px-2 py-2 sm:pr-4 leading-normal">
                {formlabels.time}
              </span>

              <div className="w-full sm:w-3/4 px-2">
                <input
                  onChange={(e) => setTime(e.target.value)}
                  className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  id="visit-time"
                  type="time"
                  min="00:00"
                  max="23:59"
                  required
                />
                <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {formlabels.formlogs.invalidtime}
                </span>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="p-2 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2 group-invalid:pointer-events-none group-invalid:opacity-30"
        >
          {formlabels.delegatevisit}
        </button>
      </form>
    </div>
  );
}
