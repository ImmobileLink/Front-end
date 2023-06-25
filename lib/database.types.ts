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
      amizade: {
        Row: {
          idcorretor1: string
          idcorretor2: string
        }
        Insert: {
          idcorretor1: string
          idcorretor2: string
        }
        Update: {
          idcorretor1?: string
          idcorretor2?: string
        }
        Relationships: [
          {
            foreignKeyName: "amizade_idcorretor1_fkey"
            columns: ["idcorretor1"]
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "amizade_idcorretor2_fkey"
            columns: ["idcorretor2"]
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          }
        ]
      }
      avaliacao: {
        Row: {
          atualizadoem: string
          dados: Json
          id: string
          nota: number | null
        }
        Insert: {
          atualizadoem?: string
          dados: Json
          id: string
          nota?: number | null
        }
        Update: {
          atualizadoem?: string
          dados?: Json
          id?: string
          nota?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "avaliacao_id_fkey"
            columns: ["id"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      comentario: {
        Row: {
          conteudo: string
          id: string
          idautor: string
          idpublicacao: string
        }
        Insert: {
          conteudo: string
          id?: string
          idautor: string
          idpublicacao: string
        }
        Update: {
          conteudo?: string
          id?: string
          idautor?: string
          idpublicacao?: string
        }
        Relationships: [
          {
            foreignKeyName: "comentario_idautor_fkey"
            columns: ["idautor"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comentario_idpublicacao_fkey"
            columns: ["idpublicacao"]
            referencedRelation: "publicacao"
            referencedColumns: ["id"]
          }
        ]
      }
      corporacao: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          complemento: string | null
          estado: string | null
          id: string
          logradouro: string | null
          nomefantasia: string | null
          numero: number | null
          premium: boolean | null
          telefone1: string | null
          telefone2: string | null
          telefone3: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          complemento?: string | null
          estado?: string | null
          id: string
          logradouro?: string | null
          nomefantasia?: string | null
          numero?: number | null
          premium?: boolean | null
          telefone1?: string | null
          telefone2?: string | null
          telefone3?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          complemento?: string | null
          estado?: string | null
          id?: string
          logradouro?: string | null
          nomefantasia?: string | null
          numero?: number | null
          premium?: boolean | null
          telefone1?: string | null
          telefone2?: string | null
          telefone3?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corporacao_id_fkey"
            columns: ["id"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      corretor: {
        Row: {
          bairro: string | null
          celular: string | null
          cep: string | null
          cidade: string | null
          cnpj: string | null
          comercial: string | null
          complemento: string | null
          cpf: string | null
          creci: string | null
          estado: string | null
          id: string
          logradouro: string | null
          nome: string | null
          numero: number | null
          premium: boolean | null
          sobre: string | null
          telefone: string | null
        }
        Insert: {
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          comercial?: string | null
          complemento?: string | null
          cpf?: string | null
          creci?: string | null
          estado?: string | null
          id: string
          logradouro?: string | null
          nome?: string | null
          numero?: number | null
          premium?: boolean | null
          sobre?: string | null
          telefone?: string | null
        }
        Update: {
          bairro?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cnpj?: string | null
          comercial?: string | null
          complemento?: string | null
          cpf?: string | null
          creci?: string | null
          estado?: string | null
          id?: string
          logradouro?: string | null
          nome?: string | null
          numero?: number | null
          premium?: boolean | null
          sobre?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      especialidade: {
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
        Relationships: [
          {
            foreignKeyName: "especialidade_idcorretor_fkey"
            columns: ["idcorretor"]
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "especialidade_idtipoimovel_fkey"
            columns: ["idtipoimovel"]
            referencedRelation: "tipoImovel"
            referencedColumns: ["id"]
          }
        ]
      }
      imovel: {
        Row: {
          bairro: string
          cidade: string
          descricao: string | null
          estado: string
          id: string
          idcorporacao: string
          numero: number
          rua: string
          valor: number | null
        }
        Insert: {
          bairro: string
          cidade: string
          descricao?: string | null
          estado: string
          id?: string
          idcorporacao: string
          numero: number
          rua: string
          valor?: number | null
        }
        Update: {
          bairro?: string
          cidade?: string
          descricao?: string | null
          estado?: string
          id?: string
          idcorporacao?: string
          numero?: number
          rua?: string
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "imovel_idcorporacao_fkey"
            columns: ["idcorporacao"]
            referencedRelation: "corporacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imovel_idcorporacao_fkey"
            columns: ["idcorporacao"]
            referencedRelation: "corporacao_por_regiao"
            referencedColumns: ["id"]
          }
        ]
      }
      imoveltipado: {
        Row: {
          idimovel: string
          idtipoimovel: string
        }
        Insert: {
          idimovel: string
          idtipoimovel: string
        }
        Update: {
          idimovel?: string
          idtipoimovel?: string
        }
        Relationships: [
          {
            foreignKeyName: "imoveltipado_idimovel_fkey"
            columns: ["idimovel"]
            referencedRelation: "imovel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imoveltipado_idtipoimovel_fkey"
            columns: ["idtipoimovel"]
            referencedRelation: "tipoImovel"
            referencedColumns: ["id"]
          }
        ]
      }
      like: {
        Row: {
          idautor: string
          idpublicacao: string
        }
        Insert: {
          idautor: string
          idpublicacao: string
        }
        Update: {
          idautor?: string
          idpublicacao?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_idautor_fkey"
            columns: ["idautor"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_idpublicacao_fkey"
            columns: ["idpublicacao"]
            referencedRelation: "publicacao"
            referencedColumns: ["id"]
          }
        ]
      }
      mensagem: {
        Row: {
          atualizadoem: string
          enviadoem: string
          id: string
          idautor: string
          idsala: string
          imagem: string | null
          mensagem: string
        }
        Insert: {
          atualizadoem?: string
          enviadoem?: string
          id?: string
          idautor: string
          idsala: string
          imagem?: string | null
          mensagem: string
        }
        Update: {
          atualizadoem?: string
          enviadoem?: string
          id?: string
          idautor?: string
          idsala?: string
          imagem?: string | null
          mensagem?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensagem_idautor_fkey"
            columns: ["idautor"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensagem_idsala_fkey"
            columns: ["idsala"]
            referencedRelation: "sala"
            referencedColumns: ["id"]
          }
        ]
      }
      publicacao: {
        Row: {
          atualizadoem: string
          conteudo: string | null
          criadoem: string
          id: string
          idautor: string
          idregiao: string
          imagem: string | null
          privado: boolean
        }
        Insert: {
          atualizadoem?: string
          conteudo?: string | null
          criadoem?: string
          id?: string
          idautor: string
          idregiao: string
          imagem?: string | null
          privado: boolean
        }
        Update: {
          atualizadoem?: string
          conteudo?: string | null
          criadoem?: string
          id?: string
          idautor?: string
          idregiao?: string
          imagem?: string | null
          privado?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "publicacao_idautor_fkey"
            columns: ["idautor"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publicacao_idregiao_fkey"
            columns: ["idregiao"]
            referencedRelation: "regiao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publicacao_idregiao_fkey"
            columns: ["idregiao"]
            referencedRelation: "corporacao_por_regiao"
            referencedColumns: ["idregiao"]
          }
        ]
      }
      regiao: {
        Row: {
          id: string
          regiao: string
        }
        Insert: {
          id?: string
          regiao: string
        }
        Update: {
          id?: string
          regiao?: string
        }
        Relationships: []
      }
      resultadoformulario: {
        Row: {
          conteudo: Json
          emailcliente: string
          enviadoem: string
          id: string
          idusuario: string
        }
        Insert: {
          conteudo: Json
          emailcliente: string
          enviadoem?: string
          id?: string
          idusuario: string
        }
        Update: {
          conteudo?: Json
          emailcliente?: string
          enviadoem?: string
          id?: string
          idusuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "resultadoformulario_idusuario_fkey"
            columns: ["idusuario"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      sala: {
        Row: {
          descricao: string | null
          id: string
          titulo: string | null
        }
        Insert: {
          descricao?: string | null
          id?: string
          titulo?: string | null
        }
        Update: {
          descricao?: string | null
          id?: string
          titulo?: string | null
        }
        Relationships: []
      }
      tipoImovel: {
        Row: {
          descricao: string
          id: string
        }
        Insert: {
          descricao: string
          id?: string
        }
        Update: {
          descricao?: string
          id?: string
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "usuario_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      usuarioporregiao: {
        Row: {
          idregiao: string
          idusuario: string
        }
        Insert: {
          idregiao: string
          idusuario: string
        }
        Update: {
          idregiao?: string
          idusuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarioporregiao_idregiao_fkey"
            columns: ["idregiao"]
            referencedRelation: "regiao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarioporregiao_idregiao_fkey"
            columns: ["idregiao"]
            referencedRelation: "corporacao_por_regiao"
            referencedColumns: ["idregiao"]
          },
          {
            foreignKeyName: "usuarioporregiao_idusuario_fkey"
            columns: ["idusuario"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      usuarioporsala: {
        Row: {
          idsala: string
          idusuario: string
        }
        Insert: {
          idsala: string
          idusuario: string
        }
        Update: {
          idsala?: string
          idusuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarioporsala_idsala_fkey"
            columns: ["idsala"]
            referencedRelation: "sala"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarioporsala_idusuario_fkey"
            columns: ["idusuario"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      visita: {
        Row: {
          dataAgendamento: string
          id: string
          idcorporacao: string
          idcorretor: string
          idimovel: string
          idmarcador: string
        }
        Insert: {
          dataAgendamento: string
          id?: string
          idcorporacao: string
          idcorretor: string
          idimovel: string
          idmarcador: string
        }
        Update: {
          dataAgendamento?: string
          id?: string
          idcorporacao?: string
          idcorretor?: string
          idimovel?: string
          idmarcador?: string
        }
        Relationships: [
          {
            foreignKeyName: "visita_idcorporacao_fkey"
            columns: ["idcorporacao"]
            referencedRelation: "corporacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visita_idcorporacao_fkey"
            columns: ["idcorporacao"]
            referencedRelation: "corporacao_por_regiao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visita_idcorretor_fkey"
            columns: ["idcorretor"]
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visita_idimovel_fkey"
            columns: ["idimovel"]
            referencedRelation: "imovel"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      corporacao_por_regiao: {
        Row: {
          cnpj: string | null
          id: string | null
          idregiao: string | null
          nomefantasia: string | null
          regiao: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corporacao_id_fkey"
            columns: ["id"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      mensagem_com_usuario: {
        Row: {
          atualizadoem: string | null
          enviadoem: string | null
          id: string | null
          idautor: string | null
          idsala: string | null
          imagem: string | null
          mensagem: string | null
          nomeautor: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mensagem_idsala_fkey"
            columns: ["idsala"]
            referencedRelation: "sala"
            referencedColumns: ["id"]
          }
        ]
      }
      simple_user_data: {
        Row: {
          id: string | null
          nome: string | null
          premium: boolean | null
          tipo: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      consultar_tipo_usuario: {
        Args: {
          id_usuario: string
        }
        Returns: {
          identificador: string
          premium: boolean
          role: number
        }[]
      }
      criar_ou_retornar_sala: {
        Args: {
          id_usuario: string
          id_destinatario: string
        }
        Returns: string
      }
      get_amigos: {
        Args: {
          id_corretor: string
        }
        Returns: {
          id: string
          nome: string
        }[]
      }
      get_corretor_info: {
        Args: {
          id: string
        }
        Returns: {
          nome: string
          avaliacao: number
        }[]
      }
      get_corretores_avaliacao: {
        Args: {
          avaliacao: number
        }
        Returns: {
          id: string
          nome: string
          creci: string
          nota: number
        }[]
      }
      get_corretores_avaliacao_regiao: {
        Args: {
          avaliacao: number
          idregiao: string
        }
        Returns: {
          id: string
          nome: string
          creci: string
          nota: number
        }[]
      }
      get_corretores_avaliacao_regiao_tipoimovel: {
        Args: {
          avaliacao: number
          idregiao: string
          idtipoimovel: string
        }
        Returns: {
          id: string
          nome: string
          creci: string
          nota: number
        }[]
      }
      get_corretores_avaliacao_tipoimovel: {
        Args: {
          avaliacao: number
          idtipoimovel: string
        }
        Returns: {
          id: string
          nome: string
          creci: string
          nota: number
        }[]
      }
      mensagem_com_usuario: {
        Args: {
          sala: string
        }
        Returns: {
          id: string
          idautor: string
          nomeautor: string
          idsala: string
          enviadoem: string
          atualizadoem: string
          mensagem: string
          imagem: string
        }[]
      }
      obter_cinco_corretores_id: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
        }[]
      }
      test_authorization_header: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
