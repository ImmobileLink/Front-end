"use client";
import { useState } from "react";
import { HiDocumentAdd } from "react-icons/hi/";
import HistoricoPopup from "./HistoricoPopup";
import HistoricoCard from "./HistoricoCard";
import { useProfileStore } from "@/../../lib/store/profileStore";
import { useProfileContext } from "../../../../context/ProfileContext";

type ItemHistorico = {
    data_fim: string | null;
    data_inicio: string;
    descricao: string | null;
    id_corporacao: string | null;
    id_corretor: string;
    nome_empresa: string | null;
    id: string | null;
}

interface HistoricoProps { }

export default function Historico({ }: HistoricoProps) {

    const [openModal, setOpenModal] = useState<string | undefined>();

    const [idEditHistorico, setIdEditHistorico] = useState<string | null>()
    const props = { openModal, setOpenModal, idEditHistorico, setIdEditHistorico };


    const state = useProfileStore.getState()


    const { historico } = useProfileContext()


    return (
        <div>
            <div className="flex flex-row items-center gap-5 mb-3">
                <h2 className="font-semibold text-xl">{state.dict!.profile.historic}</h2>
                {state.isOwn && <HiDocumentAdd className="cursor-pointer" size={20} onClick={() => props.setOpenModal('default')} />}
            </div>

            {historico?.length == 0 && (<p className="text-gray-500 dark:text-gray-400">Sem histórico de trabalho até o momento</p>)}

            <HistoricoPopup props={props} />

            {historico?.map((item: ItemHistorico) => {
                return (
                    <HistoricoCard item={item} props={props} key={item.id} />
                );
            })}
        </div>


    );
}
