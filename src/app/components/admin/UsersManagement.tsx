import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination
} from '@mui/material'
import { styled } from '@mui/material/styles'
import TableHeadCell from '../TableHeadCell'
import TableBodyCell from '../TableBodyCell'

const users = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Người dùng ${index + 1}`,
  email: `user${index + 1}@example.com`,
  phone: `012345678${index % 10}`,
  createdAt: '2024-03-25',
  role: index % 2 === 0 ? 'Admin' : 'User'
}))

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#62b0ff'
})

const UserTable: React.FC = () => {
  const [page, setPage] = useState(0) // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(10) // Số dòng mỗi trang

  // Hàm xử lý thay đổi trang
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Hàm xử lý thay đổi số dòng mỗi trang
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Đặt lại trang về 0 khi thay đổi số dòng mỗi trang
  }

  // Cắt dữ liệu thành từng trang
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#fff' }}>
      <Table>
        <StyledTableHead>
          <TableRow>
            <TableHeadCell>STT</TableHeadCell>
            <TableHeadCell>Tên</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Số điện thoại</TableHeadCell>
            <TableHeadCell>Thời gian tạo</TableHeadCell>
            <TableHeadCell>Quyền</TableHeadCell>
            <TableHeadCell>Hành động</TableHeadCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {paginatedUsers.map((user, index) => (
            <TableRow key={user.id}>
              <TableBodyCell>{index + 1 + page * rowsPerPage}</TableBodyCell>
              <TableBodyCell>{user.name}</TableBodyCell>
              <TableBodyCell>{user.email}</TableBodyCell>
              <TableBodyCell>{user.phone}</TableBodyCell>
              <TableBodyCell>{user.createdAt}</TableBodyCell>
              <TableBodyCell>{user.role}</TableBodyCell>
              <TableBodyCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginRight: 8 }}
                >
                  Sửa
                </Button>
                <Button variant="contained" color="secondary" size="small">
                  Xóa
                </Button>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Phân trang */}
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: '#000'
        }}
      />
    </TableContainer>
  )
}

export default UserTable
