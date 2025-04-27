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
import { BACK_HOME, FACEBOOK, FONT_WEIGHT_BOLD, GOOGLE, LOGIN, MARGIN_TEXTFIELD_NORMAL, OR, PRIMARY_COLOR, REGISTER, VARIANT_BUTTON, VARIANT_INPUT, WARNING_COLOR } from '../shared/constant'
import { styleContainerLoginForm, stylePaperLoginForm } from '../shared/styles/LoginPage'

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
      sx={styleContainerLoginForm}
    >
      <Paper
        elevation={6}
        sx={stylePaperLoginForm}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Image src="/images/logo.png" height={80} width={100} alt="logo" />
          <Typography variant="h5" fontWeight={FONT_WEIGHT_BOLD} mt={1}>
            {LOGIN}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin={MARGIN_TEXTFIELD_NORMAL}
            variant={VARIANT_INPUT}
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            margin={MARGIN_TEXTFIELD_NORMAL}
            variant={VARIANT_INPUT}
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
          <Button
            fullWidth
            variant={VARIANT_BUTTON}
            color={PRIMARY_COLOR}
            type="submit"
            sx={{ mt: 2 }}
          >
            {LOGIN}
          </Button>
          <Link href="/Register">
            <Button fullWidth variant={VARIANT_INPUT} color={WARNING_COLOR} sx={{ mt: 1 }}>
              {REGISTER}
            </Button>
          </Link>
        </Box>

        <Divider sx={{ my: 3 }}>{OR}</Divider>

        <Grid container spacing={2} justifyContent="center">
          <Grid size={6}>
            <Button
              fullWidth
              variant={VARIANT_BUTTON}
              color="error"
              startIcon={<Google />}
              onClick={() => handleThirdPartyLogin('Google')}
            >
              {GOOGLE}
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              fullWidth
              variant={VARIANT_BUTTON}
              color={PRIMARY_COLOR}
              startIcon={<Facebook />}
              onClick={() => handleThirdPartyLogin('Facebook')}
            >
              {FACEBOOK}
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
          {BACK_HOME}
        </Button>
      </Paper>
    </Container>
  )
}

export default LoginForm
