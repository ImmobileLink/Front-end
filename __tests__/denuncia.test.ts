import { clientSupabase } from '../lib/utils/clientSupabase';
import { getPublicacaoPorIdAPI, submitReportAPI } from '@/app/[lang]/denuncia/[id]/denunciaUtils';

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

const clientbase = clientSupabase(supabaseUrl, supabaseKey)

const resetDatabase = async () => {
    let result = []
    result.push(await clientbase.from('denuncia').delete().neq("id", 'b6693eba-e3bf-4102-af80-0d837177da00'))
    return result
}

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    return resetDatabase()
});

const pubId = 'b6693eba-e3bf-4102-af80-0d837177da00';
const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';

describe('Denuncia Tests', () => {
  it('Deve obter publicação por ID', async () => {
    const result = await getPublicacaoPorIdAPI(pubId, clientbase);
    console.log(result)
    expect(result).toBeTruthy();
  });

  it('Deve submeter um relatório', async () => {
    const publicacao = {
      id: pubId,
      idautor: userId,
      avatar: 'nopfp',
      nomeautor: 'Nome Autor',
      regiao: JSON.stringify({estado: "SP", cidade: "São Paulo"}),
      conteudo: 'Conteúdo da publicação',
      imagem: 'imagem.jpg',
      criadoem: '2023-11-04',
      atualizadoem: '2023-11-04',
    };
    const motivo = 'Motivo do relatório';
    const descricao = 'Descrição do relatório';

    const result = await submitReportAPI(userId, publicacao, motivo, descricao, clientbase);
    console.log(result)
    expect(result).toBeTruthy();
  });
});
