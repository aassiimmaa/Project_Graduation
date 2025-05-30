'use client'

import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { LINK_TO_LOGO } from '../shared/constant'

export default function AdminDashboard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Image
        src={LINK_TO_LOGO}
        alt="AnRental Logo"
        width={220}
        height={180}
        priority
      />
      <Typography variant="h4" fontWeight={600} color="#000" mt={2}>
        Chào mừng đến với trang quản lý AnRental!
      </Typography>
      <Typography variant="body1" color="#0008" mt={1} mb={2} maxWidth={600}>
        Hệ thống quản lý chuyên nghiệp giúp bạn dễ dàng kiểm soát đơn hàng,
        khách hàng, và hoạt động kinh doanh của mình.
      </Typography>
    </Box>
  )
}
