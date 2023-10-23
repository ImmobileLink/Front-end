'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/../../lib/database.types';
import { getEstadoBtnConexao, desassociarPerfis, sendConvite, cancelaConvite, aceitarConvite, getIdConexao } from '../../../../../../../../../lib/Utils/Conexao'
import { Spinner } from "flowbite-react";
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useProfileStore } from '../../../../../../../../../lib/store/profileStore';

interface botaoAddProps {

}



export default function BotaoAssocia({ }: botaoAddProps) {
  const supabase = createClientComponentClient<Database>({});

  const state = useProfileStore.getState()


  const [estado, setEstado] = useState("Solicitar amizade");
  const [idConexao, setIdConexao] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const conexoes = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'conexoes', filter: `id=eq.${idConexao}` },
      (payload) => {
        switch (payload.eventType) {
          case "INSERT":
            if (estado == "Solicitar amizade") {
              setEstado("Aceitar amizade")
            }

          case "DELETE":
            if (estado == "Amigo") {
              setEstado("Solicitar amizade")
            }

          case "UPDATE":
            if (estado == "Pendente") {
              setEstado("Amigo")
            } else if (estado == "Aceitar amizade") {
              setEstado("Solicitar amizade")
            }
        }
      }
    ).subscribe()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getEstadoBtnConexao(state.profileData?.id!, state.sessionData?.id!)
      if (data!.length > 0) {
        if (data![0].pendente) {
          if (data![0].iniciativa == state.sessionData?.id!) {
            setEstado("Pendente")
          } else {
            setEstado("Aceitar amizade")
          }
        } else {
          setEstado("Amigo")
        }
      }
      setLoading(false);
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchId = async () => {
      const { data } = await getIdConexao(state.profileData?.id!, state.sessionData?.id!)
      if (data!.length > 0) {
        setIdConexao(data![0].id)
      }else{
        setIdConexao(undefined)
      }
    }
    fetchId()
  }, [estado])


  const desassocia = async () => {
    setEstado("Solicitar amizade")

    const { data, error } = await desassociarPerfis(idConexao!)

    if (error) {
      setEstado("Amigo")
    }
    props.setOpenModal(undefined)
  }



  const handleClick = async () => {

    if (estado == "Solicitar amizade") {
      setEstado("Pendente")

      const { data, error } = await sendConvite(state.profileData?.id!, state.sessionData?.id!)
      if (error) {
        setEstado("Solicitar amizade")
      }

    } else if (estado === "Pendente") {
      setEstado("Solicitar amizade")
      const { data, error } = await cancelaConvite(idConexao!)

      if (error) {
        setEstado("Pendente")
      }

    } else if (estado === "Amigo") {
      props.setOpenModal('pop-up')

    } else if (estado === "Aceitar amizade") {
      setEstado("Amigo")
      const { data, error } = await aceitarConvite(idConexao!)

      if (error) {
        setEstado("Aceitar amizade")
      }
    }
  };

  const close = () => {
    props.setOpenModal(undefined)
  }

  const buttonClass = classNames('py-2 px-4 rounded', {
    'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ': estado === 'Solicitar amizade',
    'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 ': estado === 'Amigo',
    'bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 ': estado === 'Pendente',
    'bg-blue-800 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 ': estado === 'Aceitar amizade'
  });


  return (
    <>
      <button onClick={handleClick} className={`min-w-[100px] h-[40px] text-white font-medium rounded-lg text-sm mb-1 mr-3 ${buttonClass}`}>
        {
          loading ? (<Spinner />) : (estado)
        }
      </button>

      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Você tem certeza que deseja remover a amizade?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={desassocia}>
                Sim, tenho certeza
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                Não, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
}
