import { Database } from "./database.types";
//Exporta os tipos do banco de dados para não ser necessário declará-los toda hora nos códigos;

export type Regiao = Database['public']['Tables']['regiao']['Row']
export type TipoImovel = Database['public']['Tables']['tipoImovel']['Row']
export type Usuario = Database['public']['Tables']['usuario']['Row']
export type Corretor = Database['public']['Tables']['corretor']['Row']
export interface CorretorBuscado {
    id: string,
    nome: string,
    creci: string,
    nota: number
}
export type Corporacao = Database['public']['Tables']['corporacao']['Row']
export type CorporacaoPorRegiao = Database['public']['Views']['corporacao_por_regiao']['Row']

