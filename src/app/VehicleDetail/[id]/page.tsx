'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  TextField,
  Container,
  Divider,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { NavBar } from '~/app/components/NavBar'
import Footer from '~/app/components/Footer'
import { getVehicleById } from '~/actions/vehicle.action'
import { Vehicle } from '~/app/shared/inteface'
import QRPay from '~/app/components/QRPay'
import { BACK, CATEGORY_NAME, DATE_TYPE, DESCRIPTION, FONT_WEIGHT_BOLD, FROM_DATE, FROM_DATE_BEFORE_TODAY_ERR, FROM_DATE_NULL_ERR, PRIMARY_COLOR, RENT_VEHICLE, RENTAL_TIME, SIZE_CONTAINER, TO_DATE, TO_DATE_BEFORE_FROM_DATE_ERR, TO_DATE_NULL_ERR, VARIANT_BUTTON } from '~/app/shared/constant'
import { styleCardInfo, styleContainer, styleDivider, styleFormContainer, styleImageVehicle, styleInfoContainer, styleRentalBtn, styleReturnBtn } from '~/app/shared/styles/VehicleDetail'

const VehicleDetail: React.FC = () => {
  const { id } = useParams()
  const router = useRouter()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)

  // Lấy thông tin xe theo ID
  const isFetched = useRef(false)

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id || isFetched.current) return
      isFetched.current = true

      const res = await getVehicleById(Array.isArray(id) ? id[0] : id)
      if (res.success) {
        setVehicle(res.vehicle || null)
      } else {
        alert(res.message)
        router.push('/CategoryDetail')
      }
    }

    fetchVehicle()
  }, [router, id])

  // State lưu ngày thuê xe
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [error, setError] = useState({ fromDate: '', toDate: '' })
  const [openQR, setOpenQR] = useState(false)

  // Lấy ngày hiện tại (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0]

  // Xử lý đặt xe
  const handleRentCar = () => {
    const newErrors = { fromDate: '', toDate: '' }

    if (!fromDate) newErrors.fromDate = FROM_DATE_NULL_ERR
    else if (fromDate < today)
      newErrors.fromDate = FROM_DATE_BEFORE_TODAY_ERR

    if (!toDate) newErrors.toDate = TO_DATE_NULL_ERR
    else if (toDate < fromDate)
      newErrors.toDate = TO_DATE_BEFORE_FROM_DATE_ERR

    setError(newErrors)

    // Nếu không có lỗi, tiến hành thuê xe
    if (!newErrors.fromDate && !newErrors.toDate) {
      setOpenQR(true) // Mở modal thay vì alert
    }
  }

  return (
    <>
      <NavBar />
      <Container
        maxWidth={SIZE_CONTAINER}
        sx={styleContainer}
      >
        {/* Nút Quay lại */}
        <Button
          disableRipple
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/CategoryDetail')}
          sx={styleReturnBtn}
        >
          {BACK}
        </Button>

        <Grid container spacing={4}>
          {/* Hình ảnh xe */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={styleImageVehicle}
          >
            <CardMedia
              component="img"
              image={vehicle?.image || ''}
              alt={vehicle?.vehicleName || ''}
              sx={styleInfoContainer}
            />
          </Grid>

          {/* Thông tin chi tiết */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={styleCardInfo}>
              <Typography variant="h4" fontWeight={FONT_WEIGHT_BOLD}>
                {vehicle?.vehicleName}
              </Typography>

              <Divider sx={styleDivider} />

              <Box>
                <Typography variant="h6" fontWeight={FONT_WEIGHT_BOLD} gutterBottom>
                  {DESCRIPTION}
                </Typography>
                <Typography variant="body1">{vehicle?.description}</Typography>
              </Box>

              <Divider sx={styleDivider} />

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight={FONT_WEIGHT_BOLD} gutterBottom>
                  {CATEGORY_NAME}
                </Typography>
                <Typography variant="body1">
                  {vehicle?.categories.categoryName}
                </Typography>
              </Box>

              <Divider sx={styleDivider} />

              {/* Form chọn ngày thuê */}
              <Box sx={styleFormContainer}>
                <Typography variant="h6" fontWeight={FONT_WEIGHT_BOLD} gutterBottom>
                  {`${RENTAL_TIME}:`}
                </Typography>
                <Grid flexDirection="column" container spacing={2} mt={2}>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      type={DATE_TYPE}
                      label={FROM_DATE}
                      value={fromDate}
                      onChange={e => setFromDate(e.target.value)}
                      slotProps={{
                        inputLabel: { shrink: true },
                        input: { inputProps: { min: fromDate || today } }
                      }}
                      error={!!error.fromDate}
                      helperText={error.fromDate}
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      type={DATE_TYPE}
                      label={TO_DATE}
                      value={toDate}
                      onChange={e => setToDate(e.target.value)}
                      slotProps={{
                        inputLabel: { shrink: true },
                        input: { inputProps: { min: fromDate || today } }
                      }}
                      error={!!error.toDate}
                      helperText={error.toDate}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Nút thuê xe */}
              <Button
                variant={VARIANT_BUTTON}
                color={PRIMARY_COLOR}
                onClick={handleRentCar}
                sx={styleRentalBtn}
              >
                {RENT_VEHICLE}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      {vehicle && (
        <QRPay openQR={openQR} closeQR={() => setOpenQR(false)} vehicle={vehicle} fromDate={fromDate} toDate={toDate} />
      )}
    </>
  )
}

export default VehicleDetail
