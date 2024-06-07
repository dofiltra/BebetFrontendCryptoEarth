export type TFullStatistic = {
  traffic?: DataEntry[] | null
  registractions?: DataEntry[] | null
  ratioTrafficRegistration?: DataEntry[] | null
  avgIncome?: DataEntry[] | null
  traffic2?: DataEntry[] | null
  depositsFirst?: DataEntry[] | null
  depositsCompleted?: DataEntry[] | null
  depositsRatio?: DataEntry[] | null
  depositsSummary?: DataEntry[] | null
  income?: DataEntry[] | null
}

export interface DataEntry {
  date: string
  data: number
}

export interface TransformedData {
  name: string
  ['Сумма депозита']: number | string
  ['Средний доход с игрока']: number | string
  ['Переходы']: number | string
  ['Депозит']: number | string
  ['Регистрации']: number | string
}

export type TFilterDate = 'all' | 'month' | 'week' | 'yesterday' | 'today'
