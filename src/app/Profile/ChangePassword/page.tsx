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
import { changePassword } from '~/actions/user.action'
import toast from 'react-hot-toast'
import useRequireAuth from '~/hooks/useRequireAuth'
import {
  CANCEL_TEXT,
  CHANGE_PASSWORD,
  CONFIRM_PASSWORD,
  CURRENT_PASSWORD,
  FONT_WEIGHT_BOLD,
  MARGIN_TEXTFIELD_NORMAL,
  MAX_WIDTH_PROFILE,
  NEW_PASSWORD,
  PASSWORD_ERROR_CONFIRM,
  PASSWORD_ERROR_LENGTH,
  PRIMARY_COLOR,
  SAVE_PASSWORD,
  TYPE_PASSWORD,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  WARNING_COLOR
} from '~/app/shared/constant'
import {
  styleActions,
  styleContainerProfile,
  styleForm,
  stylePaperProfile
} from '~/app/shared/styles/Profile'

const ChangePassword: React.FC = () => {
  const router = useRouter()
  const user = useRequireAuth()
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Chưa đăng nhập thì không render
  if (!user) return null

  //Hàm thay đổi thông tin hiển thị
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' }) // Reset lỗi khi người dùng nhập lại
  }

  //Hàm kiểm tra thông tin nhập vào
  const validateForm = () => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    let isValid = true

    // Kiểm tra mật khẩu mới
    if (passwords.newPassword.length < 6) {
      newErrors.newPassword = PASSWORD_ERROR_LENGTH
      isValid = false
    }

    // Kiểm tra xác nhận mật khẩu
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = PASSWORD_ERROR_CONFIRM
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  //Hàm thay đổi mật khẩu
  const handleSubmit = async () => {
    if (validateForm()) {
      const result = await changePassword({
        userId: <user className="id"></user>,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      })

      if (result.success) {
        toast.success(result.message)
        // Chuyển hướng về trang profile sau khi đổi mật khẩu
        router.push('/Profile')
      } else {
        toast.error(result.message)
      }
    }
  }

  return (
    <>
      <NavBar />
      <Container maxWidth={MAX_WIDTH_PROFILE} sx={styleContainerProfile}>
        <Paper elevation={4} sx={stylePaperProfile}>
          <Typography variant="h5" fontWeight={FONT_WEIGHT_BOLD} gutterBottom>
            {CHANGE_PASSWORD}
          </Typography>

          <Box component="form" sx={styleForm}>
            <TextField
              fullWidth
              label={CURRENT_PASSWORD}
              name="currentPassword"
              type={TYPE_PASSWORD}
              margin={MARGIN_TEXTFIELD_NORMAL}
              variant={VARIANT_INPUT}
              value={passwords.currentPassword}
              onChange={handleChange}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
            />
            <TextField
              fullWidth
              label={NEW_PASSWORD}
              name="newPassword"
              type={TYPE_PASSWORD}
              margin={MARGIN_TEXTFIELD_NORMAL}
              variant={VARIANT_INPUT}
              value={passwords.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
            />
            <TextField
              fullWidth
              label={CONFIRM_PASSWORD}
              name="confirmPassword"
              type={TYPE_PASSWORD}
              margin={MARGIN_TEXTFIELD_NORMAL}
              variant={VARIANT_INPUT}
              value={passwords.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Box sx={styleActions}>
              <Button
                variant={VARIANT_BUTTON}
                color={PRIMARY_COLOR}
                onClick={handleSubmit}
                disabled={
                  !passwords.currentPassword ||
                  !passwords.newPassword ||
                  !passwords.confirmPassword
                }
              >
                {SAVE_PASSWORD}
              </Button>
              <Button
                variant={VARIANT_INPUT}
                color={WARNING_COLOR}
                onClick={() => router.push('/Profile')}
              >
                {CANCEL_TEXT}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default ChangePassword
