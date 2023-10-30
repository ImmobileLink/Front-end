import { Database } from '../lib/testdatabase.types';
import { insertMessage } from '../src/app/[lang]/chat/[[...idsala]]/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import * as fs from 'fs';
import * as path from 'path';
import fileType from 'file-type';

// Define the file path for your test image
const imagePath = path.join(__dirname, 'sample.png');

const supabaseUrl = 'https://ospngptazhdbtvitjjil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcG5ncHRhemhkYnR2aXRqamlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNDc1MDgsImV4cCI6MTk5ODYyMzUwOH0.WFH96R2eES_U8D_A0TYKah3LT3ROeo3solvCHChn-mo';
const supabase = createClientComponentClient<Database>({ supabaseUrl, supabaseKey })

it('Deve inserir mensagem sem imagem', async () => {
    const message = {
        idautor: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
        idsala: '0426d7c3-c8d6-4b13-b272-b1126ebe40bf',
        mensagem: 'Test message',
        imagem: undefined,
    };

    const result = await insertMessage(message, supabase);

    expect(result).toBe(true);
});

it('Deve inserir mensagem com imagem', async () => {

    const imagePath = __dirname + '/sample.png'; // Substitua pelo caminho real para sua imagem

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

    const result = await insertMessage(message, supabase);

    expect(result).toBe(true);
});

it('Deve retornar false para envio não sucedido', async () => {
    const message = {
        idautor: 'a', //ID inválido
        idsala: 'a', //ID inválido
        mensagem: 'Test message',
        imagem: undefined,
    };

    const result = await insertMessage(message, supabase);

    expect(result).toBe(false);
});

