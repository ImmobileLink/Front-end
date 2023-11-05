import { setPremiumFalse, setPremiumTrue } from '@/app/[lang]/plano/planoUtils';
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

const clientbase = clientSupabase(supabaseUrl, supabaseKey)
let serverbase: any;
serverSupabase(supabaseUrl, supabaseKey)
.then(response => serverbase = response)

describe('Testes para setPremiumTrue e setPremiumFalse', () => {
    const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'; 
  
    it('setPremiumTrue - Deve definir premium como true para um corretor com sucesso', async () => {
      const result = await setPremiumTrue(userId, 'corretor', clientbase);
  
      expect(result).toBe(true);
    });
  
    it('setPremiumTrue - Deve definir premium como true para uma corporação com sucesso', async () => {
      const result = await setPremiumTrue(userId, 'corporacao', clientbase);
  
      expect(result).toBe(true);
    });
  
    it('setPremiumFalse - Deve definir premium como false para um corretor com sucesso', async () => {
      const result = await setPremiumFalse(userId, 'corretor', clientbase);
  
      expect(result).toBe(true);
    });
  
    it('setPremiumFalse - Deve definir premium como false para uma corporação com sucesso', async () => {
      const result = await setPremiumFalse(userId, 'corporacao', clientbase);
  
      expect(result).toBe(true);
    });
  });