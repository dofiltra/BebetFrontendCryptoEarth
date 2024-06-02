import { Filters } from '@/Components/App/Statistic/Statistic.types'

export function getDateByFilter(dateValue?: Filters): Date {
  const now = new Date()

  if (!dateValue || dateValue === 'all') {
    const startOfYear = new Date(now)
    startOfYear.setDate(now.getDate() - 365)
    return startOfYear
  }

  switch (dateValue) {
    case 'month': {
      return new Date(now.getFullYear(), now.getMonth(), 1)
    }
    case 'week': {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
    }
    case 'yesterday': {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    }
    case 'today': {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }
    default:
      throw new Error('Invalid dateValue. Accepted values are "month", "week", "yesterday", or "today".')
  }
}
