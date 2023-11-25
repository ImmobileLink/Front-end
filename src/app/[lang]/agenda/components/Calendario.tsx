"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg } from '@fullcalendar/core';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import enLocale from '@fullcalendar/core/locales/en-au';
import 'react-calendar/dist/Calendar.css';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import listPlugin from '@fullcalendar/list';
import { useState } from 'react';
import { VisitaProps } from '../../../../../lib/modelos';
import { Agenda } from '@/app/i18n/dictionaries/types';
import EditModal from './EditModal';
import ModalEvento from './ModalEvento';
import ModalConfirmaEvento from './ModalConfirmaEvento';

interface CalendarioProps {
    type: string;
    visitas: VisitaProps[] | null;
    locale: string;
    dict: Agenda;
}

export default function Calendario({ type, visitas, locale, dict }: CalendarioProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [eventoAtivo, setEventoAtivo] = useState<VisitaProps>()

    //let eventos: { title: string, date: string, data: VisitaProps }[] = [];

    const getEventColor = (evento: VisitaProps): string => {
        return evento.visita_status == true ? '#4CAF50' : '#ff4907';
    };

    const getTitleVisita = (evento: VisitaProps) => {
        return evento.visita_status ? evento.nome_marcador : dict.waiting
    }

    const currentDate = new Date();

    const filteredEventos = visitas
        ? visitas.filter(
            (visita) =>
                visita.visita_status ||
                (new Date(visita.data_agendamento) > currentDate && !visita.visita_status)
        )
        : [];

    const eventos = filteredEventos.map((visita) => ({
        title: getTitleVisita(visita),
        date: visita.data_agendamento,
        data: visita,
        backgroundColor: getEventColor(visita),
    }));

    const handleClick = (e: EventClickArg) => {
        // alert(JSON.stringify(e.event));
        if (!isModalOpen) {
            setEventoAtivo(e.event.extendedProps.data);
            if (e.event.extendedProps.data.visita_status === true) {
                openModal();
            } else {
                openConfirmaModal();
            }
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const openConfirmaModal = () => {
        setIsConfirmModalOpen(true)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    closeConfirmModal

    return (
        <>
            <FullCalendar
                locale={locale === "pt" ? ptLocale : enLocale}
                plugins={[
                    listPlugin,
                    dayGridPlugin,
                    multiMonthPlugin,
                    interactionPlugin,
                ]}
                initialView='dayGridMonth'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'listYear,dayGridMonth,multiMonthYear'
                }}
                nowIndicator={true}
                selectable={true}
                events={eventos}
                eventClick={e => handleClick(e)}
                viewClassNames={isModalOpen || isEditModalOpen ? "blur-sm bg-white text-black" : "bg-white text-black"}
                dayHeaderClassNames={"bg-gray-300"}
                height={"100%"}
            />
            {isModalOpen && (
                <ModalEvento
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    evento={eventoAtivo}
                    type={type}
                    dict={dict}
                    openEditModal={openEditModal}
                />
            )}

            {isConfirmModalOpen && (
                <ModalConfirmaEvento
                    isOpen={isConfirmModalOpen}
                    onClose={closeConfirmModal}
                    evento={eventoAtivo}
                    type={type}
                    dict={dict}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    evento={eventoAtivo}
                    dict={dict}
                />
            )}

        </>
    );

}