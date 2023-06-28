//Arquivo de definição de tipos para o projeto.
//Exporta os tipos do banco de dados ou tipos personalizados para não ser necessário declará-los toda hora nos códigos;
import { Database } from "./database.types";

//Nativos do Banco de dados
export type Regiao = Database['public']['Tables']['regiao']['Row']
export type TipoImovel = Database['public']['Tables']['tipoImovel']['Row']
export type Usuario = Database['public']['Tables']['usuario']['Row']
export type Corretor = Database['public']['Tables']['corretor']['Row']
export type Corporacao = Database['public']['Tables']['corporacao']['Row']
export type ImovelRegistro = Database['public']['Tables']['imovel']['Row']
export type Mensagem = Database['public']['Tables']['mensagem']['Row']
export type MensagemComUsuario = Database['public']['Views']['mensagem_com_usuario']['Row']
export interface MensagemAInserir {
    idautor: string,
    idsala: string,
    mensagem: string
}
export interface CorretorAssociado {
  id: string,
  nome: string,
}
export type Sala = Database['public']['Tables']['sala']['Row']
export type Visita = Database['public']['Tables']['visita']['Row']
//Criados/Modificados/Personalizados
export interface CorretorBuscado {
    creci: string | null
    id: string | null
    idregiao?: string | null
    idtipoimovel?: string | null
    nome: string | null
    nota: number | null
}
export type CorporacaoPorRegiao = Database['public']['Views']['corporacao_por_regiao']['Row']
