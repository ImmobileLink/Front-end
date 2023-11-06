import { clientSupabase } from '../lib/utils/clientSupabase';
import { serverSupabase } from '../lib/utils/serverSupabase';
import { insertMessage, getRoomData, getLastMessages } from '../src/app/[lang]/chat/[[...idsala]]/chatUtils';
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
    result.push(await serverbase.from('mensagem').delete().neq("id", '084f7f8e-6137-4faa-9c6e-5d46e2757e3a'))
    result.push(await serverbase.from('notificacao').delete().neq("id", '084f7f8e-6137-4faa-9c6e-5d46e2757e3a'))
    return result
}

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    return resetDatabase()
});

describe('Chat Tests', () => {
    it('Deve inserir mensagem sem imagem', async () => {
        const message = {
            idautor: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
            idsala: '0426d7c3-c8d6-4b13-b272-b1126ebe40bf',
            mensagem: 'Test message',
            imagem: undefined,
        };

        const result = await insertMessage(message, clientbase);

        expect(result).toBe(true);
    });

    it('Deve inserir mensagem com imagem', async () => {

        const imagePath = __dirname + '/sample.png';

        let image = undefined;

        fs.readFile(imagePath, (err, data) => {
            image = data;
        });

        const message = {
            idautor: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
            idsala: '0426d7c3-c8d6-4b13-b272-b1126ebe40bf',
            mensagem: 'Test message with image',
            imagem: image,
        };

        const result = await insertMessage(message, clientbase);

        expect(result).toBe(true);
    });

    it('Deve retornar false para envio de mensagem não sucedido', async () => {
        const message = {
            idautor: 'a', //ID inválido
            idsala: 'a', //ID inválido
            mensagem: 'Test message',
            imagem: undefined,
        };

        const result = await insertMessage(message, clientbase);

        expect(result).toBe(false);
    });

    it('Deve retornar as últimas mensagens de cada sala', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'
        const result = getLastMessages(userId, clientbase)
        expect(result).toBeTruthy;
    })

    it('Não deve retornar as últimas mensagens de cada sala caso id do usuário não exista', async () => {
        const userId = undefined
        const result = getLastMessages(userId, clientbase)
        expect(result).toBeFalsy;
    })

    it('Deve retornar dados da sala (mensagens + dados do destinatário)', async () => {
        const idsala = '0426d7c3-c8d6-4b13-b272-b1126ebe40bf';

        const result = await getRoomData(idsala, serverbase)

        expect(result).toBeTruthy;
    })
})

