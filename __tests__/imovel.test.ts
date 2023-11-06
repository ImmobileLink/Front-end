import { cadastrarImagemAPI, cadastrarImovelAPI, filterAndMapTipos, getBrokers, getCountImovel, getPropertiesAPI, getTiposImovel, imageEditAPI, imovelEditAPI, insereVisitaAPI } from "@/app/[lang]/imovel/imovelUtils"
import { clientSupabase } from "../lib/utils/clientSupabase"
import { serverSupabase } from "../lib/utils/serverSupabase"
import { InsereImovel, InsereVisita, TipoImovel } from "../lib/modelos"
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
      result.push(await serverbase.from('associacoes').delete().neq("idcorporacao", 'f858715d-41af-4188-8aac-bc292f2f5123'))
      return result  
  }
  
  afterEach(() => {
      jest.clearAllMocks();
  });
  
  afterAll(() => {
      return resetDatabase()
  });


describe('Imovel Tests', () => {
    it('Deve retornar array de corretores em caso de sucesso', async () => {
        const user = { id: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e', type: 'corporacao' };

        const brokers = await getBrokers(user, serverbase);

        expect(Array.isArray(brokers)).toBe(true);
    });

    it('Deve retornar um array vazio em caso de falha', async () => {
        const user = { id: 'invalidUserId', type: 'corporacao' };

        const brokers = await getBrokers(user, serverbase);

        expect(Array.isArray(brokers)).toBe(true);
        expect(brokers).toHaveLength(0);
    });

    it('Deve filtrar e mapear objetos TipoImovel com sucesso', async () => {
        const tiposImovel: TipoImovel[] = [
            {
              classificacao: 'Mobília',
              descricao: 'Descrição1',
              id: 'b52fd833-2e9f-4f23-b11a-73abdbf34b16',
            },
            {
              classificacao: 'Classificacao2',
              descricao: 'Descrição2',
              id: 'f6586d3b-159d-454b-b514-d582d11f9f06',
            },
          ];
        const classificacao = 'Mobília';
    
        const result = await filterAndMapTipos(tiposImovel, classificacao);
    
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(1)
      });
    
      it('Deve retornar um array vazio em caso de falha ao filtrar e mapear', async () => {
        const tiposImovel: TipoImovel[] = [
            {
              classificacao: 'Mobília',
              descricao: 'Descrição1',
              id: 'b52fd833-2e9f-4f23-b11a-73abdbf34b16',
            },
            {
              classificacao: 'Classificacao2',
              descricao: 'Descrição2',
              id: 'f6586d3b-159d-454b-b514-d582d11f9f06',
            },
          ];
        const classificacao = 'Mobíli';
    
        const result = await filterAndMapTipos(tiposImovel, classificacao);
    
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(0);
      });
    
      it('Deve retornar um array de tipos de imóveis em caso de sucesso', async () => {
        const result = await getTiposImovel(serverbase);
    
        expect(Array.isArray(result)).toBe(true);
      });  
    
      it('Deve retornar o número de imóveis em caso de sucesso', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
    
        const count = await getCountImovel(userId, serverbase);
    
        expect(typeof count === 'number').toBe(true);
      });
    
      it('Deve retornar um array de propriedades em caso de sucesso', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
    
        const properties = await getPropertiesAPI(userId, serverbase);
    
        expect(Array.isArray(properties)).toBe(true);
      });
      
      it('Deve retornar verdadeiro após editar uma imagem com sucesso', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
        const imagem = 'imagem.jpg';
        const imagemId = 'new_imagem.jpg';
        const imagePath = __dirname + '/sample.png';

        let image = undefined;

        fs.readFile(imagePath, (err, data) => {
            image = data;
        });
        
        const img = image;
    
        if(img) {
            const result = await imageEditAPI(userId, imagem, imagemId, img, serverbase);
            expect(result).toBe(true);
        }
      });
    
      it('Deve retornar verdadeiro após editar um imóvel com sucesso', async () => {
        const imagemId = 'new_imagem.jpg';
        const imovelId = '340d1c09-920b-45b8-980c-4e12a5d17d1d';
    
        const result = await imovelEditAPI(imagemId, imovelId, serverbase);
    
        expect(result).toBe(true);
      });
    
      it('Deve retornar verdadeiro após cadastrar uma imagem com sucesso', async () => {
        const userId = 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e';
        const imagemId = 'new_imagem.jpg';
        let image = undefined;
        const imagePath = __dirname + '/sample.png';

        fs.readFile(imagePath, (err, data) => {
            image = data;
        });
        
        const img = image;
    
        if(img) {
            const result = await cadastrarImagemAPI(userId, imagemId, img, serverbase);
            expect(result).toBe(true);
        }      
      });
    
      it('Deve retornar o resultado do cadastro de imóvel com sucesso', async () => {
        const imovel: InsereImovel = {
            idcorporacao: 'f858715d-41af-4188-8aac-bc292f2f5123',
            descricao: 'Descrição do Imóvel',
            cep: '12345-678',
            estado: 'Estado',
            cidade: 'Cidade',
            bairro: 'Bairro',
            rua: 'Nome da Rua',
            numero: 123,
            complemento: 'Complemento do Endereço',
            valor: 100000, 
            imagem: 'new_imagem.jpg', 
            caracteristicas: [
              { id: 'caracteristica1', descricao: 'Característica 1' },
              { id: 'caracteristica2', descricao: 'Característica 2' },
            ],
          };
             
        const result = await cadastrarImovelAPI(imovel, serverbase);
    
        expect(result).toBeDefined();
      });
    
      it('Deve retornar verdadeiro após inserir uma visita com sucesso', async () => {
        const visita: InsereVisita = {
            dadosmarcador: { key1: 'value1', key2: 'value2' }, // Substitua com seus próprios dados
            dataagendamento: '2023-11-02T10:00:00', // Substitua com a data e hora desejada
            idcorporacao: 'f858715d-41af-4188-8aac-bc292f2f5123',
            idcorretor: 'd19a3735-1eea-4bc2-9c79-dbc93cd7476e',
            idimovel: '586b448e-b336-4184-8605-97522a7e8605',
          };
    
        const result = await insereVisitaAPI(visita, serverbase);
    
        expect(result).toBe(true);
      });
});
