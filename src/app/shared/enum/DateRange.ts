export enum DateRange {
  All = 0,
  Date = 1,
  Month = 2,
  Year = 3
}

export const DATE_RANGE = [
  { value: DateRange.All, label: 'Tất cả' },
  { value: DateRange.Date, label: 'Ngày' },
  { value: DateRange.Month, label: 'Tháng' },
  { value: DateRange.Year, label: 'Năm' }
]
