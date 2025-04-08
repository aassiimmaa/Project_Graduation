import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar-edit'
import {
  styleAction,
  styleConfirmButton,
  styleContentLayout,
  stylePaperContainer
} from '~/app/shared/styles/AvatarCropper'
import {
  AVATAR_CROP_SIZE,
  CONFIRM_TEXT,
  CROP_AVATAR,
  CROP_AVATAR_LABEL,
  FONT_WEIGHT_BOLD,
  PRIMARY_COLOR,
  VARIANT_BUTTON
} from '../shared/constant'

interface AvatarCroperProps {
  open: boolean
  onCloseDialog: () => void
  onCrop: (croppedImage: string) => void
  onCloseAvatar: () => void
  avatar: string | null
}

const AvatarCroper = ({
  open,
  onCloseDialog,
  onCrop,
  onCloseAvatar,
  avatar
}: AvatarCroperProps) => {
  const [imageSize, setImageSize] = useState({
    width: AVATAR_CROP_SIZE,
    height: AVATAR_CROP_SIZE
  })
  const [showCropper, setShowCropper] = useState(true)

  useEffect(() => {
    if (!avatar) return
    const img = new Image()
    img.onload = () => {
      const maxSize = AVATAR_CROP_SIZE
      const ratio = img.width / img.height
      let width, height

      if (ratio > 1) {
        width = maxSize
        height = maxSize / ratio
      } else {
        width = maxSize * ratio
        height = maxSize
      }

      setImageSize({ width, height })

      // 👉 Unmount rồi remount lại Avatar để apply đúng size
      setShowCropper(false)
      setTimeout(() => setShowCropper(true), 10)
    }
    img.src = avatar
  }, [avatar])

  return (
    <Dialog
      open={open}
      onClose={onCloseDialog}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: stylePaperContainer
        }
      }}
    >
      <DialogContent className="avatar-cropper-content" sx={styleContentLayout}>
        <Typography variant="h6" fontWeight={FONT_WEIGHT_BOLD}>
          {CROP_AVATAR}
        </Typography>

        {showCropper && (
          <Avatar
            width={imageSize.width}
            height={imageSize.height}
            onCrop={onCrop}
            onClose={onCloseAvatar}
            src={avatar ?? undefined}
            label={CROP_AVATAR_LABEL}
          />
        )}
      </DialogContent>
      <DialogActions sx={styleAction}>
        <Button
          onClick={onCloseDialog}
          variant={VARIANT_BUTTON}
          color={PRIMARY_COLOR}
          sx={styleConfirmButton}
        >
          {CONFIRM_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AvatarCroper
