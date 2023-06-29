import Calendario from "../Calendario";

interface NavCalendarProps {
  userData: {
    id: string | undefined;
    identificador: string | undefined;
    premium: boolean | undefined;
    role: number | undefined;
  };
}

export default async function NavCalendar({ userData }: NavCalendarProps) {
  // return <><Calendario /></>;
  return <></>;
}
