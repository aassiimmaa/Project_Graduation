'use client'

import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

const stats = [
  { title: 'Tổng số đơn hàng', value: 125, icon: <ShoppingCartIcon fontSize="large" /> },
  { title: 'Người dùng đăng ký', value: 340, icon: <PeopleIcon fontSize="large" /> },
  { title: 'Doanh thu tháng này', value: '$12,540', icon: <MonetizationOnIcon fontSize="large" /> },
  { title: 'Báo cáo chung', value: '10%', icon: <DashboardIcon fontSize="large" /> }
]

export default function AdminDashboard() {
  return (
    <Box>
      ????
    </Box>
  )
}
