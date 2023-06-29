"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Database } from '../../../../lib/database.types';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

interface CalendarioProps {
    ownId: any;
    idProfile: any;
}

type Visita = {
    dataAgendamento: string;
}

type Eventos = {
    title: string;
    date: string;
}

const supabase = createClientComponentClient<Database>()


export default function Calendario({ ownId, idProfile }: CalendarioProps) {
    const [visitas, setVisitas] = useState<Visita[] | null>()

    useEffect(() => {
        const fetchData = async () => {
            let { data: visita, error } = await supabase
                .from('visita')
                .select('dataAgendamento')
                .eq('idcorretor', idProfile)
            setVisitas(visita)
        }
        fetchData()
    }, [])

    console.log(visitas)


    let eventos: { title: string; date: string; }[] = []

    if (visitas) {
        visitas.map((item) => {
            eventos.push({ title: "visita", date: item.dataAgendamento.substring(0, 10) })
        })
    }
    /* (prev: any) => [...prev, { title: "visita", date: item.dataAgendamento }] */



    /*   if (!props.especialidadesIncluidas.includes(id)) {
          props.setEspecialidade((prev) => [
            ...prev,
            { id: id, descricao: descricao },
          ]);
          props.setEspecialidadesIncluidas((prev) => [...prev, id]);
        } */

    return (
        <div className='flex items-center flex-col'>
            <div className='w-4/5'>

                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    weekends={false}
                    headerToolbar={false}
                    height={400}


                    events={eventos}




                />
            </div>
        </div>
    );
}
