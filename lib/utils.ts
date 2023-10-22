export const formataData = (datahora:string) => {
    let data = new Date(datahora)
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      'month': 'numeric',
      'day': 'numeric',
      'hour': 'numeric',
      'minute': 'numeric'
    });
    let fdata = formatter.format(data)
}

export const formataDataSemHora = (datahora:string) => {
  let data = new Date(datahora)
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    'month': 'numeric',
    'day': 'numeric'
  });
  let fdata = formatter.format(data)
  return fdata
}

export const getCurrentDateTimeWithTimezone = () => {
  const currentDate = new Date();

  // Obtém o dia, mês, ano, hora, minutos e segundos
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Meses são indexados de 0 a 11
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Obtém a diferença de minutos entre o horário local e o UTC
  const timezoneOffsetMinutes = currentDate.getTimezoneOffset();

  // Calcula o sinal do offset
  const timezoneOffsetSign = timezoneOffsetMinutes > 0 ? '-' : '+';

  // Calcula o offset em horas
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffsetMinutes / 60));

  // Formata os valores para garantir que tenham dois dígitos
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedTimezoneOffsetHours = timezoneOffsetHours < 10 ? `0${timezoneOffsetHours}` : timezoneOffsetHours;

  // Cria uma string com a data, hora e fuso horário formatados
  const currentDateTimeString = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}${timezoneOffsetSign}${formattedTimezoneOffsetHours}`;

  return currentDateTimeString;
};

export const isDateBeforeCurrent = (specificDate: string) => {
  const specificDateObj = new Date(specificDate);
  const currentDateTimeObj = new Date(getCurrentDateTimeWithTimezone());

  // Compare as datas usando a função getTime(), que retorna o timestamp
  return specificDateObj.getTime() < currentDateTimeObj.getTime();
};