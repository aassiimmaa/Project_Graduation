import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Pagination,
  Typography,
  Divider,
  TableRow,
  Tooltip,
  TextField,
  Box
} from '@mui/material'
import TableHeadCell from '../TableHeadCell'
import TableBodyCell from '../TableBodyCell'
import DeleteIcon from '@mui/icons-material/Delete'
import PlaceIcon from '@mui/icons-material/Place'
import CheckIcon from '@mui/icons-material/Check'
import SearchIcon from '@mui/icons-material/Search'
import { Visibility } from '@mui/icons-material'
import {
  ACCEPT_ORDER,
  ACTION,
  ALIGN_CENTER,
  CREATED_AT,
  DELETE_ORDER,
  DETAIL_ORDER,
  FONT_WEIGHT_BOLD,
  FROM_DATE,
  LOCATION_CAR,
  NO_DATA_AVAILABLE,
  ORDER_MANAGEMENT,
  PAYMENT_STATUS,
  PLACEHOLDER_SEARCH,
  PRIMARY_COLOR,
  SEARCH_TEXT_BTN,
  SERIAL,
  SIZE_BUTTON,
  SIZE_PAGINATION,
  STATUS,
  TABLE_TITLE_VARIANT,
  TO_DATE,
  TOTAL_PRICE,
  USER_NAME,
  VARIANT_BUTTON,
  VARIANT_SEARCH,
  W_10,
  W_15,
  W_5
} from '~/app/shared/constant'
import {
  PaginationContainer,
  styleAcceptButton,
  styleButtonContainer,
  styleButtonContainerChildren,
  styleDeleteButton,
  styleDetailButton,
  styleDivider,
  StyledTableHead,
  StyledTableRow,
  styleLocationButton,
  stylePagination,
  styleSearchBox,
  styleSearchButton,
  styleSearchTextField,
  styleTableContainer
} from '~/app/shared/styles/AdminTable'

// Mock data
const orders = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  fullName: `Người dùng ${index + 1}`,
  fromDate: `${(index % 30) + 1}/12/2024`,
  toDate: `${(index % 30) + 1}/12/2024`,
  createdAt: '23:59:59 - 30/04/2025',
  totalAmount: `${(index + 1) * 1000000}`,
  status: ['Chờ duyệt', 'Đang thuê', 'Hủy', 'Hoàn tất'][index % 4],
  paymentStatus: index % 2 === 0 ? 'Đã thanh toán' : 'Chưa thanh toán'
}))

const OrdersManagement: React.FC = () => {
  const [page, setPage] = useState(1) // Trang hiện tại (Pagination bắt đầu từ 1)
  const [searchTerm, setSearchTerm] = useState('') // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('') // Từ khóa thực hiện tìm kiếm
  const rowsPerPage = 5 // Số dòng mỗi trang

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredOrders = orders.filter(order =>
    order.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage) // Tổng số trang

  // Hàm xử lý thay đổi trang
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // Cắt dữ liệu thành từng trang
  const paginatedorders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    setSearchQuery(searchTerm) // Cập nhật từ khóa tìm kiếm thực tế
    setPage(1) // Reset về trang đầu tiên
  }

  return (
    <>
      <Typography variant={TABLE_TITLE_VARIANT} fontWeight={FONT_WEIGHT_BOLD}>
        {ORDER_MANAGEMENT}
      </Typography>
      <Divider sx={styleDivider} />

      <Box sx={styleSearchBox}>
        <TextField
          placeholder={PLACEHOLDER_SEARCH}
          variant={VARIANT_SEARCH}
          size={SIZE_BUTTON}
          fullWidth
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={styleSearchTextField}
        />
        <Button
          variant={VARIANT_BUTTON}
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={styleSearchButton}
        >
          {SEARCH_TEXT_BTN}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={styleTableContainer}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableHeadCell align={ALIGN_CENTER} width={W_5}>
                {SERIAL}
              </TableHeadCell>
              <TableHeadCell>{USER_NAME}</TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {FROM_DATE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {TO_DATE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                {CREATED_AT}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                {TOTAL_PRICE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {STATUS}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {PAYMENT_STATUS}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {ACTION}
              </TableHeadCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedorders.length > 0 ? (
              paginatedorders.map((order, index) => (
                <StyledTableRow key={order.id}>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {index + 1 + (page - 1) * rowsPerPage}
                  </TableBodyCell>
                  <TableBodyCell>{order.fullName}</TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {order.fromDate}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {order.toDate}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {order.createdAt}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {order.totalAmount}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {order.status}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {order.paymentStatus}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    <Box sx={styleButtonContainer}>
                      <Box sx={styleButtonContainerChildren}>
                        <Tooltip title={ACCEPT_ORDER}>
                          <Button
                            variant={VARIANT_BUTTON}
                            size={SIZE_BUTTON}
                            sx={styleAcceptButton}
                          >
                            <CheckIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title={DETAIL_ORDER}>
                          <Button
                            variant={VARIANT_BUTTON}
                            size={SIZE_BUTTON}
                            sx={styleDetailButton}
                          >
                            <Visibility />
                          </Button>
                        </Tooltip>
                      </Box>

                      <Box sx={styleButtonContainerChildren}>
                        <Tooltip title={LOCATION_CAR}>
                          <Button
                            variant={VARIANT_BUTTON}
                            size={SIZE_BUTTON}
                            sx={styleLocationButton}
                          >
                            <PlaceIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title={DELETE_ORDER}>
                          <Button
                            variant={VARIANT_BUTTON}
                            size={SIZE_BUTTON}
                            sx={styleDeleteButton}
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </Box>
                    </Box>
                  </TableBodyCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableBodyCell align={ALIGN_CENTER} colSpan={10}>
                  {NO_DATA_AVAILABLE}
                </TableBodyCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>

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
      </TableContainer>
    </>
  )
}

export default OrdersManagement
