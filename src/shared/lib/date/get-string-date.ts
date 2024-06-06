export const getStringDate = (date: string) => {
  if (!date) {
    return ''
  }
  return new Date(date).toLocaleString()
}
