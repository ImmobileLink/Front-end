'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getEstadoBtnAssoc, desassociarPerfis, sendConvite, cancelaConvite, aceitarConvite } from '../../../../perfilUtils/Associacao'
import { Spinner } from "flowbite-react";
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useProfileStore } from '../../../../../../../../../lib/store/profileStore';
import { clientSupabase } from 'lib/utils/clientSupabase';

interface botaoAddProps {

}



export default function BotaoAssocia({ }: botaoAddProps) {
  const supabase = clientSupabase()

  const state = useProfileStore.getState()

  const idProfile = state.profileData?.id!
  const idSession = state.sessionData?.id!
  const typeSession = state.sessionData?.type

  const dict = state.dict!.profile.buttonProfile.buttonAssociate

  const [estado, setEstado] = useState("sendAssociate");
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
        if (payload.new.idcorporacao !== id.corporacao) {
          return;
        }
        switch (payload.eventType) {
          case "INSERT":
            if (estado == "sendAssociate") {
              setEstado("accept")
            }

          case "DELETE":
            if (estado == "associate") {
              setEstado("sendAssociate")
            }

          case "UPDATE":
            if (estado == "pending") {
              setEstado("associate")
            } else if (estado == "accept") {
              setEstado("sendAssociate")
            }
        }
      }
    )
    .subscribe()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getEstadoBtnAssoc(id.corretor, id.corporacao, supabase)

      if (data!.length > 0) {
        if (data![0].pendente) {
          if (data![0].iniciativa == idSession) {
            setEstado("pending")
          } else {
            setEstado("accept")
          }
        } else {
          setEstado("associate")
        }
      }
      setLoading(false);
    }
    fetchData()
  }, [])


  const desassocia = async () => {
    setEstado("sendAssociate")

    const result = await desassociarPerfis(id.corretor, id.corporacao, supabase)

    if (!result) {
      setEstado("associate")
    }
    props.setOpenModal(undefined)
  }



  const handleClick = async () => {

    if (estado == "sendAssociate") {
      setEstado("pending")

      const result = await sendConvite(id.corretor, id.corporacao, idSession, supabase)
      if (!result) {
        setEstado("sendAssociate")
      }

    } else if (estado === "pending") {
      setEstado("sendAssociate")

      const { data, error } = await cancelaConvite(id.corretor, id.corporacao, supabase)

      if (error) {
        setEstado("pending")
      }

    } else if (estado === "associate") {
      props.setOpenModal('pop-up')

    } else if (estado === "accept") {
      setEstado("associate")
      const result = await aceitarConvite(id.corretor, id.corporacao, supabase)

      if (!result) {
        setEstado("accept")
      }
    }
  };

  const close = () => {
    props.setOpenModal(undefined)
  }

  const buttonClass = classNames('py-2 px-4 rounded', {
    'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ': estado === 'sendAssociate',
    'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 ': estado === 'associate',
    'bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 ': estado === 'pending',
    'bg-blue-800 hover:bg-blue-900 dark:bg-blue-800  dark:hover:bg-blue-900 ': estado === 'accept'
  });


  return (
    <>
      <button onClick={handleClick} className={`min-w-[100px] h-[40px] text-white font-medium rounded-lg text-sm mb-1 mr-3 ${buttonClass}`}>
        {
          loading ? (<Spinner />) : (
            (estado === 'sendAssociate' && dict.sendAssociate) ||
            (estado === 'associate' && dict.associate) ||
            (estado === 'pending' && dict.pending) ||
            (estado === 'accept' && dict.accept)
          )
        }
      </button>

      <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {dict.questionDisassociate}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={desassocia}>
                {dict.confirmDisassociate}
              </Button>
              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                {dict.cancelDisassociate}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
}
