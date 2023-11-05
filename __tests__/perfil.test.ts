import { getAvaliacoes, getNotaMedia } from '@/app/[lang]/perfil/[id]/perfilUtils/RatingProfile';
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

describe('Perfil Tests', () => {
    it('deve retornar nota media do usuario', async () => {
        const idProfile = '7a03a9e0-bace-4b07-86f3-676f70d59f0c'

        const { notaMedia, errorNota } = await getNotaMedia(idProfile, clientbase)

        expect(notaMedia).toHaveProperty('nota');

    })
})