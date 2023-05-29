export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      corretor: {
        Row: {
          avaliacao: number | null
          bairro: string | null
          celular: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          comercial: string | null
          complemento: string | null
          cpf: string | null
          creci: string | null
          dashboard: Json | null
          estado: string | null
          id: string
          idusuario: string | null
          logradouro: string | null
          nome: string | null
          numero: number | null
          premium: boolean | null
          status: boolean | null
          telefone: string | null
        }
        Insert: {
          avaliacao?: number | null
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          comercial?: string | null
          complemento?: string | null
          cpf?: string | null
          creci?: string | null
          dashboard?: Json | null
          estado?: string | null
          id: string
          idusuario?: string | null
          logradouro?: string | null
          nome?: string | null
          numero?: number | null
          premium?: boolean | null
          status?: boolean | null
          telefone?: string | null
        }
        Update: {
          avaliacao?: number | null
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          comercial?: string | null
          complemento?: string | null
          cpf?: string | null
          creci?: string | null
          dashboard?: Json | null
          estado?: string | null
          id?: string
          idusuario?: string | null
          logradouro?: string | null
          nome?: string | null
          numero?: number | null
          premium?: boolean | null
          status?: boolean | null
          telefone?: string | null
        }
      }
      corretorTemEspecialidade: {
        Row: {
          idcorretor: string
          idtipoimovel: string
        }
        Insert: {
          idcorretor: string
          idtipoimovel: string
        }
        Update: {
          idcorretor?: string
          idtipoimovel?: string
        }
      }
      empresa: {
        Row: {
          avaliacao: number | null
          bairro: string | null
          celular: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          comercial: string | null
          complemento: string | null
          dashboard: Json | null
          estado: string | null
          id: number
          idusuario: string | null
          logradouro: string | null
          nomefantasia: string | null
          numero: number | null
          premium: boolean | null
          telefone: string | null
        }
        Insert: {
          avaliacao?: number | null
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          comercial?: string | null
          complemento?: string | null
          dashboard?: Json | null
          estado?: string | null
          id?: number
          idusuario?: string | null
          logradouro?: string | null
          nomefantasia?: string | null
          numero?: number | null
          premium?: boolean | null
          telefone?: string | null
        }
        Update: {
          avaliacao?: number | null
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          comercial?: string | null
          complemento?: string | null
          dashboard?: Json | null
          estado?: string | null
          id?: number
          idusuario?: string | null
          logradouro?: string | null
          nomefantasia?: string | null
          numero?: number | null
          premium?: boolean | null
          telefone?: string | null
        }
      }
      mensagem: {
        Row: {
          dataenvio: string
          id: number
          iddestinatario: number
          idremetente: number
          mensagem: string
        }
        Insert: {
          dataenvio?: string
          id?: number
          iddestinatario: number
          idremetente: number
          mensagem: string
        }
        Update: {
          dataenvio?: string
          id?: number
          iddestinatario?: number
          idremetente?: number
          mensagem?: string
        }
      }
      publicacao: {
        Row: {
          areapub: number
          atualizadoem: string | null
          conteudo: string
          criadoem: string | null
          idautor: string
          idpublicacao: number
          img: string | null
          privado: boolean
        }
        Insert: {
          areapub: number
          atualizadoem?: string | null
          conteudo: string
          criadoem?: string | null
          idautor: string
          idpublicacao?: number
          img?: string | null
          privado: boolean
        }
        Update: {
          areapub?: number
          atualizadoem?: string | null
          conteudo?: string
          criadoem?: string | null
          idautor?: string
          idpublicacao?: number
          img?: string | null
          privado?: boolean
        }
      }
      regiao: {
        Row: {
          id: number
          regiao: string | null
        }
        Insert: {
          id?: number
          regiao?: string | null
        }
        Update: {
          id?: number
          regiao?: string | null
        }
      }
      tipoImovel: {
        Row: {
          criadoem: string | null
          descricao: string | null
          id: string
        }
        Insert: {
          criadoem?: string | null
          descricao?: string | null
          id?: string
        }
        Update: {
          criadoem?: string | null
          descricao?: string | null
          id?: string
        }
      }
      usuario: {
        Row: {
          atualizadoem: string
          criadoem: string
          email: string
          id: string
        }
        Insert: {
          atualizadoem?: string
          criadoem?: string
          email: string
          id: string
        }
        Update: {
          atualizadoem?: string
          criadoem?: string
          email?: string
          id?: string
        }
      }
      usuarioporarea: {
        Row: {
          idregiao: number
          idusuario: string
        }
        Insert: {
          idregiao: number
          idusuario: string
        }
        Update: {
          idregiao?: number
          idusuario?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
