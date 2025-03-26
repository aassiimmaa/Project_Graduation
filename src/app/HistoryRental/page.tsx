'use client'
import React from 'react'
import {
  Container,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material'
import {
  Cancel,
  Visibility,
  HourglassEmpty,
  CheckCircle,
  DirectionsCar
} from '@mui/icons-material'
import { NavBar } from '../components/NavBar'
import TableHeadCell from '../components/TableHeadCell'
import TableBodyCell from '../components/TableBodyCell'

const rentalData = [
  {
    name: 'Nguyễn Văn A',
    fromDate: '10/03/2024',
    toDate: '15/03/2024',
    total: '5,000,000 VND',
    status: 'Đang thuê'
  },
  {
    name: 'Trần Thị B',
    fromDate: '05/02/2024',
    toDate: '10/02/2024',
    total: '3,500,000 VND',
    status: 'Hoàn tất'
  },
  {
    name: 'Lê Văn C',
    fromDate: '20/01/2024',
    toDate: '25/01/2024',
    total: '4,200,000 VND',
    status: 'Chờ duyệt'
  },
  {
    name: 'Phạm Minh D',
    fromDate: '01/04/2024',
    toDate: '07/04/2024',
    total: '6,800,000 VND',
    status: 'Hủy'
  }
]

// Hàm hiển thị màu và icon trạng thái
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Chờ duyệt':
      return { color: 'warning', icon: <HourglassEmpty fontSize="small" /> }
    case 'Đang thuê':
      return { color: 'primary', icon: <DirectionsCar fontSize="small" /> }
    case 'Hoàn tất':
      return { color: 'success', icon: <CheckCircle fontSize="small" /> }
    case 'Hủy':
      return { color: 'error', icon: <Cancel fontSize="small" /> }
    default:
      return { color: undefined, icon: null }
  }
}

//Styles
const styleLayoutTable = { mt: 12, mb: 6 }

const styleCardContainer = { borderRadius: 3, overflow: 'hidden' }

const styleTitleTable = {
  p: 3,
  backgroundColor: '#2864c0',
  color: 'white',
  textAlign: 'center'
}

const RentalHistoryPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={styleLayoutTable}>
        <Card elevation={4} sx={styleCardContainer}>
          {/* Tiêu đề */}
          <Box sx={styleTitleTable}>
            <Typography variant="h4" fontWeight="600">
              Lịch Sử Thuê Xe
            </Typography>
          </Box>

          {/* Nội dung bảng */}
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#E3F2FD' }}>
                    <TableHeadCell align="center" width="5%">
                      STT
                    </TableHeadCell>
                    <TableHeadCell width="15%">Tên Người Thuê</TableHeadCell>
                    <TableHeadCell width="10%">Từ Ngày</TableHeadCell>
                    <TableHeadCell width="10%">Đến Ngày</TableHeadCell>
                    <TableHeadCell align="center" width="10%">
                      Tổng Tiền
                    </TableHeadCell>
                    <TableHeadCell align="center" width="15%">
                      Trạng Thái
                    </TableHeadCell>
                    <TableHeadCell align="center" width="15%">
                      Hành Động
                    </TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rentalData.map((order, index) => {
                    const statusStyle = getStatusStyle(order.status)

                    return (
                      <TableRow
                        key={index}
                        sx={{
                          transition: '0.3s',
                          '&:hover': { backgroundColor: '#a1bcec3d' }
                        }}
                      >
                        <TableBodyCell fontWeight="600" align="center">
                          {index + 1}
                        </TableBodyCell>

                        <TableBodyCell>{order.name}</TableBodyCell>
                        <TableBodyCell>{order.fromDate}</TableBodyCell>
                        <TableBodyCell>{order.toDate}</TableBodyCell>
                        <TableBodyCell
                          fontWeight="600"
                          align="center"
                          color="#2E7D32"
                        >
                          💰 {order.total}
                        </TableBodyCell>
                        <TableBodyCell align="center">
                          <Chip
                            label={order.status}
                            color={
                              statusStyle.color as
                                | 'default'
                                | 'error'
                                | 'primary'
                                | 'secondary'
                                | 'info'
                                | 'success'
                                | 'warning'
                                | undefined
                            }
                            icon={statusStyle.icon || undefined}
                            sx={{ width: 130 }}
                          />
                        </TableBodyCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 1,
                              justifyContent: 'center'
                            }}
                          >
                            <Button
                              variant="contained"
                              color="info"
                              startIcon={<Visibility />}
                              sx={{ textTransform: 'none', fontSize: '0.9rem' }}
                            >
                              Xem
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<Cancel />}
                              disabled={
                                order.status === 'Chờ duyệt' ? false : true
                              }
                              sx={{
                                textTransform: 'none',
                                fontSize: '0.9rem'
                              }}
                            >
                              Hủy
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default RentalHistoryPage
