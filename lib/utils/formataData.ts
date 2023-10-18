export const formataData = (datahora:string, dateformat:string = 'pt-BR') => {
    let data = new Date(datahora)
    const formatter = new Intl.DateTimeFormat(dateformat, {
      year: 'numeric',
      'month': 'numeric',
      'day': 'numeric',
      'hour': 'numeric',
      'minute': 'numeric'
    });
    let fdata = formatter.format(data)
    return fdata
  }