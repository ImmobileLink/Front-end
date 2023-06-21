"use client";

import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";

import { Signup4 } from "@/app/i18n/dictionaries/types";
import { Dispatch, SetStateAction, useState } from "react";

interface Signup4Props {
  props: {
    creci: string;
    setCreci: Dispatch<SetStateAction<string>>;
    especialidade: { id: any; descricao: any }[];
    setEspecialidade: Dispatch<SetStateAction<{ id: any; descricao: any }[]>>;
    regiaoAtuacao: { id: any; regiao: any }[];
    setRegiaoAtuacao: Dispatch<SetStateAction<{ id: any; regiao: any }[]>>;
    especialidadesIncluidas: string[];
    setEspecialidadesIncluidas: Dispatch<SetStateAction<string[]>>;
    regioesIncluidas: string[];
    setRegioesIncluidas: Dispatch<SetStateAction<string[]>>;
  };
  tipoPerfil: number | undefined;
  setPodeAvancar: Dispatch<SetStateAction<boolean>>;
  setAlert: Dispatch<
    SetStateAction<{ type: string; title: string; message: string }>
  >;
  signup4: Signup4;
  data: {
    tipoImovel: { id: any; descricao: any }[] | null;
    regiao: { id: any; regiao: any }[] | null;
  };
}

export default function Signup4({
  props,
  tipoPerfil,
  setPodeAvancar,
  setAlert,
  signup4,
  data,
}: Signup4Props) {
  const [dropdownTipos, setDropdownTipos] = useState<boolean>(false); //vai reger esse dropdown de tipos de imóveis
  const [dropdownRegiao, setDropdownRegiao] = useState<boolean>(false); //vai reger esse dropdown de regioes de atuacao

  const validaForm = () => {
    setPodeAvancar(false);

    if (tipoPerfil == 1) {
      if (props.creci.length < 7) {
        setAlert({
          type: "warning",
          title: "",
          message: signup4.logs.invalidcreci,
        });

        return false;
      } else {
        setAlert({
          type: "warning",
          title: "",
          message: "",
        });
      }

      const regexCreci = /^\d{6}[a-zA-Z]$/;
      if (!regexCreci.test(props.creci)) {
        setAlert({
          type: "warning",
          title: "",
          message: signup4.logs.invalidcreci,
        });

        return false;
      } else {
        setAlert({
          type: "warning",
          title: "",
          message: "",
        });
      }
    } else {
    }

    setPodeAvancar(true);
  };

  const addEspecialidade = (id: any, descricao: any) => {
    if (!props.especialidadesIncluidas.includes(id)) {
      props.setEspecialidade((prev) => [
        ...prev,
        { id: id, descricao: descricao },
      ]);
      props.setEspecialidadesIncluidas((prev) => [...prev, id]);
    }
  };

  const removeEspecialidade = (id: any) => {
    props.setEspecialidade((prev) => prev.filter((item) => item.id !== id));
    props.setEspecialidadesIncluidas((prev) =>
      prev.filter((item) => item !== id)
    );
  };

  const addRegiao = (id: any, regiao: any) => {
    if (!props.regioesIncluidas.includes(id)) {
      props.setRegiaoAtuacao((prev) => [...prev, { id: id, regiao: regiao }]);
      props.setRegioesIncluidas((prev) => [...prev, id]);
    }
  };

  const removeRegiao = (id: any) => {
    props.setRegiaoAtuacao((prev) => prev.filter((item) => item.id !== id));
    props.setRegioesIncluidas((prev) => prev.filter((item) => item !== id));
  };

  return (
    <>
      <form className="sm:mx-auto sm:w-full sm:max-w-sm">
        {tipoPerfil == 1 ? (
          <div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                autoFocus
                maxLength={7}
                value={props.creci}
                onChange={(e) => props.setCreci(e.target.value)}
                onBlur={validaForm}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {signup4.creci}
                <span className="text-primaria">{" *"}</span>
              </label>
            </div>

            {/* ESPECIALIDADE */}

            <div className="relative w-full mb-6 group">
              <label className="font-medium text-gray-500 dark:text-gray-400">
                {signup4.speciality}
              </label>
              <div className="mt-3 ring-2 ring-gray-300 dark:ring-gray-500 rounded-lg p-2 h-fit">
                <AiFillPlusCircle
                  className="absolute text-xl right-3 hover:cursor-pointer hover:scale-110"
                  onClick={(e) => {
                    setDropdownTipos(!dropdownTipos);
                  }}
                />

                <div
                  className={
                    props.especialidadesIncluidas.length > 0
                      ? `flex flex-wrap gap-2`
                      : `flex flex-wrap gap-2 h-5`
                  }
                >
                  {props.especialidade?.map((item) => (
                    <div
                      className="flex bg-gray-500 dark:bg-gray-200 text-branco dark:text-black rounded-2xl px-2 w-fit"
                      key={item.id}
                    >
                      {item.descricao}
                      <AiFillCloseCircle
                        className="text-lg ml-2 self-center hover:cursor-pointer hover:scale-110"
                        onClick={(e) => removeEspecialidade(item.id)}
                      />
                    </div>
                  ))}
                </div>

                {dropdownTipos ? (
                  <ul className="z-40 absolute w-fit top-auto right-0 grid bg-white ring-1 ring-gray-500 rounded-sm text-black">
                    {data.tipoImovel?.map((item) => (
                      <li
                        className="px-2 cursor-pointer hover:bg-gray-200"
                        key={item.id}
                        onClick={(e) =>
                          addEspecialidade(item.id, item.descricao)
                        }
                      >
                        {item.descricao}
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* REGIAO */}
        <div>
          <div className="relative w-full mb-6 group">
            <label className="font-medium text-gray-500 dark:text-gray-400">
              {signup4.region}
            </label>
            <div className="mt-3 ring-2 ring-gray-300 dark:ring-gray-500 rounded-lg p-2 h-fit">
              <AiFillPlusCircle
                className="absolute text-xl right-3 hover:cursor-pointer hover:scale-110"
                onClick={(e) => {
                  setDropdownRegiao(!dropdownRegiao);
                }}
              />

              <div
                className={
                  props.regioesIncluidas.length > 0
                    ? `flex flex-wrap gap-2`
                    : `flex flex-wrap gap-2 h-5`
                }
              >
                {props.regiaoAtuacao?.map((item) => (
                  <div
                    className="flex bg-gray-500 dark:bg-gray-200 text-branco dark:text-black rounded-2xl px-2 w-fit"
                    key={item.id}
                  >
                    {item.regiao}
                    <AiFillCloseCircle
                      className="text-lg ml-2 self-center hover:cursor-pointer hover:scale-110"
                      onClick={(e) => removeRegiao(item.id)}
                    />
                  </div>
                ))}
              </div>

              {dropdownRegiao ? (
                <ul className="absolute w-fit top-auto right-0 grid bg-white ring-1 ring-gray-500 rounded-sm text-black">
                  {data.regiao?.map((item) => (
                    <li
                      className="px-2 cursor-pointer hover:bg-gray-200"
                      key={item.id}
                      onClick={(e) => addRegiao(item.id, item.regiao)}
                    >
                      {item.regiao}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
