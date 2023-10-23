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
    return fdata
  }