//Arquivo de definição de tipos para o projeto.
//Exporta os tipos do banco de dados ou tipos personalizados para não ser necessário declará-los toda hora nos códigos;
import { Database, Json } from "./database.types";
import Avatar from '../src/app/[lang]/(components)/Avatar';

//Nativos do Banco de dados
export type Publicacao = Database['public']['Tables']['publicacao']['Row']
export interface PublicacaoCompleta {
    id: string;
    idautor: string;
    avatar: string;
    nomeautor: string;
    regiao: Json;
    conteudo: string;
    imagem: string;
    criadoem: string;
    atualizadoem: string;

}
export type TipoImovel = Database['public']['Tables']['tipoImovel']['Row']
export type ImovelTipado = Database['public']['Tables']['imoveltipado']['Row']
export type Usuario = Database['public']['Tables']['usuario']['Row']
export type Corretor = Database['public']['Tables']['corretor']['Row']
export type Corporacao = Database['public']['Tables']['corporacao']['Row']
export type ImovelDB = Database['public']['Tables']['imovel']['Row']
export type ImovelRegistro = Database['public']['Tables']['imovel']['Row']
export interface InsereImovel {
    idcorporacao: string,
    descricao: string,
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    numero: number,
    complemento: string,
    valor: number,
    imagem: string,
    caracteristicas: Json
}
export interface AtualizaImovel {
    descricao: string,
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    rua: string,
    numero: number,
    complemento: string,
    valor: number,
    imagem: string,
    caracteristicas: Json
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
export type CorretorBuscado = {
    id: string;
    nome: string;
    avatar: string;
    creci: string;
    estado: string;
    cidade: string;
    sobre: string;
    nota: number;
}[] | null;

export type CorretorBuscadoUnico = {
    id: string;
    nome: string;
    avatar: string;
    creci: string;
    estado: string;
    cidade: string;
    sobre: string;
    nota: number;
};

export type CorporacaoBuscada = {
    id: string;
    nomefantasia: string;
    avatar: string;
    estado: string;
    cidade: string;
    sobre: string;
}[] | null;

export type CorporacaoBuscadaUnica = {
    id: string;
    nomefantasia: string;
    avatar: string;
    estado: string;
    cidade: string;
    sobre: string;
};

export type CorretorCarouselItem = {
    id: string;
    nome: string;
    avatar: string;
    creci: string;
    estado: string;
    cidade: string;
    sobre: string;
}

export interface UltimaMensagemPorSalaPorUsuario {
    idmensagem: string;
    idsala: string;
    idautor: string;
    nomeautor: string;
    avatarautor: string;
    mensagem: string;
    atualizadoem: string;
    idparticipante: string;
    nomeparticipante: string;
    avatarparticipante: string;
}

export type userData = {
    id?: string;
    avatar?: string;
    nome?: string;
    isPremium?: boolean;
    type?: string;
    links?: {
        id: string;
        nome: string;
        avatar: string;
    }[] | null;
    assoc?: {
        id: string;
        nome: string;
        avatar: string;
    }[] | null;
};

export type userGroup = {
    id: string;
    nome: string;
    avatar: string;
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

export type CorporacaoPorRegiao = {
    idcorporacao: string;
    regiao: {
        cidade: string,
        estado: string
    }[] | null;
} 

export type filterType = {
    tipoUsuario: string;
    estado: string;
    cidade: string;
    avaliacao: number;
    especialidades: string[];
  }


export type Historico = {
    data_fim: string | null;
    data_inicio: string;
    descricao: string | null;
    id_corporacao: string | null;
    id_corretor: string;
    nome_empresa: string | null;
}[] | null;