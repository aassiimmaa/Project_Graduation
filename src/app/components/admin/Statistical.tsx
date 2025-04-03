import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { Card, CardContent, Typography } from '@mui/material'

const orders = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  fullName: `Người dùng ${index + 1}`,
  fromDate: `2025-04-${(index % 30) + 1}`,
  toDate: `2025-05-${(index % 30) + 1}`,
  createdAt: '23:59:59 - 30/04/2025',
  totalAmount: (index + 1) * 100,
  status: ['Chờ duyệt', 'Đang thuê', 'Hủy', 'Hoàn tất'][index % 4],
  paymentStatus: index % 2 === 0 ? 'Đã thanh toán' : 'Chưa thanh toán'
}))

const timePeriods = ['Ngày', 'Tuần', 'Tháng', 'Quý', 'Năm']

const revenueData = orders.reduce(
  (acc, order) => {
    const periodValues = [1, 7, 30, 90, 365]
    periodValues.forEach((value, index) => {
      acc[index].revenue += order.totalAmount / 50
    })
    return acc
  },
  timePeriods.map(period => ({ name: period, revenue: 0 }))
)

const RevenueChart = () => (
  <Card>
    <CardContent sx={{ backgroundColor: '#fff' }}>
      <Typography variant="h6" gutterBottom>
        Thống kê doanh thu
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <XAxis dataKey="name" />
          <YAxis  />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Line dataKey="revenue" fill="#3f51b5" type='monotone'/>
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

export default RevenueChart
