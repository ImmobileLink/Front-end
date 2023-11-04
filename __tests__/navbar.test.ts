import { getMessageNotificationsAPI, getNotificationsAPI } from '@/app/[lang]/(components)/(navbar)/navbarUtils';
import { clientSupabase } from '../lib/utils/clientSupabase';

const supabaseUrl = process.env.SUPABASE_TEST_URL
const supabaseKey = process.env.SUPABASE_ANON_TEST_KEY

const clientbase = clientSupabase(supabaseUrl, supabaseKey);

describe('NavBar Tests', () => {

    it('Deve retornar notificações do usuário', async () => {
        const idusuario = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'
        const result = getNotificationsAPI(idusuario, clientbase)
        expect(result).toBeTruthy
    });

    it('Deve retornar notificações de mensagem do usuário', async () => {
        const idusuario = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'
        const result = getMessageNotificationsAPI(idusuario, clientbase)
        expect(result).toBeTruthy
    });
});