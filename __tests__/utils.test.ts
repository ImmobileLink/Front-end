import { fetchCitiesAPI, getCEP } from "../lib/utils/externalApis";
import { formataData, formataDataSemHora } from "../lib/utils/formataData";
import { maskPhone } from "../lib/utils/formataFone";

describe('Utils Test', () => {
    it('Deve retornar ano, mês, dia, hora e minuto em formato PT-BR', () => {
        const data = '2023-10-28T21:42:01.887712+00:00'
        const result = formataData(data)
        expect(result).toBe('28/10/2023, 18:42')
    })
    it('Deve retornar ano, mês e dia em formato PT-BR', () => {
        const data = '2023-10-28T21:42:01.887712+00:00'
        const result = formataDataSemHora(data)
        expect(result).toBe('28/10/2023')
    })
    it('Deve retornar CEP com sucesso', async () => {
        const cep = "86042-200"

        const result = await getCEP(cep)
        const expected = {
            cep: "86042-200",
            logradouro: "Rua das Begônias",
            complemento: "",
            bairro: "Ouro Branco",
            localidade: "Londrina",
            uf: "PR",
            ibge: "4113700",
            gia: "",
            ddd: "43",
            siafi: "7667"
        };

        expect(result).toEqual(expected)
    });
    it('Deve retornar cidades do estado', async () => {
        const state = 'SP'
        const result = await fetchCitiesAPI(state)
        expect(result).toBeTruthy
    })
    it('Deve formatar um número de telefone corretamente', () => {
        const phoneNumber = '1234567890';
        const formattedPhoneNumber = maskPhone(phoneNumber);

        expect(formattedPhoneNumber).toBe('(12) 3456-7890');
    });
})