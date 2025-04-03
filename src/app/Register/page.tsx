'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from '@mui/material'
import Image from 'next/image'
import { registerUser } from '~/actions/user.action'
import toast from 'react-hot-toast'

const RegisterForm: React.FC = () => {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })

  //Validate form
  const validateForm = () => {
    let valid = true
    const newError = {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    }

    if (!fullName) {
      newError.fullName = 'Vui lòng nhập họ và tên'
      valid = false
    }

    if (!email) {
      newError.email = 'Vui lòng nhập email'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Email không hợp lệ'
      valid = false
    }

    if (!phoneNumber) {
      newError.phoneNumber = 'Vui lòng nhập số điện thoại'
      valid = false
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newError.phoneNumber = 'Số điện thoại phải có đúng 10 chữ số'
      valid = false
    }

    if (!password) {
      newError.password = 'Vui lòng nhập mật khẩu'
      valid = false
    } else if (password.length < 6) {
      newError.password = 'Mật khẩu ít nhất 6 ký tự'
      valid = false
    }

    if (!confirmPassword) {
      newError.confirmPassword = 'Vui lòng xác nhận mật khẩu'
      valid = false
    } else if (confirmPassword !== password) {
      newError.confirmPassword = 'Mật khẩu xác nhận không khớp'
      valid = false
    }

    setError(newError)
    return valid
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const result = await registerUser({
        fullName,
        email,
        phoneNumber,
        password
      })
      if (result.success) {
        toast.success(result.message)
        router.push('/Login')
      } else {
        toast.error(result.message)
      }
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 500,
          width: '100%',
          backgroundColor: 'white'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Image src="/images/logo.png" height={80} width={100} alt="logo" />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Đăng ký
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Họ và tên"
            margin="normal"
            variant="outlined"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            error={!!error.fullName}
            helperText={error.fullName}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            type="tel"
            margin="normal"
            variant="outlined"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            error={!!error.phoneNumber}
            helperText={error.phoneNumber}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
          <TextField
            fullWidth
            label="Xác nhận mật khẩu"
            type="password"
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Đăng ký
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Đã có tài khoản?
          <Button
            variant="text"
            color="warning"
            onClick={() => router.push('/Login')}
          >
            Đăng nhập ngay
          </Button>
        </Typography>
      </Paper>
    </Container>
  )
}

export default RegisterForm
