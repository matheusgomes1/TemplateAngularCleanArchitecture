export enum Situacao {
  Ativo = 0,
  Inativo = 1,
  Pendente = 2
}

export const situacaoToStringMap = new Map<Situacao, string>([
  [Situacao.Ativo, 'Ativo'],
  [Situacao.Inativo, 'Inativo'],
  [Situacao.Pendente, 'Pendente']
])