import { formataData, formataDataSemHora } from "../lib/utils/formataData";

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
})