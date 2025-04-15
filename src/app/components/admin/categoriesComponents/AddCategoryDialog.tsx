import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography
} from '@mui/material'
import {
  ADD_CATEGORY,
  ADD_TEXT,
  BUTTON_WRAPPER_COMPONENT,
  CANCEL_TEXT,
  CATEGORY_NAME,
  CATEGORY_NAME_ERROR,
  CHOOSE_IMAGE,
  DESCRIPTION,
  DESCRIPTION_ERROR,
  ERROR_COLOR,
  FONT_WEIGHT_BOLD,
  IMAGE,
  IMAGE_ERROR,
  MARGIN_TEXTFIELD_NORMAL,
  PREVIEW,
  PRIMARY_COLOR,
  TEXT_COLOR,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  VARIANT_TEXT
} from '~/app/shared/constant'
import UploadIcon from '@mui/icons-material/UploadFile'
import { AddCategoryDialogParams } from '~/app/shared/inteface'
import {
  styleButtonDialog,
  styleChooseImageButton,
  styleContentContainer,
  styleDialogActions,
  styleInputAddCategory,
  stylePaperDialog,
  stylePreviewImage
} from '~/app/shared/styles/AddCategoryDialog'

const AddCategoryDialog: React.FC<AddCategoryDialogParams> = ({
  open,
  onClose,
  onSubmit
}) => {
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const [Image, setImage] = useState<string>('')

  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [imageError, setImageError] = useState(false)

  //Hàm thay đổi hình ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
        setImageError(false)
      }
      reader.readAsDataURL(file)
    }
  }

  //Hàm xử lý khi nhấn nút "Thêm"
  const handleSubmit = () => {
    let isValid = true

    if (!categoryName.trim()) {
      setNameError(true)
      isValid = false
    } else {
      setNameError(false)
    }

    if (!description.trim()) {
      setDescriptionError(true)
      isValid = false
    } else {
      setDescriptionError(false)
    }

    if (!Image) {
      setImageError(true)
      isValid = false
    } else {
      setImageError(false)
    }

    if (!isValid) return

    onSubmit({ categoryName, description, image: Image })

    setCategoryName('')
    setDescription('')
    setImage('')
  }

  //Hàm đóng dialog
  const closeDialog = () => {
    onClose()
    setCategoryName('')
    setDescription('')
    setImage('')
    setNameError(false)
    setDescriptionError(false)
    setImageError(false)
  }

  return (
    <Dialog
      slotProps={{
        paper: {
          sx: stylePaperDialog
        }
      }}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ color: TEXT_COLOR, fontWeight: FONT_WEIGHT_BOLD }}>
        {ADD_CATEGORY}
      </DialogTitle>

      <DialogContent sx={styleContentContainer}>
        <TextField
          label={CATEGORY_NAME}
          fullWidth
          margin={MARGIN_TEXTFIELD_NORMAL}
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          error={nameError}
          helperText={nameError && CATEGORY_NAME_ERROR}
          sx={styleInputAddCategory}
        />

        <TextField
          label={DESCRIPTION}
          fullWidth
          margin={MARGIN_TEXTFIELD_NORMAL}
          value={description}
          onChange={e => setDescription(e.target.value)}
          error={descriptionError}
          helperText={descriptionError && DESCRIPTION_ERROR}
          sx={styleInputAddCategory}
        />

        <Box mt={3}>
          <Typography
            color={TEXT_COLOR}
            fontWeight={500}
            gutterBottom
            variant="subtitle1"
          >
            {IMAGE}
          </Typography>

          <input
            accept="image/*"
            id="upload-image"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <label htmlFor="upload-image">
            <Button
              variant={VARIANT_INPUT}
              component={BUTTON_WRAPPER_COMPONENT}
              startIcon={<UploadIcon />}
              sx={styleChooseImageButton(imageError)}
            >
              {CHOOSE_IMAGE}
            </Button>
          </label>

          {imageError && (
            <Typography variant={VARIANT_TEXT} color={ERROR_COLOR} mt={0.5}>
              {IMAGE_ERROR}
            </Typography>
          )}

          {Image && (
            <Box mt={2}>
              <Typography variant="body2" color={TEXT_COLOR}>
                {PREVIEW}
              </Typography>
              <Box
                component="img"
                src={Image}
                alt={PREVIEW}
                sx={stylePreviewImage}
              />
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={styleDialogActions}>
        <Button
          sx={styleButtonDialog}
          onClick={() => closeDialog()}
          variant={VARIANT_BUTTON}
          color={ERROR_COLOR}
        >
          {CANCEL_TEXT}
        </Button>
        <Button
          sx={styleButtonDialog}
          onClick={handleSubmit}
          variant={VARIANT_BUTTON}
          color={PRIMARY_COLOR}
        >
          {ADD_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCategoryDialog
