import { FormDataProps } from "lib/modelos"

export const getSurveyData = async (supabase: any, id: string) => {
  const { data, error } = await supabase.from("resultadoformulario").select("idvisita, status").eq("id", id).limit(1)

  if (error) {
    console.log(error)
    return false
  }
  if (data && data?.length >= 1) {
    const { data: obter_dados_survey, error } = await supabase.rpc("obter_dados_survey", { visita_id: data[0].idvisita })

    if (error) {
      console.log(error)
      return false
    }

    return ({
      formularioresposta: data,
      visita: obter_dados_survey
    })
  }

  return ({
    formularioresposta: data
  })
}

export const updateForm = async (supabase: any, formData: FormDataProps, surveyId: string) => {
  const { error } = await supabase.from("resultadoformulario").update(
    {
      campo1: formData.campo1,
      campo2: formData.campo2,
      campo3: formData.campo3,
      campo4: formData.campo4,
      campo5: formData.campo5,
      campo6: formData.campo6,
      campo7: formData.campo7,
      campo8: formData.campo8,
      campo9: formData.campo9,
      campo10: formData.campo10,
      status: true
    }
  ).eq("id", surveyId)

  if (error) {
    console.log(error)
    return false
  }
  else {
    return true
  }
}