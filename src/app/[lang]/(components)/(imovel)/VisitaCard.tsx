"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Corretor, CorretorAssociado, ImovelRegistro, InsereVisita, Visita } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import { Formlabels } from "@/app/i18n/dictionaries/types";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Checkbox, Dropdown, Label, Modal, TextInput } from 'flowbite-react';

interface VisitaCardProps {
  //onCloseModal: any;
  formlabels: Formlabels;
  imovel: ImovelRegistro;
  corretor: CorretorAssociado[] | null;
  userid: string;
  formOpen: boolean,
  setFormOpen: Dispatch<SetStateAction<boolean>>,
}

const supabase = createClientComponentClient<Database>();

export default function VisitaCard({ formlabels, imovel, corretor, userid, formOpen, setFormOpen }: VisitaCardProps) {
  const [selectedCorretor, setSelectedCorretor] = useState<CorretorAssociado>();
  const [select, setSelect] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState("");
  const [time, setTime] = useState("");
  const [visita, setVisita] = useState<Visita>();

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //const currentDate = new Date().toISOString().slice(0, 10);
  const date = new Date().toLocaleDateString().split('/');
  const currentDate = `${date[2]}-${date[1]}-${date[0]}`;

  let dropdownRef = useRef();
  let bttnRef = useRef();

  useEffect(() => {
    let handler = (e: any) => {
      if(!dropdownRef.current?.contains(e.target) && !bttnRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return() => {
      document.removeEventListener("mousedown", handler);
    }
  });

  const maskPhone = (valor: any) => {
    console.log(currentDate);
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
      (c: CorretorAssociado) => c!.nome === selectedValue
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
      setFormOpen(false)
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const visita: InsereVisita = {
      idcorporacao: userid,
      idcorretor: selectedCorretor?.id,
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
    <>
    <Modal dismissible show={formOpen} onClose={() => setFormOpen(false)} size="xl" >
        <Modal.Header>Delegar Visita</Modal.Header>
        <form onSubmit={handleSubmit} className="group overflow-y-auto overflow-x-hidden" noValidate>
        <Modal.Body>
          <div className="space-y-2">
            <div className="flex flex-col">
              <div className="mb-1 flex justify-between items-center">
                <h4 className="-mb-1 text-xl font-medium text-gray-900 dark:text-white">{formlabels.brokerdata}</h4>
                <Link href={"/pesquisa"} className="text-xs md:text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Encontrar corretor
                </Link>
              </div>
              <hr className="h-px border-0 dark:bg-gray-600" />
              <div className="md:flex my-4">
                <div className="md:w-full">
                  <div className="relative flex flex-col items-center rounded">
                  <button ref={bttnRef} type="button" onClick={() => setIsOpen((prev) => !prev)} className="bg-gray-200 border border-gray-200 focus:outline-none focus:bg-white focus:border-gray-500 leading-tight text-gray-700 p-2 w-full flex items-center justify-between rounded">
                      {
                        (select.length === 0) ? (
                          <span>{formlabels.selectbroker}</span>
                        ) : (
                          <span>{select}</span>
                        )
                      }
                    </button>
                    {
                      (isOpen && (corretor?.length > 0)) && (
                        <div ref={dropdownRef} className="text-xs bg-gray-200 border border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 absolute top-11 flex flex-col items-start rounded p-1 w-full z-50 gap-y-2 max-h-64 overflow-auto">
                          {corretor?.map((c: CorretorAssociado) => {
                            const withDescription = c.tipoImovel?.filter((item: CorretorAssociado) =>
                              imovel.caracteristicas?.map((i) => i.id === item.id).includes(true)
                            );
                            const withoutDescription = c.tipoImovel?.filter((item: CorretorAssociado) =>
                              !imovel.caracteristicas?.map((i) => i.id === item.id).includes(true)
                            );
                            return (
                              <div key={c.id} 
                                onClick={() => {
                                  console.log(c)
                                  setSelect(c.nome)
                                  setSelectedCorretor(c)
                                  setIsOpen(false)
                                }}
                                className="cursor-pointer rounded p-1 hover:bg-gray-100">
                                  <div className="flex w-full justify-between">
                                    <p>{c.nome}</p>
                                    <p>{`${imovel!.cidade}/${imovel!.estado}`}</p>
                                  </div>
                                  <div className="flex flex-wrap items-center">
                                    Especialidades:
                                  {withDescription?.map((item, index) => (
                                    <div
                                      key={index}
                                      className={`flex justify-center mt-1 mx-1 font-medium px-1 border border-teal-300 text-teal-700 bg-teal-100`}
                                    >
                                      <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                        {item.descricao}
                                      </div>
                                    </div>
                                  ))}
                                  {withoutDescription?.map((item, index) => (
                                    <div
                                      key={index}
                                      className={`flex justify-center mt-1 mx-1 font-medium px-1 border border-teal-300`}
                                    >
                                      <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                        {item.descricao}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    }
                    <div className="pointer-events-none absolute right-0 flex items-center p-3 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                  </div>
                </div>
              </div>

              <h4 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{formlabels.clientdata}</h4>
              <hr className="h-px border-0 dark:bg-gray-600" />
              <div className="md:flex my-4">
                <div className="md:w-full">
                  <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">{formlabels.name}</label>
                  <input
                    onChange={(e) => setNome(e.target.value)}
                    className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 md:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    id="client-name"
                    type="text"
                    pattern="(?=^.{4,}$)[A-Za-z\s]+"
                    placeholder=" "
                    required
                  />
                  <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {formlabels.formlogs.invalidname}
                  </span>
                </div>
              </div>
              <div className="md:flex mb-4">
                <div className="md:w-full">
                  <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">{formlabels.phone}</label>
                  <input
                    className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 md:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    id="client-phone"
                    type="tel"
                    onChange={handleChange}
                    value={phone}
                    pattern="(\(\d{2}\)\s?\d{4}-\d{4}|\(\d{2}\)\s?\d{5}-\d{4})"
                    placeholder=" "
                    required
                  />
                  <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {formlabels.formlogs.invalidphone}
                  </span>
                </div>
              </div>
              <div className="md:flex mb-4">
                <div className="md:w-full">
                  <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">{formlabels.email}</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-700 leading-tight focus:outline-none bg-gray-100 md:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    id="client-email"
                    type="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    placeholder=" "
                    required
                  />
                  <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {formlabels.formlogs.invalidemail}
                  </span>
                </div>
              </div>

              <h4 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{formlabels.scheduling}</h4>
              <hr className="h-px border-0 dark:bg-gray-600" />
              <div className="md:flex my-4">
                <div className="md:w-1/2 pr-3">
                  <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">{formlabels.date}</label>
                  <input
                    onChange={(e) => setData(e.target.value)}
                    className={`p-2 relative shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${data !== "" && "invalid:[&:not(:focus)]:border-red-500"} peer`}
                    id="visit-date"
                    type="date"
                    min={currentDate}
                    required
                  />
                  <span className={`mt-2 hidden text-sm text-red-500 ${data !== "" && "peer-[&:not(:focus):invalid]:block"}`}>
                    {formlabels.formlogs.invaliddate}
                  </span>
                </div>
                <div className="md:w-1/2 pl-3">
                  <label className="text-gray-700 dark:text-white text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">{formlabels.time}</label>
                  <input
                    onChange={(e) => setTime(e.target.value)}
                    className={`p-2 relative shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${time !== "" && "invalid:[&:not(:focus)]:border-red-500"} peer`}
                    id="visit-time"
                    type="time"
                    min={`${
                      data === currentDate
                          ? `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`
                          : "00:00"
                    }`}
                    max="23:59"
                    required
                  />
                  <span className={`mt-2 hidden text-sm text-red-500 ${time !== "" && "peer-[&:not(:focus):invalid]:block"}`}>
                    {formlabels.formlogs.invalidtime}
                  </span>
                </div>
              </div>
            </div>          
              <div className="w-full pt-2">
                <button
                  type="submit"
                  className={`p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2 group-invalid:pointer-events-none group-invalid:opacity-30 ${(select.length === 0) && "pointer-events-none opacity-30"}`}
                >
                  {formlabels.delegatevisit}
                </button>
              </div>
          </div>
        </Modal.Body>
        </form>
      </Modal>
    </>
  );
}
