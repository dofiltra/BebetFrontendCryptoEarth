import type { TFilterDate } from '@/Components/App/Statistic/Statistic.types'

export function getDateByFilter(filter?: TFilterDate): Date {
  const now = new Date()

  if (!filter || filter === 'all') {
    const allDate = new Date()
    allDate.setFullYear(allDate.getFullYear() - 10);
    return allDate
  }

  switch (filter) {
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
