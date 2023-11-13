import { getUserEstadoAPI, getCorretores, getCorretoresPorAvaliacaoAPI, getCorretoresPorAvaliacaoEstadoAPI, getCorretoresPorAvaliacaoEstadoCidadeAPI, getCorretoresPorAvaliacaoTipoImovelAPI, getCorretoresPorAvaliacaoEstadoTipoImovelAPI, getCorretoresPorAvaliacaoEstadoCidadeTipoImovelAPI, getEmpresasAPI, getEmpresasPorEstadoAPI, getEmpresasPorEstadoCidadeAPI } from '@/app/[lang]/pesquisa/pesquisaUtils';
import { clientSupabase } from '../lib/utils/clientSupabase';

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

describe('Pesquisa Tests', () => {
    const estado = 'SP'; 
    const cidade = 'Sao Paulo'; 
    const avaliacao = 5; 
    const tiposImovel = ['b52fd833-2e9f-4f23-b11a-73abdbf34b16', 'f6586d3b-159d-454b-b514-d582d11f9f06'];
  
    it('getUserEstadoAPI - Deve retornar o estado do usuário', async () => {
      const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e'; 
  
      const userEstado = await getUserEstadoAPI(userId, clientbase);
  
      expect(userEstado).toBeDefined();
      expect(userEstado).toBeTruthy;
    });
  
    it('getCorretores - Deve retornar corretores por estado', async () => {
      const corretores = await getCorretores(estado, clientbase);
  
      expect(Array.isArray(corretores)).toBe(true);
      expect(corretores).toBeTruthy;
    });
  
    it('getCorretoresPorAvaliacaoAPI - Deve retornar corretores por avaliação', async () => {
      const corretoresAvaliacao = await getCorretoresPorAvaliacaoAPI(avaliacao, clientbase);
  
      expect(Array.isArray(corretoresAvaliacao)).toBe(true);
      expect(corretoresAvaliacao).toBeTruthy;
    });
  
    it('getCorretoresPorAvaliacaoEstadoAPI - Deve retornar corretores por avaliação e estado', async () => {
      const corretoresAvaliacaoEstado = await getCorretoresPorAvaliacaoEstadoAPI(avaliacao, estado, clientbase);
  
      expect(Array.isArray(corretoresAvaliacaoEstado)).toBe(true);
      expect(corretoresAvaliacaoEstado).toBeTruthy;
    });
  
    it('getCorretoresPorAvaliacaoEstadoCidadeAPI - Deve retornar corretores por avaliação, estado e cidade', async () => {
      const corretoresAvaliacaoEstadoCidade = await getCorretoresPorAvaliacaoEstadoCidadeAPI(avaliacao, estado, cidade, clientbase);
  
      expect(Array.isArray(corretoresAvaliacaoEstadoCidade)).toBe(true);
      expect(corretoresAvaliacaoEstadoCidade).toBeTruthy;
    });
  
    it('getCorretoresPorAvaliacaoTipoImovelAPI - Deve retornar corretores por avaliação e tipos de imóvel', async () => {
      const corretoresAvaliacaoTipoImovel = await getCorretoresPorAvaliacaoTipoImovelAPI(avaliacao, tiposImovel, clientbase);
  
      expect(Array.isArray(corretoresAvaliacaoTipoImovel)).toBe(true);
      expect(corretoresAvaliacaoTipoImovel).toBeTruthy;
    });
  
    it('getCorretoresPorAvaliacaoEstadoTipoImovelAPI - Deve retornar corretores por avaliação, estado e tipos de imóvel', async () => {
      const corretoresAvaliacaoEstadoTipoImovel = await getCorretoresPorAvaliacaoEstadoTipoImovelAPI(avaliacao, estado, tiposImovel, clientbase);
  
      expect(Array.isArray(corretoresAvaliacaoEstadoTipoImovel)).toBe(true);
      expect(corretoresAvaliacaoEstadoTipoImovel).toBeTruthy;
    });
  
    it('getCorretoresPorAvaliacaoEstadoCidadeTipoImovelAPI - Deve retornar corretores por avaliação, estado, cidade e tipos de imóvel', async () => {
      const corretoresAvaliacaoEstadoCidadeTipoImovel = await getCorretoresPorAvaliacaoEstadoCidadeTipoImovelAPI(avaliacao, estado, cidade, tiposImovel, clientbase);
  
      expect(Array.isArray(corretoresAvaliacaoEstadoCidadeTipoImovel)).toBe(true);
      expect(corretoresAvaliacaoEstadoCidadeTipoImovel).toBeTruthy;
    });
  
    it('getEmpresasAPI - Deve retornar empresas', async () => {
        const empresas = await getEmpresasAPI(clientbase);
    
        expect(Array.isArray(empresas)).toBe(true);
        expect(empresas).toBeTruthy;
      });
    
      it('getEmpresasPorEstadoAPI - Deve retornar empresas por estado', async () => {
        const empresasPorEstado = await getEmpresasPorEstadoAPI(estado, clientbase);
    
        expect(Array.isArray(empresasPorEstado)).toBe(true);
        expect(empresasPorEstado).toBeTruthy;
      });
    
      it('getEmpresasPorEstadoCidadeAPI - Deve retornar empresas por estado e cidade', async () => {
        const empresasPorEstadoCidade = await getEmpresasPorEstadoCidadeAPI(estado, cidade, clientbase);
    
        expect(Array.isArray(empresasPorEstadoCidade)).toBe(true);
        expect(empresasPorEstadoCidade).toBeTruthy;
      });
    });
    
