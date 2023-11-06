import { getBrokersData, deletePostAPI, publishPost, salvarPublicacaoAPI, removerPublicacaoSalvaAPI, getPublicacoesSalvasAPI, getPublicacoesSalvasPorEstadoAPI, getPublicacoesSalvasPorEstadoCidadeAPI } from '@/app/[lang]/feed/feedUtils';
import { clientSupabase } from '../lib/utils/clientSupabase';
import { serverSupabase } from '../lib/utils/serverSupabase';

import * as fs from 'fs';

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
let serverbase: any;
serverSupabase(supabaseUrl, supabaseKey)
    .then(response => serverbase = response)

const resetDatabase = async () => {
    let result = []
    result.push(await serverbase.from('publicacao').delete().neq("id", 'b6693eba-e3bf-4102-af80-0d837177da00'))
    return result
}

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    return resetDatabase()
});

describe('Feed Tests', () => {
    it('Deve inserir uma postagem', async () => {
        const imagePath = __dirname + '/sample.png';

        let image = undefined;

        fs.readFile(imagePath, (err, data) => {
            image = data;
        });
        const postForm = {
            idusuario: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
            regiao: {
                estado: "SP",
                cidade: "São Paulo"
            },
            texto: 'Texto da postagem',
            imagem: image
        };
        const result = await publishPost(postForm, clientbase);
        expect(result).toBeTruthy();
    });

    it('Deve obter publicações (salvas ou não)', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
        const result = await getPublicacoesSalvasAPI(userId, clientbase);
        expect(result).toBeTruthy();
    });

    it('Deve obter dados dos corretores', async () => {
        const result = await getBrokersData(clientbase);
        expect(result).toBeTruthy();
    });

    it('Deve salvar uma publicação', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
        const publicacoes = await getPublicacoesSalvasAPI(userId, clientbase);
        const postId = publicacoes[0].id;   
        const savedItem = {
            idusuario: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
            idpublicacao: postId,
        };
        const result = await salvarPublicacaoAPI(savedItem, clientbase);
        expect(result).toBeTruthy();
    });

    it('Deve obter publicações salvas por estado', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
        const estado = '"SP": "São Paulo"';
        const result = await getPublicacoesSalvasPorEstadoAPI(userId, estado, clientbase);
        expect(result).toBeTruthy();
    });

    it('Deve obter publicações salvas por estado e cidade', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
        const estado = '"SP": "São Paulo"';
        const cidade = 'São Paulo';
        const result = await getPublicacoesSalvasPorEstadoCidadeAPI(userId, estado, cidade, clientbase);
        expect(result).toBeTruthy();
    });

    it('Deve remover uma publicação salva', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
        const publicacoes = await getPublicacoesSalvasAPI(userId, clientbase);
        const postId = publicacoes[0].id;   
        const idpublicacao = postId;
        const result = await removerPublicacaoSalvaAPI(userId, idpublicacao, clientbase);
        expect(result).toBeTruthy();
    });

    it('Deve excluir uma postagem', async () => {   
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
        const publicacoes = await getPublicacoesSalvasAPI(userId, clientbase);
        const postId = publicacoes[0].id;   
        const result = await deletePostAPI(postId, clientbase);
        expect(result).toBeTruthy();
    });
});
