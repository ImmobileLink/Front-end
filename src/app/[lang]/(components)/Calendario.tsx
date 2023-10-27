"use client";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../lib/database.types';
import { useProfileStore } from '../../../../lib/store/profileStore';



interface CalendarioProps {

}

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */

const state = useProfileStore.getState()
async function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {

  const supabase = createClientComponentClient<Database>()


  let { data, error } = await supabase
    .rpc('getdiasvisita', {
      anoparam: date.year(),
      id_cor: state.profileData?.id!,
      mesparam: 10
    })
    console.log(data)
  if (error) console.error(error)
  else return data




  /*  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
       const timeout = setTimeout(() => {
           const daysInMonth = date.daysInMonth();
           const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

           resolve({ daysToHighlight });
       }, 500);

       signal.onabort = () => {
           clearTimeout(timeout);
           reject(new DOMException('aborted', 'AbortError'));
       };
   }); */
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
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState<number[]>([]);

  const fetchHighlightedDays = async (date: Dayjs) => {
    console.log(date)

    const controller = new AbortController();
    const daysToHighlight = await fakeFetch(date, { signal: controller.signal, })
    if (daysToHighlight) {
      const newHighlightedDays = daysToHighlight.map(item => item.diavisita);
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}
