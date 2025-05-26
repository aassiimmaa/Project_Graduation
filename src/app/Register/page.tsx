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
import {
  ALIGN_CENTER,
  CONFIRM_PASSWORD,
  EMAIL,
  EMAIL_NULL_ERR,
  EMAIL_REGEX_ERROR,
  FONT_WEIGHT_BOLD,
  HAS_ACCOUNT_ALREADY,
  LINK_TO_LOGO,
  LOGIN,
  MARGIN_TEXTFIELD_NORMAL,
  PASSWORD,
  PASSWORD_ERROR_CONFIRM,
  PASSWORD_ERROR_LENGTH,
  PASSWORD_NULL_ERR,
  PHONE_NUM_NULL_ERR,
  PHONE_NUMBER,
  PHONE_REGEX_ERROR,
  PRIMARY_COLOR,
  REGISTER,
  USER_NAME,
  USERNAME_NULL_ERR,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  WARNING_COLOR
} from '../shared/constant'
import { styleHeaderRegisterForm, stylePaperRegister, styleRegisterContainer } from '../shared/styles/Register'

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
      newError.fullName = USERNAME_NULL_ERR
      valid = false
    }

    if (!email) {
      newError.email = EMAIL_NULL_ERR
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = EMAIL_REGEX_ERROR
      valid = false
    }

    if (!phoneNumber) {
      newError.phoneNumber = PHONE_NUM_NULL_ERR
      valid = false
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newError.phoneNumber = PHONE_REGEX_ERROR
      valid = false
    }

    if (!password) {
      newError.password = PASSWORD_NULL_ERR
      valid = false
    } else if (password.length < 6) {
      newError.password = PASSWORD_ERROR_LENGTH
      valid = false
    }

    if (!confirmPassword) {
      newError.confirmPassword = PASSWORD_NULL_ERR
      valid = false
    } else if (confirmPassword !== password) {
      newError.confirmPassword = PASSWORD_ERROR_CONFIRM
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
    <Container maxWidth="md" sx={styleRegisterContainer}>
      <Paper elevation={6} sx={stylePaperRegister}>
        <Box sx={styleHeaderRegisterForm}>
          <Image src={LINK_TO_LOGO} height={80} width={100} alt="logo" />
          <Typography variant="h5" fontWeight={FONT_WEIGHT_BOLD} mt={1}>
            {REGISTER}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label={USER_NAME}
            margin={MARGIN_TEXTFIELD_NORMAL}
            variant={VARIANT_INPUT}
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            error={!!error.fullName}
            helperText={error.fullName}
          />
          <TextField
            fullWidth
            label={EMAIL}
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
            label={PHONE_NUMBER}
            type="tel"
            margin={MARGIN_TEXTFIELD_NORMAL}
            variant={VARIANT_INPUT}
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            error={!!error.phoneNumber}
            helperText={error.phoneNumber}
          />
          <TextField
            fullWidth
            label={PASSWORD}
            type="password"
            margin={MARGIN_TEXTFIELD_NORMAL}
            variant={VARIANT_INPUT}
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
          <TextField
            fullWidth
            label={CONFIRM_PASSWORD}
            type="password"
            margin={MARGIN_TEXTFIELD_NORMAL}
            variant={VARIANT_INPUT}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
          />
          <Button
            fullWidth
            variant={VARIANT_BUTTON}
            color={PRIMARY_COLOR}
            type="submit"
            sx={{ mt: 2 }}
          >
            {REGISTER}
          </Button>
        </Box>

        <Typography variant="body2" align={ALIGN_CENTER} sx={{ mt: 3 }}>
          {HAS_ACCOUNT_ALREADY}
          <Button
            variant="text"
            color={WARNING_COLOR}
            onClick={() => router.push('/Login')}
          >
            {LOGIN}
          </Button>
        </Typography>
      </Paper>
    </Container>
  )
}

export default RegisterForm
