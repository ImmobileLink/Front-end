import { handleLoginAPI, handleSignUpDB, verificaEmailDBAPI, verifyFields } from '@/app/[lang]/auth/authUtils';
import { clientSupabase } from '../lib/utils/clientSupabase';
import { Signup } from '@/app/i18n/dictionaries/types';

const supabaseUrl = process.env.SUPABASE_TEST_URL
const supabaseKey = process.env.SUPABASE_ANON_TEST_KEY

const clientbase = clientSupabase(supabaseUrl, supabaseKey);

//Objeto mock para o dictionary do signup
export const signup: Signup = {
    signup1: {
        emaillabel: 'Email Label',
        passwordlabel: 'Password Label',
        confirmpassword: 'Confirm Password Label',
        logs: {
            invalidemail: 'Invalid Email',
            invalidpassword: 'Invalid Password',
            emailalreadyused: 'Email Already Used',
            invaliddifferentpasswords: 'Invalid Different Passwords',
            invalidconfirmpassword: 'Invalid Confirm Password',
        },
    },
    signup2: {
        corretorlabel: 'Corretor Label',
        corretorbutton: 'Corretor Button',
        companylabel: 'Company Label',
        companybutton: 'Company Button',
        yourchoiceis: 'Your Choice Is',
        corretor: 'Corretor',
        company: 'Company',
    },
    signup3: {
        name: 'Name',
        fantasyname: 'Fantasy Name',
        cpf: 'CPF',
        cnpj: 'CNPJ',
        phone1: 'Phone1',
        phone2: 'Phone2',
        phone3: 'Phone3',
        cep: 'CEP',
        uf: 'UF',
        ufacronim: 'UFAcronim',
        city: 'City',
        neighborhood: 'Neighborhood',
        street: 'Street',
        number: 'Number',
        complement: 'Complement',
        optional: 'Optional',
        logs: {
            invalidname: 'Invalid Name',
            invalidfantasyname: 'Invalid Fantasy Name',
            invalidcpf: 'Invalid CPF',
            invalidcnpj: 'Invalid CNPJ',
            invalidphone: 'Invalid Phone',
            invalidcep: 'Invalid CEP',
            invalidcepnotfound: 'Invalid CEP Not Found',
            invaliduf: 'Invalid UF',
            invalidcity: 'Invalid City',
            invalidneighborhood: 'Invalid Neighborhood',
            invalidstreet: 'Invalid Street',
            invalidnumber: 'Invalid Number',
            invalidcomplement: 'Invalid Complement',
        },
    },
    signup4: {
        creci: 'CRECI',
        speciality: 'Speciality',
        region: 'Region',
        languages: 'Languages',
        logs: {
            invalidcreci: 'Invalid CRECI',
        },
        cityselector: {
            estate: 'Estate',
            city: 'City',
            selectaestate: 'Select a Estate',
            selectaestatefirst: 'Select a Estate First',
            nocityfound: 'No City Found',
            ufacronim: 'UFAcronim',
            selectacity: 'Select a City',
        },
    },
    signup5: {
        corretor: {
            freelabel: 'Free Label',
            freedescription1: 'Free Description 1',
            freedescription2: 'Free Description 2',
            freedescription3: 'Free Description 3',
            freedescription4: 'Free Description 4',
            premiumlabel: 'Premium Label',
            premiumdescription1: 'Premium Description 1',
            premiumdescription2: 'Premium Description 2',
            premiumdescription3: 'Premium Description 3',
            premiumdescription4: 'Premium Description 4',
        },
        company: {
            freelabel: 'Free Label',
            freedescription1: 'Free Description 1',
            freedescription2: 'Free Description 2',
            freedescription3: 'Free Description 3',
            freedescription4: 'Free Description 4',
            premiumlabel: 'Premium Label',
            premiumdescription1: 'Premium Description 1',
            premiumdescription2: 'Premium Description 2',
            premiumdescription3: 'Premium Description 3',
            premiumdescription4: 'Premium Description 4',
        },
        subscriptionmessage0: 'Subscription Message 0',
        subscriptionmessage1: 'Subscription Message 1',
        subscriptionmessage2: 'Subscription Message 2',
        subscriptionmessage3: 'Subscription Message 3',
        freetier: 'Free Tier',
        brokertier: 'Broker Tier',
        companytier: 'Company Tier',
        fullname: 'Full Name',
        cardnumber: 'Card Number',
        expirydate: 'Expiry Date',
        code: 'Code',
        signupbutton: 'Signup Button',
        select: 'Select',
        selected: 'Selected',
        disclaimer: 'Disclaimer',
    },
    stepper: {
        label1: 'Step 1',
        label2: 'Step 2',
        label3: 'Step 3',
        label4: 'Step 4',
        label5: 'Step 5',
    },
    nextbutton: 'Next Button',
    previousbutton: 'Previous Button',
    success: 'Success',
    error: 'Error',
    fixtheinputs: 'Fix the Inputs',
    successsignup: 'Success Signup',
};

describe('Auth Tests', () => {
    it('Deve cadastrar corretor com sucesso', () => {

        const spy = jest.spyOn(console, 'warn').mockImplementation(() => { });

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
        spy.mockRestore(); // Restaura a função console.warn para o comportamento original após o teste    
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