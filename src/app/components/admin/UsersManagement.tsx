import React, { useEffect, useState } from 'react'
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
  Box,
  Avatar
} from '@mui/material'
import TableHeadCell from '../TableHeadCell'
import TableBodyCell from '../TableBodyCell'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import {
  ACTION,
  ALIGN_CENTER,
  AVATAR,
  BAN_TITLE,
  BANNED,
  BUTTON_WRAPPER_COMPONENT,
  CANNOT_BANNED,
  CANNOT_DELETE,
  CREATED_AT,
  DATE_PATTERN,
  DELETE_USER,
  EMAIL,
  FONT_WEIGHT_BOLD,
  LOADING_USERS,
  NO_DATA_AVAILABLE,
  PHONE_NUMBER,
  PLACEHOLDER_SEARCH,
  PRIMARY_COLOR,
  ROLE,
  ROLE_ADMIN,
  ROLE_USER,
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
  styleAvatar,
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
import { banUser, deleteUser, getAllUsers } from '~/actions/user.action'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { User } from '~/app/shared/inteface'

const UsersManagement: React.FC = () => {
  const [page, setPage] = useState(1) // Trang hiện tại (Pagination bắt đầu từ 1)
  const [searchTerm, setSearchTerm] = useState('') // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('') // Từ khóa thực hiện tìm kiếm
  const rowsPerPage = 5 // Số dòng mỗi trang
  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  //Lấy toàn bộ User trong hệ thống
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers()
      if (res.success) {
        setUsers(
          (res.users ?? []).map((user: User) => ({
            ...user,
            image: user.image ?? undefined
          }))
        )
      } else {
        alert(res.message)
      }
      setLoading(false)
    }

    fetchUsers()
  }, [])

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

  //Hàm xử lý khóa tài khoản
  const handleBanUser = async (userId: string) => {
    const res = await banUser(userId)
    if (res.success) {
      toast.success(res.message, {
        duration: 2000
      })
      setUsers((prevUsers: User[]) =>
        prevUsers.map((user: User) =>
          user.userId === userId ? { ...user, isBanned: true } : user
        )
      )
    } else {
      toast.error(res.message)
    }
  }

  //Hàm xử lý xóa tài khoản
  const handleDeleteUser = async (userId: string) => {
    const res = await deleteUser(userId)
    if (res.success) {
      toast.success(res.message, {
        duration: 2000
      })
      setUsers(prevUsers => prevUsers.filter(user => user.userId !== userId))
    } else {
      toast.error(res.message)
    }
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
              <TableHeadCell align={ALIGN_CENTER} width={W_5}>
                {SERIAL}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {AVATAR}
              </TableHeadCell>
              <TableHeadCell width={W_20}>{USER_NAME}</TableHeadCell>
              <TableHeadCell>{EMAIL}</TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {PHONE_NUMBER}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
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
            {paginatedUsers.length > 0 && !loading ? (
              paginatedUsers.map((user, index) => (
                <StyledTableRow key={index}>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {index + 1 + (page - 1) * rowsPerPage}
                  </TableBodyCell>
                  <TableBodyCell>
                    <Box display={'flex'} justifyContent={ALIGN_CENTER}>
                      <Avatar src={user.image || ''} sx={styleAvatar} />
                    </Box>
                  </TableBodyCell>
                  <TableBodyCell>{user.name}</TableBodyCell>
                  <TableBodyCell>{user.email}</TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {user.phone}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {format(new Date(user.createdAt), DATE_PATTERN)}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {user.role ? ROLE_ADMIN : ROLE_USER}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    <Tooltip
                      title={
                        user.isBanned
                          ? BANNED
                          : user.role
                            ? CANNOT_BANNED
                            : BAN_TITLE
                      }
                    >
                      <Box component={BUTTON_WRAPPER_COMPONENT}>
                        <Button
                          disabled={user.isBanned || user.role}
                          variant={VARIANT_BUTTON}
                          size={SIZE_BUTTON}
                          sx={styleBannedButton}
                          onClick={() => handleBanUser(user.userId)}
                        >
                          <BlockIcon />
                        </Button>
                      </Box>
                    </Tooltip>
                    <Tooltip
                      title={user.isBanned ? DELETE_USER : CANNOT_DELETE}
                    >
                      <Box component={BUTTON_WRAPPER_COMPONENT}>
                        <Button
                          disabled={user.role || user.isBanned == false}
                          variant={VARIANT_BUTTON}
                          size={SIZE_BUTTON}
                          sx={styleDeleteButton}
                          onClick={() => handleDeleteUser(user.userId)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </Tooltip>
                  </TableBodyCell>
                </StyledTableRow>
              ))
            ) : loading ? (
              <StyledTableRow>
                <TableBodyCell align={ALIGN_CENTER} colSpan={8}>
                  {LOADING_USERS}
                </TableBodyCell>
              </StyledTableRow>
            ) : (
              <StyledTableRow>
                <TableBodyCell align={ALIGN_CENTER} colSpan={8}>
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
