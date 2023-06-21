"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


interface CalendarioProps { }

export default function Calendario({ }: CalendarioProps) {
    const [value, onChange] = useState(new Date());

    return (
        <div className='flex items-center flex-col'>
            <h1 className='font-bold mb-3'>Visitas Agendadadas</h1>
            <div className='w-4/5'>
                <Calendar
                    className="rounded-md w"
                    onChange={onChange}
                    value={value}
                />
            </div>

        </div>
    );
}
