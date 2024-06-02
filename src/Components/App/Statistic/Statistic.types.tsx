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
  trafficPrice?: DataEntry[] | null
}

export interface DataEntry {
  date: string
  data: number
}

export interface TransformedData {
  name: string
  [key: string]: number | string
}

export type Filters = 'all' | 'month' | 'week' | 'yesterday' | 'today'
