import { handleLoginAPI, handleSignUpDB, verificaEmailDBAPI, verifyFields } from '@/app/[lang]/auth/authUtils';
import { clientSupabase } from '../lib/utils/clientSupabase';
import { Signup } from '@/app/i18n/dictionaries/types';
import { getDictionary } from '@/app/[lang]/dictionaries';

const supabaseUrl = process.env.SUPABASE_TEST_URL
const supabaseKey = process.env.SUPABASE_ANON_TEST_KEY

const clientbase = clientSupabase(supabaseUrl, supabaseKey);
let signup: any;
getDictionary('pt').then(response => signup = response.auth.signup)


describe('Auth Tests', () => {
    it('Deve cadastrar corretor com sucesso', () => {

        // Seu código de teste aqui
        const tipoPerfil = 1;
        const senha = 'Senha123!'
        const email = "email@email.com"
        const nome = "NomeTeste"
        const cpf = "12345678910"
        const cnpj = "14597846321456"
        const celular = "11999999999"
        const cep = "64090-128"
        const estado = "PI"
        const cidade = "Teresina"
        const bairro = "Gurupi"
        const logradouro = "Rua São Jorge"
        const numero = 1
        const premium = false
        const especialidade = [{ id: 'ea421bfd-9887-4a93-8331-2f8323b0f8e1', descricao: 'Com Varanda / Terraço' }]
        const regiaoAtuacao = [{ estado: 'Atalaia', cidade: 'AL' }]
        const nomeFantasia = " "
        const telefone = " "
        const comercial = " "
        const creci = "145986F"
        const complemento = " "
        const locationOrigin = "localhost:3000/pt"

        const result = handleSignUpDB(
            tipoPerfil,
            senha,
            email,
            clientbase,
            nome,
            cpf,
            cnpj,
            nomeFantasia,
            celular,
            telefone,
            comercial,
            creci,
            cep,
            estado,
            logradouro,
            numero,
            complemento,
            cidade,
            bairro,
            premium,
            especialidade,
            regiaoAtuacao,
            locationOrigin
        )
        expect(result).toBeTruthy 
    });



    it('Deve realizar sign in com sucesso', async () => {
        const email = 'corporacao@email.com'
        const senha = 'Senha123!'

        const result = await handleLoginAPI(email, senha, clientbase)

        expect(result).toBe(true)
    });

    it('Deve retornar true para email já cadastrado', async () => {
        const email = 'corporacao@email.com'

        const result = await verificaEmailDBAPI(email, clientbase)

        expect(result).toBe(true)
    });

    it('Deve retornar false para email não cadastrado', async () => {
        const email = 'cas2o9unhgpioausnd@email.com'

        const result = await verificaEmailDBAPI(email, clientbase)
        expect(result).toBe(false)
    });

    it('Deve retornar verdadeiro para entradas válidas', async () => {
        
        const telaAtual = 1;
        const setFieldErros = (erros: any) => {
            expect(Object.keys(erros).length).toBe(0); // Certifique-se de que não há erros
        }; 
        const tipoPerfil = 1;
        const senha = 'SenhaValida123!';
        const confirmSenha = 'SenhaValida123!';
        const email = 'email_valido@example.com';
        const supabase = clientbase
        const nome = 'Nome Valido';
        const cpf = '12345678909';
        const cnpj = '12345678901234';
        const nomeFantasia = 'Fantasia Valida';
        const celular = '11999999999';
        const telefone = '1122223333';
        const comercial = '1122334455';
        const creci = '12345A';
        const estado = 'SP';
        const cidade = 'Sao Paulo';
        const logradouro = 'Rua Valida';
        const numero = 10;
        const bairro = 'Bairro Valido';
        const cep = '12345-678';

        const result = await verifyFields(
            telaAtual,
            setFieldErros,
            signup,
            tipoPerfil,
            senha,
            confirmSenha,
            email,
            supabase,
            nome,
            cpf,
            cnpj,
            nomeFantasia,
            celular,
            telefone,
            comercial,
            creci,
            estado,
            cidade,
            logradouro,
            numero,
            bairro,
            cep
        );

        expect(result).toBe(true); // Deve retornar verdadeiro para entradas válidas
    });

    it('Deve retornar falso para entradas inválidas', async () => {

        const telaAtual = 1;
        const setFieldErros = (erros: any) => {
            expect(Object.keys(erros).length).toBeGreaterThan(0); // Deve haver erros
        };
        const tipoPerfil = 1;
        const senha = 'SenhaInvalida'; // Senha inválida
        const confirmSenha = 'SenhaDiferente'; // Confirmação de senha diferente
        const email = 'email_invalido'; // Email inválido
        const supabase = clientbase
        const nome = 'N'; // Nome inválido
        const cpf = '12345'; // CPF inválido
        const cnpj = '12345'; // CNPJ inválido
        const nomeFantasia = 'N'; // Nome Fantasia inválido
        const celular = '12345'; // Celular inválido
        const telefone = '12345'; // Telefone inválido
        const comercial = '12345'; // Comercial inválido
        const creci = '1234'; // CRECI inválido
        const estado = ''; // Estado inválido
        const cidade = 'S'; // Cidade inválida
        const logradouro = 'L'; // Logradouro inválido
        const numero = -1; // Número inválido
        const bairro = 'B'; // Bairro inválido
        const cep = '12345'; // CEP inválido

        const result = await verifyFields(
            telaAtual,
            setFieldErros,
            signup,
            tipoPerfil,
            senha,
            confirmSenha,
            email,
            supabase,
            nome,
            cpf,
            cnpj,
            nomeFantasia,
            celular,
            telefone,
            comercial,
            creci,
            estado,
            cidade,
            logradouro,
            numero,
            bairro,
            cep
        );

        expect(result).toBe(false); // Deve retornar falso para entradas inválidas
    });
});