"use client";

import { Feed } from "@/app/i18n/dictionaries/types";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsFillExclamationCircleFill, BsFillImageFill } from "react-icons/bs";
import { City } from "../../../../../lib/modelos";
import { publishPost } from "../../../../../lib/utils/Posts";
import { _UFs } from "../../../../../lib/utils/getRegiao";
import Avatar from "../Avatar";
import ImageUpload from "../ImageUpload";

interface PostFormCardProps {
  textos: Feed,
  idusuario: string,
}

export default function PostFormCard({ textos, idusuario }: PostFormCardProps) {
  const [selectedState, setSelectedState] = useState<string>()
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>()
  const [texto, setTexto] = useState("")
  const [erro, setErro] = useState<boolean>(false)
  const [logErro, setLogErro] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [imagem, setImagem] = useState<File>()

  const inserePub = async () => {
    if (!texto) {
      setErro(true);
      setLogErro(textos.form.writeamessage);
    } else if (!selectedCity) {
      setErro(true);
      setLogErro(textos.form.cityselector.selectacity);
    } else {
      setLoading(true);
      const response = await publishPost({ idusuario, selectedCity, texto, imagem })
      setErro(false);
      setLogErro("");
      setLoading(false);
      setTexto("");
    }
  }

  useEffect(() => {
    async function fetchCities() {
      if (selectedState) {
        try {
          setLoading(true)
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`);
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

    fetchCities();
  }, [selectedState]);

  const handleImageUpload = async (file: File | false) => {
    if (file) {
      setImagem(file);
      setErro(false);
      console.log(file);
    } else {
      setImagem(undefined);
      setErro(true);
      setLogErro(textos.form.imageerror);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex mx-4 gap-4">
        <Avatar userId={idusuario} />
        <div className="flex grow">
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 border-gray-300 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={texto}
            placeholder={textos.form.placeholder}
            onChange={(e) => setTexto(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col mt-2 ml-auto mr-4 lg:flex-row gap-y-4 justify-between items-end lg:items-center align-middle space-x-4">
        <div className="flex mr-4 gap-1 lg:mr-0 items-center justify-center text-yellow-500">
          {
            erro &&
            (
              <>
                <BsFillExclamationCircleFill />
                <span>{logErro}</span>
              </>
            )
          }
        </div>
        <ImageUpload onImageUpload={handleImageUpload} label={<BsFillImageFill/>}/>
        <div className="w-fit flex justify-center align-middle">
            {/* <label className="mr-2">{textos.form.cityselector.estate}:</label> */}
            <select defaultValue={textos.form.cityselector.selectacity}  onChange={e => { setSelectedState(e.target.value) }} className="w-20 mr-4 bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {
                _UFs.map(item => {
                  return (
                    <option key={item}>{item}</option>
                  )
                })
              }
            </select>
            {/* <label className="mr-2">{textos.form.cityselector.city}:</label> */}
            <select defaultValue={textos.form.cityselector.selectacity} onChange={e => { setSelectedCity(e.target.value) }} className="w-52 bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {
                selectedState ? (
                  cities.length > 0 ? (
                    cities.map(city => (
                      <option
                        className="px-2 cursor-pointer hover:bg-gray-200"
                        key={city.nome}
                        value={city.nome}
                      >{city.nome}</option>
                    ))
                  ) : (
                    <option value="" disabled>{textos.form.cityselector.nocityfound}</option>
                  )
                ) : (
                  <option value="" disabled>{textos.form.cityselector.selectaestatefirst}</option>
                )
              }
            </select>
        </div>
        <div className="justify-end items-center">
          <button onClick={inserePub} className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">
            {
              loading ? (<Spinner />) : (<span>{textos.form.post}</span>)
            }
          </button>
        </div>
      </div>
    </div>
  );
}
