import type { TDashboardItemData } from '@/shared/ui/dashboard/types'

export type TFullStatistic = {
  traffic?: TDashboardItemData
  registractions?: TDashboardItemData
  ratioTrafficRegistration?: TDashboardItemData
  avgIncome?: TDashboardItemData
  traffic2?: TDashboardItemData
  depositsFirst?: TDashboardItemData
  depositsCompleted?: TDashboardItemData
  depositsRatio?: TDashboardItemData
  depositsSummary?: TDashboardItemData
  income?: TDashboardItemData
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
