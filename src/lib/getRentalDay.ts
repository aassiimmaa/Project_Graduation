const parseDateFromString = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day) // tháng bắt đầu từ 0
}

export const getRentalDays = (from: string, to: string): number => {
  const start = parseDateFromString(from)
  const end = parseDateFromString(to)

  const diffTime = end.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1

  return diffDays
}