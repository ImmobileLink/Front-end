export async function getUserEstadoAPI(userId: string, supabase: any) {
  const { data: estado, error } = await supabase.rpc('get_user_estado', { id_usuario: userId })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return estado
  }
}

export async function getCorretores(estado: string, supabase: any) {
  let { data, error } = await supabase
    .rpc('obter_corretores_por_estado', {
      estadoinputado: estado
    })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data;
  }
}

export async function getCorretoresPorAvaliacaoAPI(avaliacao: number, supabase: any) {
  console.log(avaliacao)
  let { data, error } = await supabase
    .rpc('get_corretores_por_avaliacao', {
      avaliacao: avaliacao
    })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export async function getCorretoresPorAvaliacaoEstadoAPI(avaliacao: number, estado: string, supabase: any) {
  let { data, error } = await supabase
    .rpc('get_corretores_por_avaliacao_estado', {
      avaliacao: avaliacao,
      estadobuscado: estado
    })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export async function getCorretoresPorAvaliacaoEstadoCidadeAPI(avaliacao: number, estado: string, cidade: string, supabase: any) {
  let { data, error } = await supabase
    .rpc('get_corretores_por_avaliacao_estado_cidade', {
      avaliacao: avaliacao,
      cidadebuscada: cidade,
      estadobuscado: estado
    })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export async function getCorretoresPorAvaliacaoTipoImovelAPI(avaliacao: number, tiposimovel: string[], supabase: any) {
  let { data, error } = await supabase
    .rpc('get_corretores_por_avaliacao_tipoimovel', {
      avaliacao,
      tiposimovel
    })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export async function getCorretoresPorAvaliacaoEstadoTipoImovelAPI(avaliacao: number, estadobuscado: string, tiposimovel: string[], supabase: any) {
  let { data, error } = await supabase
    .rpc('get_corretores_por_avaliacao_estado_tipoimovel', {
      avaliacao,
      estadobuscado,
      tiposimovel,
    })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export async function getCorretoresPorAvaliacaoEstadoCidadeTipoImovelAPI(avaliacao: number, cidadebuscada: string, estadobuscado: string, tiposimovel: string[], supabase: any) {
  let { data, error } = await supabase
    .rpc('get_corretores_por_avaliacao_estado_cidade_tipoimovel', {
      avaliacao,
      cidadebuscada,
      estadobuscado,
      tiposimovel
    })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export async function getEmpresasAPI(supabase: any) {
  let { data, error } = await supabase
  .rpc('get_empresas')
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export async function getEmpresasPorEstadoAPI(estadobuscado: string, supabase: any) {
  let { data, error } = await supabase
  .rpc('get_empresas_por_estado', {
    estadobuscado
  })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export async function getEmpresasPorEstadoCidadeAPI(estadobuscado: string, cidadebuscada: string, supabase: any) {
  let { data, error } = await supabase
  .rpc('get_empresas_por_estado_cidade', {
    cidadebuscada,
    estadobuscado
  })
  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}




