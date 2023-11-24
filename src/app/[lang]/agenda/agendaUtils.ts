import { Agenda } from "@/app/i18n/dictionaries/types"

export const getVisitasAceitasCorretor = async (supabase: any, id: string) => {
  let { data, error } = await supabase.rpc('obter_visitas_aceitas_pelo_corretor', {
    corretor_id: id
  })

  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export const getVisitasAceitasCorporacao = async (supabase: any, id: string) => {
  let { data, error } = await supabase.rpc('obter_visitas_da_corporacao', {
    corporacao_id: id!
  })

  if (error) {
    console.log(error)
    return false
  }
  else {
    return data
  }
}

export const deleteVisita = async (supabase: any, id: string) => {
  const { error } = await supabase.from("visita").delete().eq("id", id);

  if (error) {
    console.log(error)
    return false
  }
  else {
    return true
  }
}

export const enviaEmail = async (clientEmail: string, clientName: string, visitDate: string, surveyId: string) => {
  try {
    // const url = 'http://localhost:3000/api/survey'; para testes
    const url = '/api/survey';

    let schedule = new Date();
    schedule.setMinutes(schedule.getMinutes() + 3);

    const requestBody = {
      clientEmail: clientEmail,
      clientName: clientName,
      visitDate: visitDate,
      surveyId: surveyId,
      scheduledDate: schedule
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    
    const data = await response.json();

    return data;

  } catch (error) {
    return false;
  }

}

export const updateVisita = async (supabase: any, data: string, time: string, id: string) => {
  const { error } = await supabase.from("visita").update({ dataagendamento: `${data} ${time}:00-03` }).eq('id', id);

  if (error) {
    console.log(error)
    return false
  }
  else {
    return true
  }
}