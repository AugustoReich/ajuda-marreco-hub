export type Prioridade = 'baixa' | 'media' | 'me_ajuda_ai_marreco';

export interface Marreco {
  _id: string;
  nome: string;
  idade?: number;
  curso: string;
  universidade: string;
  semestre: number;
  profissao?: string;
  genero?: string;
  foto?: string;
  biografia?: string;
  moderador: boolean;
  data_cadastro: string;
}

export interface Resposta {
  _id: string;
  marreco: Marreco;
  corpo: string;
  avaliacao: number;
  data: string;
  respostas: Resposta[];
}

export interface Ajuda {
  _id: string;
  titulo: string;
  data: string;
  resolvida: boolean;
  marreco: Marreco;
  prioridade: Prioridade;
  corpo: string;
  respostas: Resposta[];
  categoria: string;
}

export interface Categoria {
  _id: string;
  nome: string;
  descricao: string;
  icone: string;
}
