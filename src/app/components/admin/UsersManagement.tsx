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
import BlockIcon from '@mui/icons-material/Block'
import {
  ACTION,
  ALIGN_CENTER,
  BANNED,
  CREATED_AT,
  DELETE_USER,
  EMAIL,
  FONT_WEIGHT_BOLD,
  NO_DATA_AVAILABLE,
  PHONE_NUMBER,
  PLACEHOLDER_SEARCH,
  PRIMARY_COLOR,
  ROLE,
  SEARCH_TEXT_BTN,
  SERIAL,
  SIZE_BUTTON,
  SIZE_PAGINATION,
  TABLE_TITLE_VARIANT,
  USER_MANAGEMENT,
  USER_NAME,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  W_10,
  W_15,
  W_20,
  W_5
} from '~/app/shared/constant'
import {
  PaginationContainer,
  styleBannedButton,
  styleDeleteButton,
  styleDivider,
  StyledTableHead,
  StyledTableRow,
  stylePagination,
  styleSearchBox,
  styleSearchButton,
  styleSearchTextField,
  styleTableContainer
} from '~/app/shared/styles/AdminTable'
import SearchIcon from '@mui/icons-material/Search'

// Mock data
const users = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Người dùng ${index + 1}`,
  email: `user${index + 1}@example.com`,
  phone: `012345678${index % 10}`,
  createdAt: '23:59:59 - 30/04/2025',
  role: index % 2 === 0 ? 'Admin' : 'User'
}))

const UsersManagement: React.FC = () => {
  const [page, setPage] = useState(1) // Trang hiện tại (Pagination bắt đầu từ 1)
  const [searchTerm, setSearchTerm] = useState('') // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('') // Từ khóa thực hiện tìm kiếm
  const rowsPerPage = 8 // Số dòng mỗi trang

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) // Tổng số trang

  // Hàm xử lý thay đổi trang
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // Cắt dữ liệu thành từng trang
  const paginatedUsers = filteredUsers.slice(
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
        {USER_MANAGEMENT}
      </Typography>
      <Divider sx={styleDivider} />

      <Box sx={styleSearchBox}>
        <TextField
          placeholder={PLACEHOLDER_SEARCH}
          variant={VARIANT_INPUT}
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
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {SERIAL}
              </TableHeadCell>
              <TableHeadCell width={W_20}>{USER_NAME}</TableHeadCell>
              <TableHeadCell>{EMAIL}</TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {PHONE_NUMBER}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_20}>
                {CREATED_AT}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_5}>
                {ROLE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                {ACTION}
              </TableHeadCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => (
                <StyledTableRow key={user.id}>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {index + 1 + (page - 1) * rowsPerPage}
                  </TableBodyCell>
                  <TableBodyCell>{user.name}</TableBodyCell>
                  <TableBodyCell>{user.email}</TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {user.phone}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {user.createdAt}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {user.role}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    <Tooltip title={BANNED}>
                      <Button
                        variant={VARIANT_BUTTON}
                        size={SIZE_BUTTON}
                        sx={styleBannedButton}
                      >
                        <BlockIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title={DELETE_USER}>
                      <Button
                        variant={VARIANT_BUTTON}
                        size={SIZE_BUTTON}
                        sx={styleDeleteButton}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </TableBodyCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableBodyCell align={ALIGN_CENTER} colSpan={7}>
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

export default UsersManagement
