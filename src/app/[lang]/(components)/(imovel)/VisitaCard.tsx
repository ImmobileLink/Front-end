"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CorretorAssociado,
  ImovelRegistro,
  InsereVisita,
} from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import { Formlabels } from "@/app/i18n/dictionaries/types";
import {
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import {
  Alert,
  Modal,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import ImovelImg from "./ImovelImg";
import EditForm from "./EditForm";

interface VisitaCardProps {
  formlabels: Formlabels;
  imovel: ImovelRegistro;
  corretor: CorretorAssociado[] | null;
  userid: string;
  formOpen: boolean;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
}

const supabase = createClientComponentClient<Database>();

export default function VisitaCard({
  formlabels,
  imovel,
  corretor,
  userid,
  formOpen,
  setFormOpen,
}: VisitaCardProps) {
  const [selectedCorretor, setSelectedCorretor] = useState<CorretorAssociado>();
  const [select, setSelect] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState("");
  const [time, setTime] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [editImage, setEditImage] = useState(false);

  //const currentDate = new Date().toISOString().slice(0, 10);
  const date = new Date().toLocaleDateString().split("/");
  const currentDate = `${date[2]}-${date[1]}-${date[0]}`;

  let dropdownRef = useRef<HTMLDivElement | null>(null);
  let bttnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (
        !dropdownRef.current?.contains(e.target) &&
        !bttnRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dropdownRef, bttnRef]);

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

  const insertVisita = async (visita: InsereVisita) => {
    const { error } = await supabase.from("visita").insert(visita);
    if (error) {
      console.log(error);
    } else {
      setFormOpen(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const visita: InsereVisita = {
      idcorporacao: userid,
      idcorretor: selectedCorretor!.id,
      idimovel: imovel.id,
      dadosmarcador: {
        name: nome,
        email: email,
        phone: phone,
      },
      dataagendamento: `${data} ${time}`,
    };

    insertVisita(visita);
  };

  return (
    <>
      <Modal
        dismissible
        show={formOpen}
        onClose={() => setFormOpen(false)}
        size="3xl"
      >
        <Modal.Body className="p-0 rounded-lg">
          <form onSubmit={handleSubmit} className="group" noValidate>
            <div>
              <button
                type="button"
                className="absolute right-3 top-2 xl:right-1 xl:top-1 text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-xs w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setFormOpen(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
              <div className="bg-gray-200 dark:bg-dark-200 rounded py-4 px-8 sm:p-8">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-3">
                  <div className="sm:col-span-1 mt-4 sm:mt-0 text-dark-200 dark:text-white">
                    <div className="flex justify-center relative rounded-lg overflow-hidden h-36 sm:h-28">
                      <ImovelImg
                        usuarioId={userid}
                        imovel={imovel}
                        imovelId={imovel.id}
                        imagemId={imovel!.imagem!}
                      />
                      <div className="w-full">
                        <div className="absolute inset-0 flex items-end justify-end z-50">
                          <button
                            type="button"
                            className="px-3 py-1 rounded-tl-lg bg-blue-700 text-white text-xs sm:text-sm hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => {
                              setEditImage(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        </div>
                        {editImage && (
                          <EditForm
                            imovel={imovel}
                            userid={userid}
                            formOpen={editImage}
                            setFormOpen={setEditImage}
                            editimg={formlabels.editimg}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex-auto sm:text-sm text-xs">
                      <div className="w-full">
                        <p className="font-bold mt-2">{formlabels.infoproperty.location}</p>
                        <p>{`${imovel!.rua}, ${imovel!.numero}`}</p>
                        <p>{`${imovel!.bairro} - ${imovel!.cidade}/${
                          imovel!.estado
                        }`}</p>

                        <p className="font-bold mt-2">{formlabels.infoproperty.price}</p>
                        <p>{`${imovel!.valor!.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}`}</p>
                      </div>
                      <div className="w-full mt-2 mb-2 sm:mb-0">
                        <p className="font-bold">{formlabels.infoproperty.characteristics}</p>
                        <ul className="list-disc">
                          {imovel.caracteristicas!.map((item, index) => (
                            <li key={index} className="ml-4">
                              {/* @ts-ignore */}
                              {item.descricao}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="bg-white dark:bg-gray-700 rounded-md p-2">
                      <div className="text-dark-200 dark:text-white mb-4">
                        <p className="font-bold text-base sm:text-xl">
                          {formlabels.delegatevisit}
                        </p>
                        <p className="text-xs sm:text-sm">
                          {formlabels.requiredfields}
                        </p>
                      </div>
                      {/*corretor?.length === 0 ? (
                        <div className="mb-4">
                          <Alert
                            additionalContent={
                              <>
                                <div className="flex ml-8">
                                  <Link
                                    href={"/pesquisa"}
                                    className="text-xs sm:text-sm text-white bg-dark-200 focus:ring-4 font-medium rounded-lg px-4 py-1.5 focus:outline-none"
                                  >
                                    {formlabels.findbroker}
                                  </Link>
                                </div>
                              </>
                            }
                            color="warning"
                            icon={HiInformationCircle}
                          >
                            <p className="text-xs sm:text-sm">
                              {formlabels.warningmsg}
                            </p>
                          </Alert>
                        </div>
                      ) : (
                        <div></div>
                      )*/}
                      <div className="grid gap-3 gap-y-2 text-sm grid-cols-1 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200">
                              {formlabels.brokerdata}
                            </h4>
                            <Link
                              href={"/pesquisa"}
                              className={`text-xs sm:text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mb-1`}
                            >
                              {formlabels.findbroker}
                            </Link>
                          </div>
                          <hr className="h-px border-0 bg-gray-900 dark:bg-gray-200 mb-2" />
                          <div className="relative flex flex-col items-center rounded">
                            <button
                              ref={bttnRef}
                              type="button"
                              onClick={() => setIsOpen((prev) => !prev)}
                              className="text-xs sm:text-sm bg-gray-100 border border-gray-300 focus:outline-none focus:bg-white leading-tight text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200 dark:focus:bg-gray-700 focus:border-gray-500 p-2 w-full flex items-center justify-between rounded"
                            >
                              {select.length === 0 ? (
                                <span>{formlabels.selectbroker}</span>
                              ) : (
                                <span>{select}</span>
                              )}
                            </button>
                            {isOpen && corretor?.length! > 0 && (
                              <div
                                ref={dropdownRef}
                                className="text-xs sm:text-sm bg-gray-100 border text-gray-900 leading-tight focus:outline-none dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200 border-gray-500 absolute top-11 items-start rounded p-1 w-full z-50 gap-y-2 max-h-64 overflow-auto"
                              >
                                {corretor?.map((c) => {
                                  {/* @ts-ignore */}
                                  const withDescription: { id: string; descricao: string; }[] = c.tipoImovel?.filter((item: CorretorAssociado) => imovel.caracteristicas?.map((i) => i.id === item.id).includes(true));

                                  {/* @ts-ignore */}
                                  const withoutDescription: { id: string; descricao: string; }[] = c.tipoImovel?.filter((item: CorretorAssociado) => !imovel.caracteristicas?.map((i) => i.id === item.id).includes(true));

                                  return (
                                    <div
                                      key={c.id}
                                      onClick={() => {
                                        console.log(c);
                                        setSelect(c.nome!);
                                        setSelectedCorretor(c);
                                        setIsOpen(false);
                                      }}
                                      className="cursor-pointer rounded p-1 my-1 hover:bg-white dark:hover:bg-gray-700"
                                    >
                                      <div className="flex w-full justify-between mb-0.5 font-bold">
                                        <p>{c.nome}</p>
                                        <p>{`${imovel!.cidade}/${
                                          imovel!.estado
                                        }`}</p>
                                      </div>
                                      <hr className="h-px border-0 bg-gray-200 mb-0.5" />
                                      <div className="flex flex-wrap items-center mb-1">
                                        {formlabels.specialty}:
                                        {withDescription?.map((item, index) => (
                                          <div
                                            key={index}
                                            className={`flex justify-center mt-1 mx-1 font-medium px-1 border border-blue-300 text-dark-200 bg-blue-200 dark:bg-blue-100`}
                                          >
                                            <div className="font-normal leading-none max-w-full flex-initial">
                                              {item.descricao}
                                            </div>
                                          </div>
                                        ))}
                                        {withoutDescription?.map(
                                          (item, index) => (
                                            <div
                                              key={index}
                                              className={`flex justify-center mt-1 mx-1 font-medium px-1 border border-blue-300`}
                                            >
                                              <div className="font-normal leading-none max-w-full flex-initial">
                                                {item.descricao}
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <div className="pointer-events-none absolute right-0 flex items-center p-3 text-gray-900 dark:text-gray-200">
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

                        <div className="mt-2 sm:col-span-2">
                          <h4 className="mb-1 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200">
                            {formlabels.clientdata}
                          </h4>
                          <hr className="h-px border-0 bg-gray-900 dark:bg-gray-200 mb-2" />
                          <label className="text-gray-900 dark:text-gray-200 text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                            {formlabels.name}
                          </label>
                          <input
                            onChange={(e) => setNome(e.target.value)}
                            className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-900 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            id="client-name"
                            type="text"
                            pattern="(?=^.{4,}$)[A-Za-z\s]+"
                            placeholder=" "
                            required
                          />
                          <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            {formlabels.formlogs.invalidname}
                          </span>
                        </div>

                        <div className="mt-1 sm:col-span-2">
                          <label className="text-gray-900 dark:text-gray-200 text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                            {formlabels.phone}
                          </label>
                          <input
                            className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-900 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            id="client-phone"
                            type="tel"
                            onChange={handleChange}
                            value={phone}
                            pattern="(\(\d{2}\)\s?\d{4}-\d{4}|\(\d{2}\)\s?\d{5}-\d{4})"
                            placeholder=" "
                            required
                          />
                          <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            {formlabels.formlogs.invalidphone}
                          </span>
                        </div>

                        <div className="mt-1 sm:col-span-2">
                          <label className="text-gray-900 dark:text-gray-200 text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                            {formlabels.email}
                          </label>
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-900 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                            id="client-email"
                            type="email"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            placeholder=" "
                            required
                          />
                          <span className="mt-2 hidden text-xs italic text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            {formlabels.formlogs.invalidemail}
                          </span>
                        </div>

                        <div className="mt-2 sm:col-span-2">
                          <h4 className="mb-1 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200">
                            {formlabels.scheduling}
                          </h4>
                          <hr className="h-px border-0 bg-gray-900 dark:bg-gray-200" />
                        </div>
                        <div className="sm:col-span-1">
                          <label className="text-gray-900 dark:text-gray-200 text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                            {formlabels.date}
                          </label>
                          <input
                            onChange={(e) => setData(e.target.value)}
                            className={`text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-900 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 dark:[color-scheme:dark] ${
                              data !== "" &&
                              "invalid:[&:not(:focus)]:border-red-500"
                            } peer`}
                            id="visit-date"
                            type="date"
                            min={currentDate}
                            required
                          />
                          <span
                            className={`mt-2 hidden text-xs italic text-red-500 ${
                              data !== "" &&
                              "peer-[&:not(:focus):invalid]:block"
                            }`}
                          >
                            {formlabels.formlogs.invaliddate}
                          </span>
                        </div>

                        <div className="sm:col-span-1">
                          <label className="text-gray-900 dark:text-gray-200 text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                            {formlabels.time}
                          </label>
                          <input
                            onChange={(e) => setTime(e.target.value)}
                            className={`text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-900 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 dark:[color-scheme:dark] ${
                              time !== "" &&
                              "invalid:[&:not(:focus)]:border-red-500"
                            } peer`}
                            id="visit-time"
                            type="time"
                            min={`${
                              data === currentDate
                                ? `${new Date()
                                    .getHours()
                                    .toString()
                                    .padStart(2, "0")}:${new Date()
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0")}`
                                : "00:00"
                            }`}
                            max="23:59"
                            required
                          />
                          <span
                            className={`mt-2 hidden text-xs italic text-red-500 ${
                              time !== "" &&
                              "peer-[&:not(:focus):invalid]:block"
                            }`}
                          >
                            {formlabels.formlogs.invalidtime}
                          </span>
                        </div>

                        <div className="sm:col-span-2 text-right">
                          <div className="mt-4 inline-flex items-end">
                            <button
                              type="submit"
                              className={`p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2 group-invalid:pointer-events-none group-invalid:opacity-30 ${
                                select.length === 0 &&
                                "pointer-events-none opacity-30"
                              }`}
                            >
                              {formlabels.delegatevisit}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
