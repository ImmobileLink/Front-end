"use client";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useProfileStore } from '../../../../lib/store/profileStore';
import Link from 'next/link';
import "dayjs/locale/en";
import "dayjs/locale/pt";
import { getDiasVisita } from '../perfil/[id]/perfilUtils/CalendarioProfile';
import { clientSupabase } from 'lib/utils/clientSupabase';



interface CalendarioProps {

}

async function fetchData(date: Dayjs, id1: string, id2: string | undefined, { signal }: { signal: AbortSignal }, supabase:any) {

  const { data, error } = await getDiasVisita(date, id1, id2, supabase)

  if (error) {
    console.error(error)
  } else {
    return data
  }

}

function obterDataAtualFormatada() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0 (janeiro = 0)
  const dia = hoje.getDate().toString().padStart(2, '0');
  const dataFormatada = `${ano}-${mes}-${dia}`;
  return dataFormatada;
}

const initialValue = dayjs(obterDataAtualFormatada());

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🏠' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}



export default function Calendario({ }: CalendarioProps) {
  const supabase = clientSupabase()
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState<number[]>([]);

  const state = useProfileStore.getState()
  const dict = state.dict!.profile
  const id1 = state.profileData?.id!
  const id2 = state.isOwn ? undefined : state.sessionData?.id!

  const fetchHighlightedDays = async (date: Dayjs) => {

    const controller = new AbortController();
    const daysToHighlight = await fetchData(date, id1, id2, { signal: controller.signal, }, supabase)
    if (daysToHighlight) {
      const newHighlightedDays = daysToHighlight.map((item:any) => item.diavisita);
      setHighlightedDays(prev => [...prev, ...newHighlightedDays]);
    }
    setIsLoading(false);


    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dict.calendarLang}>
      <div className='flex flex-col items-center justify-center'>
        <DateCalendar
          className='text-black font-bold'
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          sx={{
            '.MuiDateCalendar-root': {
              className: 'text-white'
            },
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
        />
        <Link href={'/agenda'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[200px] text-center'>{dict.visitPanel}</Link>
      </div>

    </LocalizationProvider>
  );
}
