'use client'
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { NavBar } from '../components/NavBar'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import AvatarCroper from '../components/AvatarCroper'
import { updateUser } from '~/actions/user.action'
import toast from 'react-hot-toast'
import {
  CHANGE_PASSWORD,
  EDIT,
  EMAIL,
  EMAIL_REGEX_ERROR,
  FONT_WEIGHT_BOLD,
  MARGIN_TEXTFIELD_NORMAL,
  MAX_WIDTH_PROFILE,
  PERSONAL_INFORMATION,
  PHONE_NUMBER,
  PHONE_REGEX_ERROR,
  PRIMARY_COLOR,
  REGEX_EMAIL,
  REGEX_PHONE,
  SAVE,
  STORAGE_DATA_USER,
  USER_NAME,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  WARNING_COLOR
} from '../shared/constant'
import {
  styleActions,
  styleAvatarProfile,
  styleContainerProfile,
  styleForm,
  stylePaperProfile,
  styleUploadAvatarButton
} from '../shared/styles/Profile'

const ProfilePage: React.FC = () => {
  const router = useRouter()
  // const user = JSON.parse(localStorage.getItem(STORAGE_DATA_USER) || '{}')
  const [isEditing, setIsEditing] = useState(false)
  const [avatarChanged, setAvatarChanged] = useState(false)
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const [user, setUser] = useState<{
    name?: string
    email?: string
    phone?: string
    image?: string
    id?: string
  } | null>(null)
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  })
  const [avatar, setAvatar] = useState<string | null>(null)
  // const [avatar, setAvatar] = useState<string | null>(user.image)
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: ''
  })

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_DATA_USER)
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setUserInfo({
        fullName: parsedUser.name || '',
        email: parsedUser.email || '',
        phoneNumber: parsedUser.phone || ''
      })
      setAvatar(parsedUser.image || null)
    }
  }, [])

  //Hàm xử lý bật chế độ chỉnh sửa và lưu cập nhật thông tin người dùng
  const handleEditToggle = async () => {
    if (isEditing) {
      if (validateForm()) {
        //Gọi API để lưu thông tin người dùng
        if (!user) {
          toast.error('Không có thông tin người dùng.')
          return
        }
        if (!user.id) {
          toast.error('User ID is missing.')
          return
        }
        const result = await updateUser({
          userId: user.id as string,
          fullName: userInfo.fullName,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
          avatar: avatarChanged ? avatar : null
        })
        if (result.success) {
          localStorage.setItem(
            STORAGE_DATA_USER,
            JSON.stringify({
              ...user,
              name: userInfo.fullName,
              email: userInfo.email,
              phone: userInfo.phoneNumber,
              image: avatar || user.image
            })
          )
          setAvatarChanged(false)
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
        setIsEditing(false)
      }
    } else {
      setIsEditing(true)
    }
  }

  //Hàm xử lý thay đổi thông tin người dùng
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  //Hàm xử lý thay đổi ảnh đại diện
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string) // Hiển thị ảnh trong cropper
        setCropDialogOpen(true) // Mở dialog crop ảnh
      }
      reader.readAsDataURL(file)
    }
  }

  //Hàm kiểm tra tính hợp lệ của form
  const validateForm = () => {
    let isValid = true
    const newErrors = { email: '', phoneNumber: '' }

    const emailRegex = REGEX_EMAIL
    if (!emailRegex.test(userInfo.email)) {
      newErrors.email = EMAIL_REGEX_ERROR
      isValid = false
    }

    const phoneRegex = REGEX_PHONE
    if (!phoneRegex.test(userInfo.phoneNumber)) {
      newErrors.phoneNumber = PHONE_REGEX_ERROR
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  //Hàm đóng dialog crop ảnh
  const handleCloseDialog = () => {
    setCropDialogOpen(false)
  }

  //Hàm đóng ảnh đại diện
  const handleCloseAvatar = () => {
    setAvatar(null)
  }

  //Hàm xử lý cắt ảnh
  const handleCrop = (view: string) => {
    setAvatar(view)
    setAvatarChanged(true)
  }

  return (
    <>
      <NavBar />
      <Container maxWidth={MAX_WIDTH_PROFILE} sx={styleContainerProfile}>
        <Paper elevation={4} sx={stylePaperProfile}>
          <Box position="relative" display="inline-block">
            <Avatar src={avatar || ''} sx={styleAvatarProfile} />
            {isEditing && (
              <>
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="avatar-upload">
                  <IconButton component="span" sx={styleUploadAvatarButton}>
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </>
            )}
          </Box>

          <Typography variant="h5" fontWeight={FONT_WEIGHT_BOLD}>
            {PERSONAL_INFORMATION}
          </Typography>
          <Box component="form" sx={styleForm}>
            <TextField
              fullWidth
              label={USER_NAME}
              name="fullName"
              margin={MARGIN_TEXTFIELD_NORMAL}
              variant={VARIANT_INPUT}
              value={userInfo.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label={EMAIL}
              name="email"
              margin={MARGIN_TEXTFIELD_NORMAL}
              variant={VARIANT_INPUT}
              value={userInfo.email}
              onChange={handleChange}
              disabled={!isEditing}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label={PHONE_NUMBER}
              name="phoneNumber"
              margin={MARGIN_TEXTFIELD_NORMAL}
              variant={VARIANT_INPUT}
              value={userInfo.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <Box sx={styleActions}>
              <Button
                variant={VARIANT_BUTTON}
                color={PRIMARY_COLOR}
                onClick={handleEditToggle}
              >
                {isEditing ? SAVE : EDIT}
              </Button>
              <Button
                variant={VARIANT_INPUT}
                color={WARNING_COLOR}
                onClick={() => router.push('/Profile/ChangePassword')}
              >
                {CHANGE_PASSWORD}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Dialog Crop Ảnh */}
      <AvatarCroper
        open={cropDialogOpen}
        onCloseDialog={handleCloseDialog}
        onCloseAvatar={handleCloseAvatar}
        onCrop={handleCrop}
        avatar={imageSrc}
      />
    </>
  )
}

export default ProfilePage
