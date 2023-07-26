import { Filters } from '../../../Components/App/Statistic/Statistic'

export function getDateByFilter(dateValue?: Filters): Date {
  const currentDate = new Date()
  if (!dateValue || dateValue === 'all' || dateValue === 'month') {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  }

  switch (dateValue) {
    case 'week':
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      return startOfWeek
    case 'yesterday':
      const yesterday = new Date(currentDate)
      yesterday.setDate(currentDate.getDate() - 1)
      return yesterday
    case 'today':
      return currentDate
    default:
      throw new Error('Invalid dateValue. Accepted values are "month", "week", "yesterday", or "today".')
  }
}
