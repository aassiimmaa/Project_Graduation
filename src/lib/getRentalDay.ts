export const getRentalDays = (from: string, to: string) => {
  const start = new Date(from)
  const end = new Date(to)
  const diffTime = end.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 để tính cả ngày đầu và cuối
  return diffDays
}