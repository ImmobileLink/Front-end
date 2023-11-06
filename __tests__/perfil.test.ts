import { getAvaliacoes, getNotaMedia } from '@/app/[lang]/perfil/[id]/perfilUtils/RatingProfile';
import { clientSupabase } from '../lib/utils/clientSupabase';
import { serverSupabase } from '../lib/utils/serverSupabase';
import * as fs from 'fs';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'lib/database.types';
import { aceitarConvite, desassociarPerfis, getEstadoBtnAssoc, sendConvite } from '@/app/[lang]/perfil/[id]/perfilUtils/Associacao';
import { Historico } from 'lib/modelos';
import { deleteHistorico, insertHistorico, updateHistorico } from '@/app/[lang]/perfil/[id]/perfilUtils/Historico';
import { getDataDashboard1, getDataDashboard2, getDataDashboard3, getDataDashboard4 } from '@/app/[lang]/perfil/[id]/perfilUtils/Dashboard';
import { updateCorretorProfile } from '@/app/[lang]/perfil/[id]/perfilUtils/EditProfile';

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
let serverbase: SupabaseClient<Database>;
serverSupabase(supabaseUrl, supabaseKey)
    .then(response => serverbase = response)

describe('Perfil Tests', () => {
    it('Deve retornar nota media do usuario', async () => {


        const idProfile = 'ad3154c7-35da-40e5-8e5c-f0fcba24f0e8'

        const { notaMedia, errorNota } = await getNotaMedia(idProfile, clientbase)

        expect(notaMedia).toHaveProperty('nota');

    })

    /* it('Deve retornar avaliacoes', async () => {

        const idProfile = 'ad3154c7-35da-40e5-8e5c-f0fcba24f0e8'

        const { data, error } = await getAvaliacoes(idProfile, clientbase)

        expect(Array.isArray([])).toBe(true);
    }) */

    it('Deve retornar se usuarios possuem Associacao', async () => {

        const idProfile = 'ad3154c7-35da-40e5-8e5c-f0fcba24f0e8'
        const idCorporacao = 'f858715d-41af-4188-8aac-bc292f2f5123'

        const { data, error } = await getEstadoBtnAssoc(idProfile, idCorporacao, serverbase)

        expect(Array.isArray(data)).toBe(true);

    })

    it('Deve enviar convite de associação para corretor', async () => {

        const idProfile = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'
        const idCorporacao = 'f858715d-41af-4188-8aac-bc292f2f5123'

        const result = await sendConvite(idProfile, idCorporacao, idCorporacao, serverbase)

        expect(result).toBe(true);

    })

    it('Deve aceitar convite de associação', async () => {

        const idProfile = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'
        const idCorporacao = 'f858715d-41af-4188-8aac-bc292f2f5123'

        const result = await aceitarConvite(idProfile, idCorporacao, serverbase)

        expect(result).toBe(true);

    })

    it('Deve se desassociar da empresa', async () => {

        const idProfile = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'
        const idCorporacao = 'f858715d-41af-4188-8aac-bc292f2f5123'

        const result = await desassociarPerfis(idProfile, idCorporacao, serverbase)

        expect(result).toBe(true);

    })

    it('Deve retornar array de dados dashboard1', async () => {

        const idProfile = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'

        const { data1, error } = await getDataDashboard1(idProfile, clientbase)

        expect(Array.isArray(data1)).toBe(true);

    })

    it('Deve retornar array de dados dashboard2', async () => {

        const idProfile = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'

        const { data2, error } = await getDataDashboard2(idProfile, clientbase)

        expect(Array.isArray(data2)).toBe(true);

    })

    it('Deve retornar array de dados dashboard3', async () => {

        const idProfile = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'

        const { data3, error } = await getDataDashboard3(idProfile, clientbase)

        expect(Array.isArray(data3)).toBe(true);

    })

    it('Deve retornar array de dados dashboard4', async () => {

        const idProfile = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'

        const { data4, error } = await getDataDashboard4(idProfile, clientbase)

        expect(Array.isArray(data4)).toBe(true);

    })

    it('Deve adicionar histórico', async () => {

        const historico1: Historico = [
            {
                data_fim: "2022-12-31",
                data_inicio: "2022-01-01",
                descricao: "Histórico 1",
                id: "3ea325c2-cdad-4a46-8cec-9367dd117cae",
                id_corporacao: null,
                id_corretor: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
                nome_empresa: "Empresa A"
            }
        ];

        const result = await updateHistorico(historico1, clientbase)

        expect(result).toBe(true);
    })

    it('Deve editar histórico', async () => {

        const historico1: Historico = [
            {
                data_fim: "2022-12-31",
                data_inicio: "2022-01-01",
                descricao: "Histórico 1 - editado",
                id: "3ea325c2-cdad-4a46-8cec-9367dd117cae",
                id_corporacao: null,
                id_corretor: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
                nome_empresa: "Empresa A"
            }
        ];

        const result = await updateHistorico(historico1, clientbase)

        expect(result).toBe(true);
    })

    it('Deve excluir histórico', async () => {

        const result = await deleteHistorico("3ea325c2-cdad-4a46-8cec-9367dd117cae", clientbase)

        expect(result).toBe(true);
    })

    it('Deve editar informações do perfil com sucesso', async () => {

        const idProfile = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'

        const formData = {
            nome: 'João',
            sobre: 'Silva',
            cep: '12345-678',
            cidade: 'São Paulo',
            bairro: 'Centro',
            logradouro: 'Rua Principal',
            numero: '123',
            complemento: 'Apto 4',
            uf: 'SP',
        }

        const result = await updateCorretorProfile(formData, idProfile, clientbase)

        expect(result).toBe(true);
    })
})