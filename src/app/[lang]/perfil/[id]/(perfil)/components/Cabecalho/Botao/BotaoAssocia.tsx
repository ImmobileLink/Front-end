'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/../../lib/database.types';
import { getEstadoBtnAssoc, desassociarPerfis, sendConvite, cancelaConvite, aceitarConvite } from '../../../../../../../../../lib/utils/Associacao'
import { Spinner } from "flowbite-react";
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useProfileStore } from '../../../../../../../../../lib/store/profileStore';

interface botaoAddProps {
  
}



export default function BotaoAssocia({  }: botaoAddProps) {
  const supabase = createClientComponentClient<Database>({});

  const state = useProfileStore.getState()

 const idProfile = state.profileData?.id!
 const idSession = state.sessionData?.id!
 const typeSession = state.sessionData?.type

  const [estado, setEstado] = useState("Associar");
  const [loading, setLoading] = useState<boolean>(true)

  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const getId = () => {
    let corporacao = null
    let corretor = null
    if (typeSession == "corporacao") {
      corporacao = idSession
      corretor = idProfile
    } else {
      corporacao = idProfile
      corretor = idSession
    }
    return { corporacao, corretor }
  }

  const id = getId()

  const channelA = supabase
    .channel('associacao_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'associacoes',
        filter: `idcorretor=eq.${id.corretor}`,
      },
      (payload) => {
       if(payload.new.idcorporacao =! id.corporacao){
        return;
       }
        switch (payload.eventType) {
          case "INSERT":
            if (estado == "Associar") {
              setEstado("Aceitar")
            }

          case "DELETE":
            if (estado == "Associado") {
              setEstado("Associar")
            }

          case "UPDATE":
            if (estado == "Pendente") {
              setEstado("Associado")
            } else if (estado == "Aceitar") {
              setEstado("Associar")
            }
        }
      }
    )
    .subscribe()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getEstadoBtnAssoc(id.corretor, id.corporacao)

      if (data!.length > 0) {
        if (data![0].pendente) {
          if (data![0].iniciativa == idSession) {
            setEstado("Pendente")
          } else {
            setEstado("Aceitar")
          }
        } else {
          setEstado("Associado")
        }
      }
      setLoading(false);
    }
    fetchData()
  }, [])


  const desassocia = async () => {
    setEstado("Associar")

    const { data, error } = await desassociarPerfis(id.corretor, id.corporacao)

    if (error) {
      setEstado("Associado")
    }
    props.setOpenModal(undefined)
  }



  const handleClick = async () => {

    if (estado == "Associar") {
      setEstado("Pendente")

      const { data, error } = await sendConvite(id.corretor, id.corporacao, idSession)
      if (error) {
        setEstado("Associar")
      }

    } else if (estado === "Pendente") {
      setEstado("Associar")

      const { data, error } = await cancelaConvite(id.corretor, id.corporacao)

      if (error) {
        setEstado("Pendente")
      }

    } else if (estado === "Associado") {
      props.setOpenModal('pop-up')

    } else if (estado === "Aceitar") {
      setEstado("Associado")
      const { data, error } = await aceitarConvite(id.corretor, id.corporacao)

      if (error) {
        setEstado("Aceitar")
      }
    }
  };

  const close = () => {
    props.setOpenModal(undefined)
  }

  const buttonClass = classNames('py-2 px-4 rounded', {
    'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ': estado === 'Associar',
    'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 ': estado === 'Associado',
    'bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 ': estado === 'Pendente',
    'bg-blue-800 hover:bg-blue-900 dark:bg-blue-800  dark:hover:bg-blue-900 ': estado === 'Aceitar'
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
              Você tem certeza que deseja de desassociar?
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
