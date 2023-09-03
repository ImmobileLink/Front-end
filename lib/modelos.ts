//Arquivo de definição de tipos para o projeto.
//Exporta os tipos do banco de dados ou tipos personalizados para não ser necessário declará-los toda hora nos códigos;
import { Database, Json } from "./database.types";

//Nativos do Banco de dados
export type Publicacao = Database['public']['Tables']['publicacao']['Row']
export interface PublicacaoCompleta {
    id: string;
    idautor: string;
    nomeautor: string;
    regiao: Json;
    conteudo: string;
    imagem: string;
    criadoem: string;
    atualizadoem: string;
}
export type Regiao = Database['public']['Tables']['regiao']['Row']
export type TipoImovel = Database['public']['Tables']['tipoImovel']['Row']
export type Usuario = Database['public']['Tables']['usuario']['Row']
export type Corretor = Database['public']['Tables']['corretor']['Row']
export type Corporacao = Database['public']['Tables']['corporacao']['Row']
export type ImovelDB = Database['public']['Tables']['imovel']['Row']
export type ImovelRegistro = Database['public']['Tables']['imovel']['Row']
export interface InsereImovel {
    idcorporacao: string,
    descricao: string,
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    numero: number,
    valor: number
}
export interface ImovelSemCorporacao {
    id: string,
    rua: string,
    numero: number,
    bairro: string,
    cidade: string,
    estado: string,
    descricao: string,
    valor: number
}
export type Mensagem = Database['public']['Tables']['mensagem']['Row']
export interface MensagemAInserir {
    idautor: string,
    idsala: string,
    mensagem?: string,
    imagem?: File
}
export interface CorretorAssociado {
    id: string,
    nome: string,
}
export type Sala = Database['public']['Tables']['sala']['Row']
export type Visita = Database['public']['Tables']['visita']['Row']
export interface InsereVisita {
    dadosmarcador: Json;
    dataAgendamento: string;
    idcorporacao: string;
    idcorretor: string;
    idimovel: string;
}
//Criados/Modificados/Personalizados
export interface CorretorBuscado {
    creci: string | null
    id: string | null
    idregiao?: string | null
    idtipoimovel?: string | null
    nome: string | null
    nota: number | null
}
export interface UltimaMensagemPorSalaPorUsuario {
  idmensagem: string;
  idsala: string;
  idautor: string;
  nomeautor: string;
  mensagem: string;
  atualizadoem: string;
  idparticipante: string;
  nomeparticipante: string;
}
export interface userData {
    id?: string;
    nome?: string;
    isPremium?: boolean;
    type?: string;
    links: {
        id: string;
        nome: string;
    }[] | null;
    assoc: {
        id: string;
        nome: string;
    }[] | null;
};

export type userGroup = {
    id: string;
    nome: string;
}[] | null;

export interface City {
    id: number;
    nome: string;
}

export interface PostFormProps {
    idusuario: string;
    regiao: { estado: string | undefined; cidade: string; };
    texto: string;
    imagem?: File;
}

export interface filterOption {
    filter: number;
    param?: string;
}