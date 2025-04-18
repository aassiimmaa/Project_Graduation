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
  Divider
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { NavBar } from '~/app/components/NavBar'
import Footer from '~/app/components/Footer'
import { getVehicleById } from '~/actions/vehicle.action'
import { Vehicle } from '~/app/shared/inteface'

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
  }, [id])

  // State lưu ngày thuê xe
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [error, setError] = useState({ fromDate: '', toDate: '' })

  // Lấy ngày hiện tại (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0]

  // Xử lý đặt xe
  const handleRentCar = () => {
    let newErrors = { fromDate: '', toDate: '' }

    if (!fromDate) newErrors.fromDate = 'Vui lòng chọn ngày bắt đầu'
    else if (fromDate < today)
      newErrors.fromDate = 'Ngày bắt đầu không thể trước hôm nay'

    if (!toDate) newErrors.toDate = 'Vui lòng chọn ngày kết thúc'
    else if (toDate < fromDate)
      newErrors.toDate = 'Ngày kết thúc không thể nhỏ hơn ngày bắt đầu'

    setError(newErrors)

    // Nếu không có lỗi, tiến hành thuê xe
    if (!newErrors.fromDate && !newErrors.toDate) {
      alert(`Bạn đã thuê xe từ ${fromDate} đến ${toDate}`)
    }
  }

  return (
    <>
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{ mt: 8, mb: 5, minHeight: 'calc(100vh - 64px - 56px - 40px)' }}
      >
        {/* Nút Quay lại */}
        <Button
          disableRipple
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/CategoryDetail')}
          sx={{ mt: 2, mb: 1, fontSize: '1rem' }}
        >
          Quay lại
        </Button>

        <Grid container spacing={4}>
          {/* Hình ảnh xe */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <CardMedia
              component="img"
              image={vehicle?.image || ''}
              alt={vehicle?.vehicleName || ''}
              sx={{ width: '100%', borderRadius: 2, objectFit: 'contain' }}
            />
          </Grid>

          {/* Thông tin chi tiết */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: 4, height: '680px' }}>
              <Typography variant="h4" fontWeight="bold">
                {vehicle?.vehicleName || 'Tên xe'}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Mô tả sản phẩm
                </Typography>
                <Typography variant="body1">{vehicle?.description}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Dòng xe
                </Typography>
                <Typography variant="body1">
                  {vehicle?.categories.categoryName}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Form chọn ngày thuê */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Thời gian thuê xe:
                </Typography>
                <Grid flexDirection="column" container spacing={2} mt={2}>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Từ ngày"
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
                      type="date"
                      label="Đến ngày"
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
                variant="contained"
                color="primary"
                onClick={handleRentCar}
                sx={{ mt: 3, p: 1, width: 120 }}
              >
                THUÊ XE
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default VehicleDetail
