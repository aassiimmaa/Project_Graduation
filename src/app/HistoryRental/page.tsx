'use client'
import React, { useEffect, useState } from 'react'
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
  Box,
  Pagination
} from '@mui/material'
import { Cancel, Visibility } from '@mui/icons-material'
import { NavBar } from '../components/NavBar'
import TableHeadCell from '../components/TableHeadCell'
import TableBodyCell from '../components/TableBodyCell'
import { cancelOrder, getHistoryRentalByUserId } from '~/actions/order.action'
import { HistoryRentalProps, MuiColor } from '../shared/inteface'
import {
  ACTION,
  ALIGN_CENTER,
  CANCEL_TEXT,
  DETAIL,
  ERROR_COLOR,
  FONT_WEIGHT_BOLD,
  FROM_DATE,
  HISTORY_RENTAL,
  INFO_COLOR,
  PRIMARY_COLOR,
  SERIAL,
  SIZE_CONTAINER,
  SIZE_PAGINATION,
  STATUS,
  STORAGE_DATA_USER,
  TO_DATE,
  TOTAL_PRICE,
  USER_NAME,
  VARIANT_BUTTON,
  W_10,
  W_15,
  W_5
} from '../shared/constant'
import { formatDate } from '~/lib/formatDate'
import { totalPrice } from '~/lib/totalPrice'
import { getRentalDays } from '~/lib/getRentalDay'
import { formatPrice } from '~/lib/formatPrice'
import {
  styleActionButton,
  styleActionButtonContainer,
  styleCardContainer,
  styleHoverRow,
  styleLayoutTable,
  styleRowTitle,
  styleTitleTable
} from '../shared/styles/HistoryRental'
import { getStatusStyle } from '~/lib/getStatusStyle'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  PaginationContainer,
  stylePagination
} from '../shared/styles/AdminTable'

const RentalHistoryPage: React.FC = () => {
  const [rentalData, setRentalData] = useState<HistoryRentalProps[]>([])
  const [page, setPage] = useState(1)
  const rowsPerPage = 8

  const user = JSON.parse(localStorage.getItem(STORAGE_DATA_USER) || '')

  const handleCancelOrder = async (orderId: string, status: number) => {
    const res = await cancelOrder(orderId, status)

    if (res.success) {
      toast.success(res.message)
      fetchHistoryRental()
    } else {
      toast.error(res.message)
    }
  }

  const fetchHistoryRental = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để sử dụng chức năng này!')
      return
    }

    const data = await getHistoryRentalByUserId(user.id)
    setRentalData(data?.orders ?? [])
  }

  useEffect(() => {
    fetchHistoryRental()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = Math.ceil(rentalData.length / rowsPerPage) // Tổng số trang
  // Hàm xử lý thay đổi trang
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const paginatedData = rentalData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )

  return (
    <>
      <NavBar />
      <Container maxWidth={SIZE_CONTAINER} sx={styleLayoutTable}>
        <Card elevation={4} sx={styleCardContainer}>
          <Box sx={styleTitleTable}>
            <Typography variant="h4" fontWeight={FONT_WEIGHT_BOLD}>
              {HISTORY_RENTAL}
            </Typography>
          </Box>

          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={styleRowTitle}>
                    <TableHeadCell align={ALIGN_CENTER} width={W_5}>
                      {SERIAL}
                    </TableHeadCell>
                    <TableHeadCell width={W_15}>{USER_NAME}</TableHeadCell>
                    <TableHeadCell width={W_10}>{FROM_DATE}</TableHeadCell>
                    <TableHeadCell width={W_10}>{TO_DATE}</TableHeadCell>
                    <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                      {TOTAL_PRICE}
                    </TableHeadCell>
                    <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                      {STATUS}
                    </TableHeadCell>
                    <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                      {ACTION}
                    </TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((order, index) => {
                    const statusStyle = getStatusStyle(order.status)
                    return (
                      <TableRow key={index} sx={styleHoverRow}>
                        <TableBodyCell
                          fontWeight={FONT_WEIGHT_BOLD.toString()}
                          align={ALIGN_CENTER}
                        >
                          {page * rowsPerPage + index + 1}
                        </TableBodyCell>

                        <TableBodyCell>{order.users.name}</TableBodyCell>
                        <TableBodyCell>
                          {formatDate(order.fromDay)}
                        </TableBodyCell>
                        <TableBodyCell>{formatDate(order.toDay)}</TableBodyCell>
                        <TableBodyCell
                          fontWeight={FONT_WEIGHT_BOLD.toString()}
                          align={ALIGN_CENTER}
                          color="#2E7D32"
                        >
                          💰{' '}
                          {formatPrice(
                            totalPrice(
                              order.vehicles.price,
                              getRentalDays(
                                formatDate(order.fromDay),
                                formatDate(order.toDay)
                              )
                            ).toString()
                          )}
                        </TableBodyCell>
                        <TableBodyCell align={ALIGN_CENTER}>
                          <Chip
                            label={statusStyle.description}
                            color={statusStyle.color as MuiColor}
                            icon={statusStyle.icon || undefined}
                            sx={{ width: 130 }}
                          />
                        </TableBodyCell>
                        <TableCell sx={{ textAlign: ALIGN_CENTER }}>
                          <Box sx={styleActionButtonContainer}>
                            <Link href={`/HistoryRental/${order.orderId}`}>
                              <Button
                                variant={VARIANT_BUTTON}
                                color={INFO_COLOR}
                                startIcon={<Visibility />}
                                sx={styleActionButton}
                              >
                                {DETAIL}
                              </Button>
                            </Link>
                            <Button
                              variant={VARIANT_BUTTON}
                              color={ERROR_COLOR}
                              startIcon={<Cancel />}
                              disabled={order.status !== 0}
                              sx={styleActionButton}
                              onClick={() =>
                                handleCancelOrder(order.orderId, order.status)
                              }
                            >
                              {CANCEL_TEXT}
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Phân trang */}
            <PaginationContainer>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color={PRIMARY_COLOR}
                size={SIZE_PAGINATION}
                sx={stylePagination}
              />
            </PaginationContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default RentalHistoryPage
