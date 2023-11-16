"use client"

import { useEffect, useState } from "react";
import { Modal, Rating } from 'flowbite-react';
import RatingSkeleton from "../loading/RatingSkeleton";
import { getAvaliacoes, getNotaMedia } from "../../../perfilUtils/RatingProfile";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import { BsPersonCircle } from "react-icons/bs";
import { clientSupabase } from "lib/utils/clientSupabase";

type Avaliacao = {
    id: string;
    nome_cliente: string;
    avaliacao: string;
    nota: number;
}

export default function RatingCount() {
    const supabase = clientSupabase()
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
    const id = useProfileStore.getState().profileData?.id!
    const [avaliacao, setAvaliacao] = useState<Avaliacao[] | null>([])
    const [nota, setNota] = useState<number | null>()

    const dict = useProfileStore.getState().dict!.profile

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await getAvaliacoes(id, supabase)
            const { notaMedia, errorNota } = await getNotaMedia(id, supabase)
            if (!error && !errorNota) {
                setAvaliacao(data)
                setNota(notaMedia?.nota)
            }
        }
        fetchData()
    }, [])

    const isPremium = useProfileStore.getState().profileData?.isPremium
    const isLogged = useProfileStore.getState().sessionData?.id

    const handleClick = () => {
        if (avaliacao && avaliacao.length > 0) {
            props.setOpenModal('default')
        }
    }


    return (
        <>


            <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{avaliacao ? (avaliacao.length > 0 ? nota : 'N/A') : 'N/A'}
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <a href="#" onClick={handleClick} className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{avaliacao ? (`${avaliacao.length} ${dict.rating}`) : (<>{dict.withoutRating}</>)}</a>
            </div>

            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>{dict.rating}</Modal.Header>
                <Modal.Body>
                    {
                        avaliacao?.map((item: Avaliacao, index) => {
                            const nota = item.nota; // Acessa a nota do item

                            // Mapeamento condicional para preencher estrelas com base na nota
                            const stars = [1, 2, 3, 4, 5].map((starNumber) => (
                                <Rating.Star key={starNumber} filled={starNumber <= nota} />
                            ));

                            return (
                                <ul key={item.id} role="list" className="divide-gray-200 dark:divide-gray-700">
                                    <li className={`py-3 sm:py-4 border-gray-300 ${index < avaliacao.length - 1 ? 'border-b' : ''}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <BsPersonCircle size={30} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                {isLogged && isPremium && (
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {item.nome_cliente}
                                                    </p>
                                                )}

                                                {isLogged && isPremium ? (
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {item.avaliacao}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {dict.ratingPremium}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <Rating>{stars}</Rating>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            );
                        })
                    }
                </Modal.Body>
            </Modal>

        </>




    )
}