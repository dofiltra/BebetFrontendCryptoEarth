import type { TFilterDate } from '@/Components/App/Statistic/Statistic.types'

export function getDateByFilter(filter?: TFilterDate): { startDate: Date; endDate: Date } {
  const now = new Date()

  if (!filter || filter === 'all') {
    const allDate = new Date()
    allDate.setFullYear(allDate.getFullYear() - 10)
    return { startDate: allDate, endDate: new Date() }
  }

  switch (filter) {
    case 'month': {
      return {
        startDate: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
        endDate: new Date(),
      }
    }
    case 'week': {
      return {
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
        endDate: new Date(),
      }
    }
    case 'yesterday': {
      return {
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
        endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      }
    }
    case 'today': {
      return {
        startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        endDate: new Date(),
      }
    }
    default:
      throw new Error('Invalid dateValue. Accepted values are "all", "month", "week", "yesterday", or "today".')
  }
}
