import { getSurveyData, updateForm } from '@/app/[lang]/survey/[id]/surveyConfig';
import { clientSupabase } from '../lib/utils/clientSupabase';
import { serverSupabase } from '../lib/utils/serverSupabase';
import { FormDataProps } from 'lib/modelos';

interface SurveyData {
  formularioresposta: any; // Substitua "any" pelo tipo apropriado
  visita?: any; // Substitua "any" pelo tipo apropriado
}

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
  result.push(await serverbase.from("resultadoformulario").update(
    {
      campo1: null,
      campo2: null,
      campo3: null,
      campo4: null,
      campo5: null,
      campo6: null,
      campo7: null,
      campo8: null,
      campo9: null,
      campo10: null,
      status: false
    }).eq('id', 'fdac7d91-3f78-420f-82a6-91011548f372'));

  return result
}

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  return resetDatabase()
});

describe('Survey Testes', () => {

  it('Deve obter dados do survey com o ID existente', async () => {
    const idExistente = 'fdac7d91-3f78-420f-82a6-91011548f372';
    const result = await getSurveyData(serverbase, idExistente);

    if (result && typeof result === 'object' && 'formularioresposta' in result) {
      expect(result.formularioresposta).toBeTruthy();
      expect(result.visita).toBeTruthy();
    } else {
      fail('O resultado não é um objeto SurveyData válido.');
    }
  });

  it('Deve retornar a visita como undefined para o survey com ID inexistente', async () => {
    const idInexistente = 'fdac7d91-3f78-420f-82a6-91011548f370';
    const result = await getSurveyData(serverbase, idInexistente);

    if (result && typeof result === 'object' && 'formularioresposta' in result) {
      expect(result.formularioresposta).toBeTruthy();
      expect(result.visita).toBeUndefined();
    } else {
      fail('O resultado não é um objeto SurveyData válido.');
    }
  });

  it('Deve atualizar o formulário para um ID existente e retornar true', async () => {
    const surveyId = 'fdac7d91-3f78-420f-82a6-91011548f372';
    const formData: FormDataProps = {
      campo1: 5,
      campo2: 5,
      campo3: 5,
      campo4: 5,
      campo5: 5,
      campo6: 5,
      campo7: 5,
      campo8: 5,
      campo9: 5,
      campo10: "TESTE",
    };

    const result = await updateForm(clientbase, formData, surveyId);

    expect(result).toBeTruthy();
  });

  it('Deve retornar false em caso de erro ao atualizar o formulário', async () => {
    const surveyId = 'idinexistente';
    const formData: FormDataProps = {
      campo1: 5,
      campo2: 5,
      campo3: 5,
      campo4: 5,
      campo5: 5,
      campo6: 5,
      campo7: 5,
      campo8: 5,
      campo9: 5,
      campo10: "TESTE",
    };

    const result = await updateForm(clientbase, formData, surveyId);

    expect(result).toBeFalsy();
  });
})