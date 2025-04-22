export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.toLocaleString('en', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}
