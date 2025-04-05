'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Google, Facebook } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { LoginUser } from '~/actions/user.action'
import toast from 'react-hot-toast'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({ email: '', password: '' })

  //Validate form
  const validateForm = () => {
    let valid = true
    const newError = { email: '', password: '' }

    if (!email) {
      newError.email = 'Vui lòng nhập email'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Email không hợp lệ'
      valid = false
    }

    if (!password) {
      newError.password = 'Vui lòng nhập mật khẩu'
      valid = false
    } else if (password.length < 6) {
      newError.password = 'Mật khẩu ít nhất 6 ký tự'
      valid = false
    }

    setError(newError)
    return valid
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const result = await LoginUser({ email, password })
      if (result.success) {
        toast.success(result.message)
        localStorage.setItem('user', JSON.stringify(result.user))
        router.push('/') // Chuyển hướng đến trang Dashboard
      } else {
        toast.error(result.message)
      }
    }
  }

  const handleThirdPartyLogin = (provider: string) => {
    console.log(`Đăng nhập với ${provider}`)
    // Gọi API đăng nhập bên thứ ba
  }

  return (
    <Container
      maxWidth="xs"
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
          maxWidth: 400,
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
            Đăng nhập
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
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
            label="Mật khẩu"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Đăng nhập
          </Button>
          <Link href="/Register">
            <Button fullWidth variant="outlined" color="warning" sx={{ mt: 1 }}>
              Đăng ký
            </Button>
          </Link>
        </Box>

        <Divider sx={{ my: 3 }}>Hoặc</Divider>

        <Grid container spacing={2} justifyContent="center">
          <Grid size={6}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<Google />}
              onClick={() => handleThirdPartyLogin('Google')}
            >
              Google
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<Facebook />}
              onClick={() => handleThirdPartyLogin('Facebook')}
            >
              Facebook
            </Button>
          </Grid>
        </Grid>

        <Button
          fullWidth
          variant="text"
          color="secondary"
          onClick={() => router.push('/')}
          sx={{ mt: 3 }}
        >
          Quay về trang chủ
        </Button>
      </Paper>
    </Container>
  )
}

export default LoginForm
