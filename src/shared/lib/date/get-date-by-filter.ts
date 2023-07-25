export function getDateByFilter(dateValue: 'month' | 'week' | 'yesterday' | 'today'): Date {
  const currentDate = new Date();

  switch (dateValue) {
    case 'month':
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    case 'week':
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      return startOfWeek;
    case 'yesterday':
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      return yesterday;
    case 'today':
      return currentDate;
    default:
      throw new Error('Invalid dateValue. Accepted values are "month", "week", "yesterday", or "today".');
  }
}
