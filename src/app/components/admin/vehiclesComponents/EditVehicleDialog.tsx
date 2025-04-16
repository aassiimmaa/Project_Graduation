import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem
} from '@mui/material'
import {
  ADD_VEHICLE,
  BUTTON_WRAPPER_COMPONENT,
  CANCEL_TEXT,
  CATEGORY_CHOOSE_ERRROR,
  CATEGORY_NAME,
  CHOOSE_IMAGE,
  DESCRIPTION,
  DESCRIPTION_ERROR,
  EDIT_TEXT,
  ERROR_COLOR,
  FONT_WEIGHT_BOLD,
  IMAGE,
  IMAGE_ERROR,
  MARGIN_TEXTFIELD_NORMAL,
  PREVIEW,
  PRICE,
  PRICE_ERROR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  VARIANT_TEXT,
  VEHICLE_NAME,
  VEHICLE_NAME_ERROR
} from '~/app/shared/constant'
import UploadIcon from '@mui/icons-material/UploadFile'
import { Category, EditVehicleDialogParams } from '~/app/shared/inteface'
import {
  styleButtonDialog,
  styleChooseImageButton,
  styleContentContainer,
  styleDialogActions,
  styleInputAddCategory,
  stylePaperDialog,
  stylePreviewImage
} from '~/app/shared/styles/AddCategoryDialog'
import { getAllCategories } from '~/actions/category.action'
import { formatPrice } from '~/lib/formatPrice'
import { getVehicleById } from '~/actions/vehicle.action'

const EditVehicleDialog: React.FC<EditVehicleDialogParams> = ({
  vehicleId,
  open,
  onClose,
  onSubmit
}) => {
  const [vehicleName, setVehicleName] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [Image, setImage] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])

  const [VehicleNameError, setVehicleNameError] = useState(false)
  const [categoryNameError, setCategoryNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [priceError, setPriceError] = useState(false)
  const [imageError, setImageError] = useState(false)

  //Lấy thông tin xe theo id

  useEffect(() => {
    if (vehicleId) {
      const fetchVehicle = async () => {
        const { vehicle } = await getVehicleById(vehicleId)
        if (vehicle) {
          setVehicleName(vehicle.vehicleName)
          setCategoryName(vehicle.categoryId)
          setDescription(vehicle.description)
          setPrice(formatPrice(vehicle.price.toString()))
          setImage(vehicle.image)
        }
      }
      fetchVehicle()
    }
  }, [vehicleId])

  //Lấy danh sách loại xe
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories()
      setCategories(res.categories || [])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

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

  //Hàm xử lý khi nhấn nút "Chỉnh sửa"
  const handleSubmit = () => {
    let isValid = true

    if (!vehicleName.trim()) {
      setVehicleNameError(true)
      isValid = false
    } else {
      setVehicleNameError(false)
    }

    if (!categoryName.trim()) {
      setCategoryNameError(true)
      isValid = false
    } else {
      setCategoryNameError(false)
    }

    if (!description.trim()) {
      setDescriptionError(true)
      isValid = false
    } else {
      setDescriptionError(false)
    }

    if (!price.trim()) {
      setPriceError(true)
      isValid = false
    } else {
      setPriceError(false)
    }

    if (!Image) {
      setImageError(true)
      isValid = false
    } else {
      setImageError(false)
    }

    if (!isValid) return

    onSubmit({ vehicleName, categoryName, description, price, image: Image })

    setVehicleName('')
    setCategoryName('')
    setDescription('')
    setPrice('')
    setImage('')
  }

  //Hàm đóng dialog
  const closeDialog = () => {
    onClose()
    setVehicleName('')
    setCategoryName('')
    setDescription('')
    setPrice('')
    setImage('')
    setVehicleNameError(false)
    setCategoryNameError(false)
    setDescriptionError(false)
    setPriceError(false)
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
        {ADD_VEHICLE}
      </DialogTitle>

      <DialogContent sx={styleContentContainer}>
        <TextField
          label={VEHICLE_NAME}
          fullWidth
          margin={MARGIN_TEXTFIELD_NORMAL}
          value={vehicleName}
          onChange={e => setVehicleName(e.target.value)}
          error={VehicleNameError}
          helperText={VehicleNameError && VEHICLE_NAME_ERROR}
          sx={styleInputAddCategory}
        />

        <TextField
          select
          label={CATEGORY_NAME}
          fullWidth
          margin={MARGIN_TEXTFIELD_NORMAL}
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          error={categoryNameError}
          helperText={categoryNameError && CATEGORY_CHOOSE_ERRROR}
          sx={styleInputAddCategory}
        >
          {categories.map(category => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </MenuItem>
          ))}
        </TextField>

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

        <TextField
          label={PRICE}
          fullWidth
          margin={MARGIN_TEXTFIELD_NORMAL}
          value={price}
          onChange={e => setPrice(formatPrice(e.target.value))}
          error={priceError}
          helperText={priceError && PRICE_ERROR}
          sx={styleInputAddCategory}
        />

        <Box mt={1}>
          <Typography color={TEXT_COLOR} gutterBottom variant="subtitle1">
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
            <Typography
              variant={VARIANT_TEXT}
              color={ERROR_COLOR}
              mt={0.5}
              ml={1}
            >
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
          {EDIT_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditVehicleDialog
