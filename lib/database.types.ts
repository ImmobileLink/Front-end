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
          id: string
          idcorporacao: string
          idcorretor: string
          iniciativa: string
          pendente: boolean
        }
        Insert: {
          id?: string
          idcorporacao: string
          idcorretor: string
          iniciativa: string
          pendente?: boolean
        }
        Update: {
          id?: string
          idcorporacao?: string
          idcorretor?: string
          iniciativa?: string
          pendente?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "associacoes_idcorporacao_fkey"
            columns: ["idcorporacao"]
            isOneToOne: false
            referencedRelation: "corporacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "associacoes_idcorretor_fkey"
            columns: ["idcorretor"]
            isOneToOne: false
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          }
        ]
      }
      avaliacao: {
        Row: {
          criadoem: string
          id: string
          nota: number | null
        }
        Insert: {
          criadoem?: string
          id: string
          nota?: number | null
        }
        Update: {
          criadoem?: string
          id?: string
          nota?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "avaliacao_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          }
        ]
      }
      conexoes: {
        Row: {
          id: string
          idusuario1: string
          idusuario2: string
          iniciativa: string
          pendente: boolean
        }
        Insert: {
          id?: string
          idusuario1: string
          idusuario2: string
          iniciativa: string
          pendente?: boolean
        }
        Update: {
          id?: string
          idusuario1?: string
          idusuario2?: string
          iniciativa?: string
          pendente?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "conexoes_idusuario1_fkey"
            columns: ["idusuario1"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conexoes_idusuario2_fkey"
            columns: ["idusuario2"]
            isOneToOne: false
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
          site: string | null
          sobre: string | null
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
          site?: string | null
          sobre?: string | null
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
          site?: string | null
          sobre?: string | null
          telefone1?: string | null
          telefone2?: string | null
          telefone3?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corporacao_id_fkey"
            columns: ["id"]
            isOneToOne: true
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
        Relationships: [
          {
            foreignKeyName: "corretor_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      denuncia: {
        Row: {
          aberta: boolean
          descricao: string | null
          id: string
          idautor: string
          idpublicacao: string
          idusuario: string
          motivo: string
        }
        Insert: {
          aberta?: boolean
          descricao?: string | null
          id?: string
          idautor: string
          idpublicacao: string
          idusuario: string
          motivo: string
        }
        Update: {
          aberta?: boolean
          descricao?: string | null
          id?: string
          idautor?: string
          idpublicacao?: string
          idusuario?: string
          motivo?: string
        }
        Relationships: [
          {
            foreignKeyName: "denuncia_idautor_fkey"
            columns: ["idautor"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "denuncia_idpublicacao_fkey"
            columns: ["idpublicacao"]
            isOneToOne: false
            referencedRelation: "publicacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "denuncia_idusuario_fkey"
            columns: ["idusuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
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
            isOneToOne: false
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "especialidade_idtipoimovel_fkey"
            columns: ["idtipoimovel"]
            isOneToOne: false
            referencedRelation: "tipoImovel"
            referencedColumns: ["id"]
          }
        ]
      }
      historico: {
        Row: {
          data_fim: string | null
          data_inicio: string
          descricao: string
          id: string
          id_corporacao: string | null
          id_corretor: string
          nome_empresa: string | null
        }
        Insert: {
          data_fim?: string | null
          data_inicio: string
          descricao: string
          id?: string
          id_corporacao?: string | null
          id_corretor: string
          nome_empresa?: string | null
        }
        Update: {
          data_fim?: string | null
          data_inicio?: string
          descricao?: string
          id?: string
          id_corporacao?: string | null
          id_corretor?: string
          nome_empresa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historico_id_corporacao_fkey"
            columns: ["id_corporacao"]
            isOneToOne: false
            referencedRelation: "corporacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historico_id_corretor_fkey"
            columns: ["id_corretor"]
            isOneToOne: false
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          }
        ]
      }
      imovel: {
        Row: {
          bairro: string
          caracteristicas: Json[] | null
          cep: string | null
          cidade: string
          complemento: string | null
          descricao: string | null
          estado: string
          id: string
          idcorporacao: string
          imagem: string | null
          numero: number
          rua: string
          valor: number | null
        }
        Insert: {
          bairro: string
          caracteristicas?: Json[] | null
          cep?: string | null
          cidade: string
          complemento?: string | null
          descricao?: string | null
          estado: string
          id?: string
          idcorporacao: string
          imagem?: string | null
          numero: number
          rua: string
          valor?: number | null
        }
        Update: {
          bairro?: string
          caracteristicas?: Json[] | null
          cep?: string | null
          cidade?: string
          complemento?: string | null
          descricao?: string | null
          estado?: string
          id?: string
          idcorporacao?: string
          imagem?: string | null
          numero?: number
          rua?: string
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "imovel_idcorporacao_fkey"
            columns: ["idcorporacao"]
            isOneToOne: false
            referencedRelation: "corporacao"
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
            isOneToOne: false
            referencedRelation: "imovel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imoveltipado_idtipoimovel_fkey"
            columns: ["idtipoimovel"]
            isOneToOne: false
            referencedRelation: "tipoImovel"
            referencedColumns: ["id"]
          }
        ]
      }
      mensagem: {
        Row: {
          atualizadoem: string
          avatarautor: string | null
          enviadoem: string
          id: string
          idautor: string
          idsala: string
          imagem: string | null
          mensagem: string | null
          nomeautor: string | null
        }
        Insert: {
          atualizadoem?: string
          avatarautor?: string | null
          enviadoem?: string
          id?: string
          idautor: string
          idsala: string
          imagem?: string | null
          mensagem?: string | null
          nomeautor?: string | null
        }
        Update: {
          atualizadoem?: string
          avatarautor?: string | null
          enviadoem?: string
          id?: string
          idautor?: string
          idsala?: string
          imagem?: string | null
          mensagem?: string | null
          nomeautor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mensagem_idautor_fkey"
            columns: ["idautor"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mensagem_idsala_fkey"
            columns: ["idsala"]
            isOneToOne: false
            referencedRelation: "sala"
            referencedColumns: ["id"]
          }
        ]
      }
      notificacao: {
        Row: {
          artefato: string
          data: string
          id: string
          iddestinatario: string | null
          idremetente: string | null
          nomedestinatario: string | null
          nomeremetente: string | null
          tipo: string
          visualizada: boolean
        }
        Insert: {
          artefato: string
          data?: string
          id?: string
          iddestinatario?: string | null
          idremetente?: string | null
          nomedestinatario?: string | null
          nomeremetente?: string | null
          tipo: string
          visualizada?: boolean
        }
        Update: {
          artefato?: string
          data?: string
          id?: string
          iddestinatario?: string | null
          idremetente?: string | null
          nomedestinatario?: string | null
          nomeremetente?: string | null
          tipo?: string
          visualizada?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "notificacao_iddestinatario_fkey"
            columns: ["iddestinatario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notificacao_idremetente_fkey"
            columns: ["idremetente"]
            isOneToOne: false
            referencedRelation: "usuario"
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
          imagem: string | null
          regiao: Json | null
        }
        Insert: {
          atualizadoem?: string
          conteudo?: string | null
          criadoem?: string
          id?: string
          idautor: string
          imagem?: string | null
          regiao?: Json | null
        }
        Update: {
          atualizadoem?: string
          conteudo?: string | null
          criadoem?: string
          id?: string
          idautor?: string
          imagem?: string | null
          regiao?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "publicacao_idautor_fkey"
            columns: ["idautor"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      publicacaosalva: {
        Row: {
          idpublicacao: string
          idusuario: string
        }
        Insert: {
          idpublicacao: string
          idusuario: string
        }
        Update: {
          idpublicacao?: string
          idusuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "publicacaosalva_idpublicacao_fkey"
            columns: ["idpublicacao"]
            isOneToOne: false
            referencedRelation: "publicacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publicacaosalva_idusuario_fkey"
            columns: ["idusuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      resultadoformulario: {
        Row: {
          atualizadoem: string
          campo1: number | null
          campo10: string | null
          campo2: number | null
          campo3: number | null
          campo4: number | null
          campo5: number | null
          campo6: number | null
          campo7: number | null
          campo8: number | null
          campo9: number | null
          id: string
          idvisita: string
          status: boolean | null
        }
        Insert: {
          atualizadoem?: string
          campo1?: number | null
          campo10?: string | null
          campo2?: number | null
          campo3?: number | null
          campo4?: number | null
          campo5?: number | null
          campo6?: number | null
          campo7?: number | null
          campo8?: number | null
          campo9?: number | null
          id?: string
          idvisita: string
          status?: boolean | null
        }
        Update: {
          atualizadoem?: string
          campo1?: number | null
          campo10?: string | null
          campo2?: number | null
          campo3?: number | null
          campo4?: number | null
          campo5?: number | null
          campo6?: number | null
          campo7?: number | null
          campo8?: number | null
          campo9?: number | null
          id?: string
          idvisita?: string
          status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "resultadoformulario_idvisita_fkey"
            columns: ["idvisita"]
            isOneToOne: false
            referencedRelation: "visita"
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
          classificacao: string | null
          descricao: string
          id: string
        }
        Insert: {
          classificacao?: string | null
          descricao: string
          id?: string
        }
        Update: {
          classificacao?: string | null
          descricao?: string
          id?: string
        }
        Relationships: []
      }
      usuario: {
        Row: {
          atualizadoem: string
          avatar: string
          capa: string
          criadoem: string
          email: string
          id: string
        }
        Insert: {
          atualizadoem?: string
          avatar?: string
          capa?: string
          criadoem?: string
          email: string
          id: string
        }
        Update: {
          atualizadoem?: string
          avatar?: string
          capa?: string
          criadoem?: string
          email?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      usuarioporregiao: {
        Row: {
          idusuario: string
          regiao: Json | null
        }
        Insert: {
          idusuario: string
          regiao?: Json | null
        }
        Update: {
          idusuario?: string
          regiao?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarioporregiao_idusuario_fkey"
            columns: ["idusuario"]
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "sala"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarioporsala_idusuario_fkey"
            columns: ["idusuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          }
        ]
      }
      visita: {
        Row: {
          aceito: boolean | null
          dadosmarcador: Json
          dataagendamento: string
          id: string
          idcorporacao: string
          idcorretor: string
          idimovel: string
        }
        Insert: {
          aceito?: boolean | null
          dadosmarcador: Json
          dataagendamento: string
          id?: string
          idcorporacao: string
          idcorretor: string
          idimovel: string
        }
        Update: {
          aceito?: boolean | null
          dadosmarcador?: Json
          dataagendamento?: string
          id?: string
          idcorporacao?: string
          idcorretor?: string
          idimovel?: string
        }
        Relationships: [
          {
            foreignKeyName: "visita_idcorporacao_fkey"
            columns: ["idcorporacao"]
            isOneToOne: false
            referencedRelation: "corporacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visita_idcorretor_fkey"
            columns: ["idcorretor"]
            isOneToOne: false
            referencedRelation: "corretor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visita_idimovel_fkey"
            columns: ["idimovel"]
            isOneToOne: false
            referencedRelation: "imovel"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      simple_user_data: {
        Row: {
          avatar: string | null
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
          nome: string
          avatar: string
          capa: string
          ispremium: boolean
          role: string
        }[]
      }
      criar_ou_retornar_sala: {
        Args: {
          id_usuario: string
          id_destinatario: string
        }
        Returns: string
      }
      deleta_conexao: {
        Args: {
          uuid1: string
          uuid2: string
        }
        Returns: undefined
      }
      get_conexao: {
        Args: {
          uuid1: string
          uuid2: string
        }
        Returns: {
          id: string
          iniciativa: string
          pendente: boolean
        }[]
      }
      get_connected_users: {
        Args: {
          id_usuario: string
        }
        Returns: {
          id: string
          nome: string
          avatar: string
        }[]
      }
      get_corporacao_com_avatar: {
        Args: {
          corporacao_id: string
        }
        Returns: {
          id: string
          nomefantasia: string
          cnpj: string
          cep: string
          estado: string
          cidade: string
          bairro: string
          logradouro: string
          numero: number
          complemento: string
          premium: boolean
          telefone1: string
          telefone2: string
          telefone3: string
          sobre: string
          avatar: string
        }[]
      }
      get_corretor_com_avatar: {
        Args: {
          corretor_id: string
        }
        Returns: {
          id: string
          nome: string
          cpf: string
          cnpj: string
          creci: string
          cep: string
          estado: string
          cidade: string
          bairro: string
          logradouro: string
          numero: number
          complemento: string
          telefone: string
          celular: string
          comercial: string
          premium: boolean
          sobre: string
          avatar: string
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
          estado: string
          cidade: string
          bairro: string
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
      get_corretores_por_avaliacao: {
        Args: {
          avaliacao: number
        }
        Returns: {
          id: string
          nome: string
          avatar: string
          creci: string
          estado: string
          cidade: string
          sobre: string
          nota: string
        }[]
      }
      get_corretores_por_avaliacao_estado: {
        Args: {
          avaliacao: number
          estadobuscado: string
        }
        Returns: {
          id: string
          nome: string
          avatar: string
          creci: string
          estado: string
          cidade: string
          sobre: string
          nota: string
        }[]
      }
      get_corretores_por_avaliacao_estado_cidade: {
        Args: {
          avaliacao: number
          estadobuscado: string
          cidadebuscada: string
        }
        Returns: {
          id: string
          nome: string
          avatar: string
          creci: string
          estado: string
          cidade: string
          sobre: string
          nota: string
        }[]
      }
      get_corretores_por_avaliacao_estado_cidade_tipoimovel: {
        Args: {
          avaliacao: number
          estadobuscado: string
          cidadebuscada: string
          tiposimovel: string[]
        }
        Returns: {
          id: string
          nome: string
          avatar: string
          creci: string
          estado: string
          cidade: string
          sobre: string
          nota: string
        }[]
      }
      get_corretores_por_avaliacao_estado_tipoimovel: {
        Args: {
          avaliacao: number
          estadobuscado: string
          tiposimovel: string[]
        }
        Returns: {
          id: string
          nome: string
          avatar: string
          creci: string
          estado: string
          cidade: string
          sobre: string
          nota: string
        }[]
      }
      get_corretores_por_avaliacao_tipoimovel: {
        Args: {
          avaliacao: number
          tiposimovel: string[]
        }
        Returns: {
          id: string
          nome: string
          avatar: string
          creci: string
          estado: string
          cidade: string
          sobre: string
          nota: string
        }[]
      }
      get_dados_sala: {
        Args: {
          idsala_param: string
        }
        Returns: {
          idsala: string
          iddestinatario: string
          nomedestinatario: string
          avatar: string
          mensagens: Json
        }[]
      }
      get_empresas: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          nomefantasia: string
          avatar: string
          estado: string
          cidade: string
          sobre: string
        }[]
      }
      get_empresas_por_estado: {
        Args: {
          estadobuscado: string
        }
        Returns: {
          id: string
          nomefantasia: string
          avatar: string
          estado: string
          cidade: string
          sobre: string
        }[]
      }
      get_empresas_por_estado_cidade: {
        Args: {
          estadobuscado: string
          cidadebuscada: string
        }
        Returns: {
          id: string
          nomefantasia: string
          avatar: string
          estado: string
          cidade: string
          sobre: string
        }[]
      }
      get_id_conexao: {
        Args: {
          uuid1: string
          uuid2: string
        }
        Returns: {
          id: string
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
      get_imoveis_por_id: {
        Args: {
          id_imovel: string
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
      get_publicacao_por_cidade: {
        Args: {
          estado: string
          cidade: string
        }
        Returns: {
          id: string
          idautor: string
          avatar: string
          nomeautor: string
          regiao: Json
          conteudo: string
          imagem: string
          criadoem: string
          atualizadoem: string
        }[]
      }
      get_publicacao_por_estado: {
        Args: {
          estado: string
        }
        Returns: {
          id: string
          idautor: string
          avatar: string
          nomeautor: string
          regiao: Json
          conteudo: string
          imagem: string
          criadoem: string
          atualizadoem: string
        }[]
      }
      get_publicacoes: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          idautor: string
          avatar: string
          nomeautor: string
          regiao: Json
          conteudo: string
          imagem: string
          criadoem: string
          atualizadoem: string
        }[]
      }
      get_publicacoes_salvas: {
        Args: {
          idusuario: string
        }
        Returns: {
          id: string
          idautor: string
          avatar: string
          nomeautor: string
          regiao: Json
          conteudo: string
          imagem: string
          criadoem: string
          atualizadoem: string
          issalvo: boolean
        }[]
      }
      get_tipoimovel_by_idcorretor: {
        Args: {
          idcorret: string
        }
        Returns: {
          id: string
          descricao: string
        }[]
      }
      get_tipoimovel_por_id: {
        Args: {
          id_imovel: string
        }
        Returns: {
          descricao: string
        }[]
      }
      get_user_estado: {
        Args: {
          id_usuario: string
        }
        Returns: {
          estado: string
        }[]
      }
      get_user_estado_cidade: {
        Args: {
          id_usuario: string
        }
        Returns: {
          estado: string
          cidade: string
        }[]
      }
      get_usuario_por_estado: {
        Args: {
          estado: string
        }
        Returns: {
          idusuario: string
        }[]
      }
      get_usuarios_por_cidade: {
        Args: {
          estado: string
          cidade: string
        }
        Returns: {
          idusuario: string
        }[]
      }
      get_usuarios_por_estado: {
        Args: {
          estado: string
        }
        Returns: {
          idusuario: string
        }[]
      }
      getdiasvisita: {
        Args: {
          mesparam: number
          anoparam: number
          id_cor: string
          id_cor2?: string
        }
        Returns: {
          diavisita: number
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
      obter_avaliacoes: {
        Args: {
          id_cor: string
        }
        Returns: {
          id: string
          nome_cliente: string
          avaliacao: string
          nota: number
        }[]
      }
      obter_cidade_estado_por_usuario: {
        Args: {
          user_id: string
        }
        Returns: {
          cidade: string
          estado: string
        }[]
      }
      obter_cinco_corretores_id: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar: string
        }[]
      }
      obter_conexao: {
        Args: {
          uuid1: string
          uuid2: string
        }
        Returns: {
          idusuario1: string
          idusuario2: string
          pendente: boolean
          iniciativa: string
        }[]
      }
      obter_corporacoes_por_corretor: {
        Args: {
          id_corretor: string
        }
        Returns: {
          id: string
          nome: string
          avatar: string
        }[]
      }
      obter_corretores_por_corporacao: {
        Args: {
          id_corporacao: string
        }
        Returns: {
          id: string
          nome: string
          avatar: string
        }[]
      }
      obter_corretores_por_estado: {
        Args: {
          estadoinputado: string
        }
        Returns: {
          id: string
          nome: string
          avatar: string
          creci: string
          estado: string
          cidade: string
          sobre: string
        }[]
      }
      obter_dados_dashboard_1: {
        Args: {
          idcorretor_param: string
        }
        Returns: {
          id: string
          profissionalismo: number
          comunicacao: number
          conhecimento: number
          transparencia: number
          detalhista: number
          clareza: number
        }[]
      }
      obter_dados_dashboard_2: {
        Args: {
          idcorretor_param: string
        }
        Returns: {
          id: string
          muito_insatisfeito: number
          insatisfeito: number
          neutro: number
          satisfeito: number
          muito_satisfeito: number
        }[]
      }
      obter_dados_dashboard_3: {
        Args: {
          idcorretor_param: string
        }
        Returns: {
          id: string
          indeciso: number
          intencao: number
          sem_interesse: number
          total: number
        }[]
      }
      obter_dados_dashboard_4: {
        Args: {
          idcorretor_param: string
        }
        Returns: {
          descricao: Json[]
        }[]
      }
      obter_dados_dashboard_empresa_1: {
        Args: {
          idempresa_param: string
        }
        Returns: {
          descricao: Json[]
        }[]
      }
      obter_dados_dashboard_empresa_2: {
        Args: {
          idempresa_param: string
        }
        Returns: {
          id: string
          indeciso: number
          intencao: number
          sem_interesse: number
          total: number
        }[]
      }
      obter_dados_survey: {
        Args: {
          visita_id: string
        }
        Returns: {
          corporacao: string
          corretor: string
          datavisita: string
          cliente: string
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
      obter_ultimas_mensagens_por_usuario: {
        Args: {
          idusuario: string
        }
        Returns: {
          idmensagem: string
          idsala: string
          idautor: string
          nomeautor: string
          avatarautor: string
          mensagem: string
          atualizadoem: string
          idparticipante: string
          nomeparticipante: string
          avatarparticipante: string
        }[]
      }
      obter_usuarios_aleatorios: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar: string
          id: string
        }[]
      }
      obter_visitas_aceitas_pelo_corretor: {
        Args: {
          corretor_id: string
        }
        Returns: {
          visita_id: string
          visita_status: boolean
          nome_corporacao: string
          nome_corretor: string
          data_agendamento: string
          nome_marcador: string
          telefone_marcador: string
          email_marcador: string
          estado_imovel: string
          cidade_imovel: string
          bairro_imovel: string
          rua_imovel: string
          numero_imovel: number
          cep_imovel: string
          complemento_imovel: string
          survey_id: string
        }[]
      }
      obter_visitas_da_corporacao: {
        Args: {
          corporacao_id: string
        }
        Returns: {
          visita_id: string
          visita_status: boolean
          nome_corporacao: string
          nome_corretor: string
          data_agendamento: string
          nome_marcador: string
          telefone_marcador: string
          email_marcador: string
          estado_imovel: string
          cidade_imovel: string
          bairro_imovel: string
          rua_imovel: string
          numero_imovel: number
          cep_imovel: string
          complemento_imovel: string
          survey_id: string
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
      verifica_se_conexao_existe: {
        Args: {
          uuid1: string
          uuid2: string
        }
        Returns: {
          idusuario1: string
          idusuario2: string
          pendente: boolean
          iniciativa: string
        }[]
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
