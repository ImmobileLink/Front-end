//Arquivo de definição de tipos para o projeto.
//Exporta os tipos do banco de dados ou tipos personalizados para não ser necessário declará-los toda hora nos códigos;
import { Database, Json } from "./database.types";

export interface Erro {
    referencia: string;
    mensagem: string;
}

//Nativos do Banco de dados
export type Publicacao = Database['public']['Tables']['publicacao']['Row']
export type TipoImovel = Database['public']['Tables']['tipoImovel']['Row']
export type ImovelTipado = Database['public']['Tables']['imoveltipado']['Row']
export type Usuario = Database['public']['Tables']['usuario']['Row']
export type Corretor = Database['public']['Tables']['corretor']['Row']
export type Corporacao = Database['public']['Tables']['corporacao']['Row']
export type ImovelDB = Database['public']['Tables']['imovel']['Row']
export type ImovelRegistro = Database['public']['Tables']['imovel']['Row']
export type UsuarioPorSala = Database['public']['Tables']['usuarioporsala']['Row']
export type Notificacao = Database['public']['Tables']['notificacao']['Row']
export type Mensagem = Database['public']['Tables']['mensagem']['Row']
export type Sala = Database['public']['Tables']['sala']['Row']
export type Visita = Database['public']['Tables']['visita']['Row']

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
    issalvo: boolean;

}

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
    caracteristicas: {
      id: string;
      descricao: string;
  }[]
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

export interface MensagemAInserir {
    idautor: string,
    idsala: string,
    mensagem?: string,
    imagem?: File
}
export interface CorretorAssociado {
    id: string;
    nome: string | null;
    estado: string | null;
    cidade: string | null;
    tipoImovel: TipoImovelSemClassificacao[];
}

export type TipoImovelSemClassificacao = Omit<TipoImovel, 'classificacao'>;

export interface InsereVisita {
    dadosmarcador: Json;
    dataagendamento: string;
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
    capa?: string;
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

export type salaUsuario = {
    idsala: string
}

export interface VisitaProps {
    visita_id: string;
    visita_status: boolean;
    nome_corporacao: string;
    nome_corretor: string;
    data_agendamento: string;
    nome_marcador: string;
    telefone_marcador: string;
    email_marcador: string;
    estado_imovel: string;
    cidade_imovel: string;
    bairro_imovel: string;
    rua_imovel: string;
    numero_imovel: number;
    cep_imovel: string;
    complemento_imovel: string;
    survey_id: string;
}

export interface RoomData {
    iddestinatario: string | null;
    nomedestinatario: string | null;
    avatardestinatario: string | null;
    mensagens: Mensagem[];
}