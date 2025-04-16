export const formatPrice = (value: string) => {
  const onlyNumbers = value.replace(/[^0-9]/g, '')
  return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}