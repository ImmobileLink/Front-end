"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import FullCalendar from '@fullcalendar/react';
import { Database } from '../../../../../lib/database.types';
import { EventClickArg } from '@fullcalendar/core';

import ptLocale from '@fullcalendar/core/locales/pt-br';
import enLocale from '@fullcalendar/core/locales/en-au';

import 'react-calendar/dist/Calendar.css';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import listPlugin from '@fullcalendar/list';
import ModalEvento from './ModalEvento';
import { useState } from 'react';
import { VisitaProps } from '../../../../../lib/modelos';
import { Agenda } from '@/app/i18n/dictionaries/types';

interface CalendarioProps {
    userId: string;
    visitas: VisitaProps[] | null;
    locale: string;
    dict: Agenda;
}

export default function Calendario({ userId, visitas, locale, dict }: CalendarioProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventoAtivo, setEventoAtivo] = useState<VisitaProps>()

    let eventos: { title: string, date: string, data: VisitaProps }[] = [];

    if (visitas) {
        visitas.map((visita) => {
            eventos.push({ title: visita.nome_marcador, date: visita.data_agendamento, data: visita })
        })
    }

    const handleClick = (e: EventClickArg) => {
        // alert(JSON.stringify(e.event));
        if(!isModalOpen) {
            setEventoAtivo(e.event.extendedProps.data)
            openModal()
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                initialView='listWeek'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'listWeek,dayGridMonth,multiMonthYear'
                }}
                nowIndicator={true}
                selectable={true}
                events={eventos}
                eventClick={e => handleClick(e)}
                viewClassNames={isModalOpen ? "blur-sm bg-white text-black" : "bg-white text-black"}
                dayHeaderClassNames={"bg-gray-300"}
                height={"100%"}
            />
            <ModalEvento isOpen={isModalOpen} onClose={closeModal} evento={eventoAtivo} dict={dict}/>
        </>
    );

}