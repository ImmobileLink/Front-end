export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      associacoes: {
        Row: {
          idcorporacao: string
          idcorretor: string
          pendente: boolean | null
        }
        Insert: {
          idcorporacao: string
          idcorretor: string
          pendente?: boolean | null
        }
        Update: {
          idcorporacao?: string
          idcorretor?: string
          pendente?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "associacoes_idcorporacao_fkey"
            columns: ["idcorporacao"]
            referencedRelation: "corporacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "associacoes_idcorporacao_fkey"
            columns: ["idcorporacao"]
            referencedRelation: "corporacao_por_regiao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "associacoes_idcorretor_fkey"
            columns: ["idcorretor"]
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
      conexoes: {
        Row: {
          idusuario1: string
          idusuario2: string
          Pendente: boolean | null
        }
        Insert: {
          idusuario1: string
          idusuario2: string
          Pendente?: boolean | null
        }
        Update: {
          idusuario1?: string
          idusuario2?: string
          Pendente?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "conexoes_idusuario1_fkey"
            columns: ["idusuario1"]
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conexoes_idusuario2_fkey"
            columns: ["idusuario2"]
            referencedRelation: "usuario"
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
          dadosmarcador: Json
          dataAgendamento: string
          id: string
          idcorporacao: string
          idcorretor: string
          idimovel: string
        }
        Insert: {
          dadosmarcador: Json
          dataAgendamento: string
          id?: string
          idcorporacao: string
          idcorretor: string
          idimovel: string
        }
        Update: {
          dadosmarcador?: Json
          dataAgendamento?: string
          id?: string
          idcorporacao?: string
          idcorretor?: string
          idimovel?: string
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
      get_connected_users: {
        Args: {
          id_usuario: string
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
      get_corretores_associados: {
        Args: {
          id_usuario: string
        }
        Returns: {
          id: string
          nome: string
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
      get_corretores_by_corporacao_especialidade: {
        Args: {
          id_usuario: string
          id_imovel: string
        }
        Returns: {
          id: string
          nome: string
        }[]
      }
      get_imoveis: {
        Args: {
          id_usuario: string
        }
        Returns: {
          id: string
          rua: string
          numero: number
          bairro: string
          cidade: string
          estado: string
          descricao: string
          valor: number
        }[]
      }
      get_publicacao_com_dados: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          idautor: string
          nomeautor: string
          idregiao: string
          regiao: string
          conteudo: string
          imagem: string
          criadoem: string
          atualizadoem: string
          privado: boolean
        }[]
      }
      get_publicacao_completa: {
        Args: {
          regid: string
        }
        Returns: {
          id: string
          idautor: string
          nomeautor: string
          idregiao: string
          regiao: string
          conteudo: string
          imagem: string
          criadoem: string
          atualizadoem: string
          privado: boolean
        }[]
      }
      get_publicacao_por_id: {
        Args: {
          pubid: string
        }
        Returns: {
          id: string
          idautor: string
          nomeautor: string
          idregiao: string
          regiao: string
          conteudo: string
          imagem: string
          criadoem: string
          atualizadoem: string
          privado: boolean
        }[]
      }
      get_tipoimovel_by_idcorretor: {
        Args: {
          idcorretor: string
        }
        Returns: {
          descricao: string
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
      obter_corporacoes_por_corretor: {
        Args: {
          id_corretor: string
        }
        Returns: {
          id: string
          corporacao: string
        }[]
      }
      obter_corretores_por_corporacao: {
        Args: {
          id_corporacao: string
        }
        Returns: {
          id: string
          corretor: string
        }[]
      }
      obter_nomes_corretores: {
        Args: {
          id_corporacao: string
        }
        Returns: {
          id: string
          nome: string
        }[]
      }
      obterespecialidade: {
        Args: {
          idcorretor: string
        }
        Returns: {
          descricao: string
        }[]
      }
      test_authorization_header: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      userpfpcheck: {
        Args: {
          userid: string
        }
        Returns: boolean
      }
      verifica_associacao: {
        Args: {
          valor1: string
          valor2: string
        }
        Returns: string
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
