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
      mensagem: {
        Row: {
          dataenvio: string
          iddestinatario: number | null
          idmensagem: number
          idremetente: number | null
          mensagem: string
        }
        Insert: {
          dataenvio?: string
          iddestinatario?: number | null
          idmensagem?: number
          idremetente?: number | null
          mensagem: string
        }
        Update: {
          dataenvio?: string
          iddestinatario?: number | null
          idmensagem?: number
          idremetente?: number | null
          mensagem?: string
        }
      }
      plano: {
        Row: {
          datainicio: string
          datatermino: string
          descricao: string
          idplano: number
          preco: number
        }
        Insert: {
          datainicio?: string
          datatermino: string
          descricao: string
          idplano?: number
          preco: number
        }
        Update: {
          datainicio?: string
          datatermino?: string
          descricao?: string
          idplano?: number
          preco?: number
        }
      }
      publicacao: {
        Row: {
          bairro: string | null
          conteudo: string | null
          dataatualizacao: string | null
          datacriacao: string | null
          estado: string | null
          idpublicacao: number
          idusuario: number | null
          img: string | null
          municipio: string | null
          privado: boolean | null
        }
        Insert: {
          bairro?: string | null
          conteudo?: string | null
          dataatualizacao?: string | null
          datacriacao?: string | null
          estado?: string | null
          idpublicacao?: number
          idusuario?: number | null
          img?: string | null
          municipio?: string | null
          privado?: boolean | null
        }
        Update: {
          bairro?: string | null
          conteudo?: string | null
          dataatualizacao?: string | null
          datacriacao?: string | null
          estado?: string | null
          idpublicacao?: number
          idusuario?: number | null
          img?: string | null
          municipio?: string | null
          privado?: boolean | null
        }
      }
      usuario: {
        Row: {
          bairro: string
          celular: string | null
          cep: string
          comercial1: string | null
          comercial2: string | null
          comercial3: string | null
          complemento: string | null
          criadoem: string
          email: string
          estado: string
          fixo: string | null
          idplano: number
          idusuario: number
          metricas: string | null
          numero: string
          rua: string
          senha: string
          situacaocadastral: string
        }
        Insert: {
          bairro: string
          celular?: string | null
          cep: string
          comercial1?: string | null
          comercial2?: string | null
          comercial3?: string | null
          complemento?: string | null
          criadoem?: string
          email: string
          estado: string
          fixo?: string | null
          idplano: number
          idusuario?: number
          metricas?: string | null
          numero: string
          rua: string
          senha: string
          situacaocadastral: string
        }
        Update: {
          bairro?: string
          celular?: string | null
          cep?: string
          comercial1?: string | null
          comercial2?: string | null
          comercial3?: string | null
          complemento?: string | null
          criadoem?: string
          email?: string
          estado?: string
          fixo?: string | null
          idplano?: number
          idusuario?: number
          metricas?: string | null
          numero?: string
          rua?: string
          senha?: string
          situacaocadastral?: string
        }
      }
    }
    Views: {
      decrypted_usuario: {
        Row: {
          bairro: string | null
          celular: string | null
          cep: string | null
          comercial1: string | null
          comercial2: string | null
          comercial3: string | null
          complemento: string | null
          criadoem: string | null
          decrypted_senha: string | null
          email: string | null
          estado: string | null
          fixo: string | null
          idplano: number | null
          idusuario: number | null
          metricas: string | null
          numero: string | null
          rua: string | null
          senha: string | null
          situacaocadastral: string | null
        }
        Insert: {
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          comercial1?: string | null
          comercial2?: string | null
          comercial3?: string | null
          complemento?: string | null
          criadoem?: string | null
          decrypted_senha?: never
          email?: string | null
          estado?: string | null
          fixo?: string | null
          idplano?: number | null
          idusuario?: number | null
          metricas?: string | null
          numero?: string | null
          rua?: string | null
          senha?: string | null
          situacaocadastral?: string | null
        }
        Update: {
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          comercial1?: string | null
          comercial2?: string | null
          comercial3?: string | null
          complemento?: string | null
          criadoem?: string | null
          decrypted_senha?: never
          email?: string | null
          estado?: string | null
          fixo?: string | null
          idplano?: number | null
          idusuario?: number | null
          metricas?: string | null
          numero?: string | null
          rua?: string | null
          senha?: string | null
          situacaocadastral?: string | null
        }
      }
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
