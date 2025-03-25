'use client'
import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { NavBar } from '~/app/components/NavBar'

const ChangePassword: React.FC = () => {
  const router = useRouter()
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
    setError('') // Reset lỗi khi người dùng nhập lại
  }

  const handleSubmit = () => {
    if (passwords.newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự!')
      return
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Mật khẩu mới không khớp!')
      return
    }

    console.log('Đổi mật khẩu thành công:', passwords)
    // Gửi dữ liệu lên server...

    // Chuyển hướng về trang profile sau khi đổi mật khẩu
    router.push('/Profile')
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{ mt: 20 }}>
        <Paper elevation={4} sx={{ p: 4, textAlign: 'center', m: 4 }}>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Đổi mật khẩu
          </Typography>

          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Mật khẩu hiện tại"
              name="currentPassword"
              type="password"
              margin="normal"
              variant="outlined"
              value={passwords.currentPassword}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Mật khẩu mới"
              name="newPassword"
              type="password"
              margin="normal"
              variant="outlined"
              value={passwords.newPassword}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              type="password"
              margin="normal"
              variant="outlined"
              value={passwords.confirmPassword}
              onChange={handleChange}
              error={!!error}
              helperText={error}
            />

            <Box
              sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={
                  !passwords.currentPassword ||
                  !passwords.newPassword ||
                  !passwords.confirmPassword
                }
              >
                Lưu mật khẩu
              </Button>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => router.push('/Profile')}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default ChangePassword
