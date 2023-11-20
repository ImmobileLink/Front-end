"use client";

import { AiFillEdit } from 'react-icons/ai'
import { HiTrash } from 'react-icons/hi'
import { useProfileStore } from "@/../../lib/store/profileStore"
import { deleteHistorico } from '../../../../../perfilUtils/Historico';
import { useProfileContext } from '../../../../context/ProfileContext';
import { clientSupabase } from 'lib/utils/clientSupabase';
import toast from 'react-hot-toast';

interface HistoricoCardProps {
    item: ItemHistorico;
    props: any;
}

type ItemHistorico = {
    data_fim: string | null;
    data_inicio: string;
    descricao: string | null;
    id_corporacao: string | null;
    id_corretor: string;
    nome_empresa: string | null;
    id: string | null;
}

export default function HistoricoCard({ item, props }: HistoricoCardProps) {
    const supabase = clientSupabase()

    const isOwn = useProfileStore.getState().isOwn
    const dict = useProfileStore.getState().dict?.profile.infos.profile.historic

    const { historico, setHistorico } = useProfileContext()

    const apagarHistorico = async () => {
        const result = await deleteHistorico(item.id!, supabase)

        const newHistorico = historico!.filter((hist) => hist.id != item.id)

        if (result) {
            toast.success('Histórico apagado')
            setHistorico(newHistorico)
        }else{
            toast.error('Erro ao deletar histórico')
        }
    }

    const editHistorico = () => {
        props.setIdEditHistorico(item.id)
        props.setOpenModal('default')

    }

    return (
        <>
            <ol className="relative border-l border-gray-200 dark:border-gray-500">
                <li className=" ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-500 dark:bg-gray-700"></div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4">
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.data_inicio}</time>
                            <div className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">-</div>
                            {item.data_fim ? (
                                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.data_fim}</time>
                            ) : (<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{dict?.untilMoment}</time>)}
                        </div>
                        {isOwn &&
                            <div className='flex flex-row gap-3 '>
                                <HiTrash className='cursor-pointer' size={20} onClick={apagarHistorico} />
                                <AiFillEdit className='cursor-pointer' size={20} onClick={editHistorico} />
                            </div>
                        }


                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.nome_empresa}</h3>
                    <p className="pb-6 text-base font-normal text-gray-500 dark:text-gray-400">{item.descricao}</p>

                </li>

            </ol>
        </>
    );
}
