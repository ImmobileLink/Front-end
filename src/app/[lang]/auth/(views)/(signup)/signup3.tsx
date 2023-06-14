"use client";

import { Signup3 } from "@/app/i18n/dictionaries/types";
import { Dispatch, SetStateAction } from "react";

interface Signup3Props {
  props: {
    nome: string;
    setNome: Dispatch<SetStateAction<string>>;
    nomeFantasia: string;
    setNomeFantasia: Dispatch<SetStateAction<string>>;
    cpf: string;
    setCpf: Dispatch<SetStateAction<string>>;
    cnpj: string;
    setCnpj: Dispatch<SetStateAction<string>>;
    telefone: string;
    setTelefone: Dispatch<SetStateAction<string>>;
    celular: string;
    setCelular: Dispatch<SetStateAction<string>>;
    comercial: string;
    setComercial: Dispatch<SetStateAction<string>>;
    cep: string;
    setCep: Dispatch<SetStateAction<string>>;
    estado: string;
    setEstado: Dispatch<SetStateAction<string>>;
    cidade: string;
    setCidade: Dispatch<SetStateAction<string>>;
    bairro: string;
    setBairro: Dispatch<SetStateAction<string>>;
    logradouro: string;
    setLogradouro: Dispatch<SetStateAction<string>>;
    numero: number;
    setNumero: Dispatch<SetStateAction<number>>;
    complemento: string;
    setComplemento: Dispatch<SetStateAction<string>>;
  };
  tipoPerfil: number | undefined;
  setPodeAvancar: Dispatch<SetStateAction<boolean>>;
  setAlert: Dispatch<
    SetStateAction<{ type: string; title: string; message: string }>
  >;
  signup3: Signup3;
}

export default function Signup3({
  props,
  tipoPerfil,
  setPodeAvancar,
  setAlert,
  signup3,
}: Signup3Props) {
  const validaForm = () => {
    setPodeAvancar(false);

    if (tipoPerfil == 1) {
      if (props.nome.length < 10) {
        setAlert({
          type: "warning",
          title: "",
          message: signup3.logs.invalidname,
        });

        return false;
      } else {
        setAlert({
          type: "warning",
          title: "",
          message: "",
        });
      }

      if (props.cpf.length != 11) {
        setAlert({
          type: "warning",
          title: "",
          message: signup3.logs.invalidcpf,
        });

        return false;
      } else {
        setAlert({
          type: "warning",
          title: "",
          message: "",
        });
      }

      if (props.cnpj.length != 14 && props.cnpj.length != 0) {
        setAlert({
          type: "warning",
          title: "",
          message: signup3.logs.invalidcnpj,
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
      if (props.nomeFantasia.length < 10) {
        setAlert({
          type: "warning",
          title: "",
          message: signup3.logs.invalidfantasyname,
        });

        return false;
      } else {
        setAlert({
          type: "warning",
          title: "",
          message: "",
        });
      }

      if (props.cnpj.length != 14) {
        setAlert({
          type: "warning",
          title: "",
          message: signup3.logs.invalidcnpj,
        });

        return false;
      } else {
        setAlert({
          type: "warning",
          title: "",
          message: "",
        });
      }
    }

    if (
      (props.celular.length != 11 && props.celular.length != 0) ||
      (props.telefone.length != 11 && props.telefone.length != 0) ||
      (props.comercial.length != 11 && props.comercial.length != 0)
    ) {
      setAlert({
        type: "warning",
        title: "",
        message: signup3.logs.invalidphone,
      });

      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    if (props.cep.length != 8) {
      setAlert({
        type: "warning",
        title: "",
        message: signup3.logs.invalidcep,
      });

      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    if (props.estado.length < 2) {
      setAlert({
        type: "warning",
        title: "",
        message: signup3.logs.invaliduf,
      });

      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    if (props.cidade.length < 2) {
      setAlert({
        type: "warning",
        title: "",
        message: signup3.logs.invalidcity,
      });

      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    if (props.bairro.length < 2) {
      setAlert({
        type: "warning",
        title: "",
        message: signup3.logs.invalidneighborhood,
      });

      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    if (props.logradouro.length < 2) {
      setAlert({
        type: "warning",
        title: "",
        message: signup3.logs.invalidstreet,
      });

      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    if (props.numero < 0) {
      setAlert({
        type: "warning",
        title: "",
        message: signup3.logs.invalidnumber,
      });

      return false;
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: "",
      });
    }

    setPodeAvancar(true);
  };

  const autoCompletaEndereco = async () => {
    if (parseInt(props.cep)) {
      if (props.cep.length == 8) {
        const res = await fetch(`https://viacep.com.br/ws/${props.cep}/json/`);
        const data = await res.json();

        if (!data.erro) {
          props.setEstado(data.uf);
          props.setCidade(data.localidade);
          props.setBairro(data.bairro);
          props.setLogradouro(data.logradouro);
          props.setComplemento(data.complemento);

          setAlert({
            type: "warning",
            title: "",
            message: "",
          });
        }
      }
    } else {
      setAlert({
        type: "warning",
        title: "",
        message: signup3.logs.invalidcep,
      });
    }
  };

  return (
    <>
      <form className=" sm:mx-auto sm:w-full sm:max-w-sm">
        {/* os dados que diferem de um corretor pra uma empresa */}
        {tipoPerfil == 1 ? (
          <div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                autoFocus
                value={props.nome}
                onChange={(e) => props.setNome(e.target.value)}
                onBlur={validaForm}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {signup3.name}
                <span className="text-primaria">{" *"}</span>
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  maxLength={11}
                  value={props.cpf}
                  onChange={(e) => props.setCpf(e.target.value)}
                  onBlur={validaForm}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  {signup3.cpf} <span className="text-primaria">{" *"}</span>
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  maxLength={14}
                  value={props.cnpj}
                  onChange={(e) => props.setCnpj(e.target.value)}
                  onBlur={validaForm}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  {signup3.cnpj}
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                autoFocus
                value={props.nomeFantasia}
                onChange={(e) => props.setNomeFantasia(e.target.value)}
                onBlur={validaForm}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {signup3.fantasyname}
                <span className="text-primaria">{" *"}</span>
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                maxLength={14}
                required
                value={props.cnpj}
                onChange={(e) => props.setCnpj(e.target.value)}
                onBlur={validaForm}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {signup3.cnpj}
                <span className="text-primaria">{" *"}</span>
              </label>
            </div>
          </div>
        )}

        {/* celular & telefone */}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              maxLength={11}
              value={props.celular}
              onChange={(e) => props.setCelular(e.target.value)}
              onBlur={validaForm}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {signup3.phone1}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              maxLength={11}
              value={props.telefone}
              onChange={(e) => props.setTelefone(e.target.value)}
              onBlur={validaForm}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {signup3.phone2}
            </label>
          </div>
        </div>

        {/* comercial & { cep & UF } */}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              maxLength={11}
              value={props.comercial}
              onChange={(e) => props.setComercial(e.target.value)}
              onBlur={validaForm}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {signup3.phone3}
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                maxLength={8}
                value={props.cep}
                onChange={(e) => props.setCep(e.target.value)}
                onBlur={autoCompletaEndereco}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {signup3.cep}
                <span className="text-primaria">{" *"}</span>
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                maxLength={2}
                value={props.estado}
                onChange={(e) => props.setEstado(e.target.value)}
                onBlur={validaForm}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {signup3.uf}
                <span className="text-primaria">{" *"}</span>
              </label>
            </div>
          </div>
        </div>

        {/* cidade & bairro */}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={props.cidade}
              onChange={(e) => props.setCidade(e.target.value)}
              onBlur={validaForm}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {signup3.city}
              <span className="text-primaria">{" *"}</span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              maxLength={11}
              value={props.bairro}
              onChange={(e) => props.setBairro(e.target.value)}
              onBlur={validaForm}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {signup3.neighborhood}
              <span className="text-primaria">{" *"}</span>
            </label>
          </div>
        </div>

        {/* rua */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={props.logradouro}
            onChange={(e) => props.setLogradouro(e.target.value)}
            onBlur={validaForm}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {signup3.street}
            <span className="text-primaria">{" *"}</span>
          </label>
        </div>

        {/* numero & complemento */}
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="string"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={props.numero}
              onChange={(e) => props.setNumero(parseInt(e.target.value))}
              onBlur={validaForm}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {signup3.number}
              <span className="text-primaria">{" *"}</span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              maxLength={11}
              value={props.complemento}
              onChange={(e) => props.setComplemento(e.target.value)}
              onBlur={validaForm}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {signup3.complement}
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
