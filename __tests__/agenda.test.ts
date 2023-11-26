//TODOS:
/*

pega visitas de id corretor
pega visitas de id comporacao
pega visitas de id inexistente
apaga visita de id existente
apaga visita de id inexistente
edita visita de id existente
edita visita de id inexistente
envia email com id existente
envia email com id inexistente
envia email para data anterior

*/

import { deleteVisita, enviaEmail, getVisitasAceitasCorporacao, getVisitasAceitasCorretor } from '@/app/[lang]/agenda/agendaUtils';
import { clientSupabase } from '../lib/utils/clientSupabase';
import { serverSupabase } from '../lib/utils/serverSupabase';

const supabaseUrl = process.env.SUPABASE_TEST_URL
const supabaseKey = process.env.SUPABASE_ANON_TEST_KEY

jest.mock('next/headers', () => {
  return {
    cookies: () => {
      return {
        get: jest.fn(),
        set: jest.fn()
      }
    },
  }
})

const clientbase = clientSupabase(supabaseUrl, supabaseKey);
let serverbase: any;
serverSupabase(supabaseUrl, supabaseKey)
  .then(response => serverbase = response)

const resetDatabase = async () => {
  let result = []
  result.push(await serverbase.from("visita").upsert(
    {
      id: '77ff966c-aa9d-4f08-b959-11cdb652e7e0',
      idimovel: '586b448e-b336-4184-8605-97522a7e8605',
      idcorporacao: 'f858715d-41af-4188-8aac-bc292f2f5123',
      idcorretor: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
      dataagendamento: '2023-11-02 10:00:00+00',
      dadosmarcador: '{ "email": "email@email.com", "name": "Nome Marcador", "phone": "(11) 90000-0000" }',
      aceito: true,
    }));

  return result
}

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  return resetDatabase()
});

describe('Agenda Testes', () => {
  it('Deve obter visitas aceitas para um corretor com ID existente', async () => {
    const corretorId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
    const result = await getVisitasAceitasCorretor(serverbase, corretorId);

    expect(result).toBeTruthy();
  });

  it('Deve retornar false para um corretor com ID inexistente', async () => {
    const corretorId = 'corretor_id_inexistente';
    const result = await getVisitasAceitasCorretor(serverbase, corretorId);

    expect(result).toBeFalsy();
  });

  it('Deve obter visitas aceitas para uma corporacao com ID existente', async () => {
    const corretorId = 'f858715d-41af-4188-8aac-bc292f2f5123';
    const result = await getVisitasAceitasCorporacao(serverbase, corretorId);

    expect(result).toBeTruthy();
  });

  it('Deve retornar false para uma corporacao com ID inexistente', async () => {
    const corretorId = 'corporacao_id_inexistente';
    const result = await getVisitasAceitasCorporacao(serverbase, corretorId);

    expect(result).toBeFalsy();
  });

  it('Deve excluir uma visita com ID existente', async () => {
    const visitaIdExistente = '543f2874-11d6-413b-9a9b-293c6dbf65f9';
    const result = await deleteVisita(clientbase, visitaIdExistente);

    expect(result).toBeTruthy();
  });

  it('Deve retornar false para uma visita com ID inexistente', async () => {
    const visitaIdInexistente = 'visita_id_inexistente';
    const result = await deleteVisita(clientbase, visitaIdInexistente);

    expect(result).toBeFalsy();
  });

  it('Deve agendar email com sucesso', async () => {
    const clientEmail = "email@email";
    const clientName = "Nome Marcador";
    const visitDate = "2023-01-01T10:00:00+00:00";
    const surveyId = "fdac7d91-3f78-420f-82a6-91011548f372";

    const result = await enviaEmail(clientEmail, clientName, visitDate, surveyId);
    console.log("->>>>>" + result)
    const expected = {"message":"Email scheduled successfully"}
    
    expect(result).toEqual(expected)
  });

  it('Deve retornar false para o envio de email de uma visita que ainda não aconteceu', async () => {
    const clientEmail = "email@email";
    const clientName = "Nome Marcador";
    const visitDate = "2024-01-01T10:00:00+00:00";
    const surveyId = "fdac7d91-3f78-420f-82a6-91011548f372";

    const result = await enviaEmail(clientEmail, clientName, visitDate, surveyId);
    
    expect(result).toBeFalsy();
  });

})