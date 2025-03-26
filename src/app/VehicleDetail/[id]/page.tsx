'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Card,
  CardContent,
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

// Giả lập danh sách xe
const vehicles = [
  {
    id: 1,
    name: 'Honda Accord',
    imageUrl:
      'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2024/10/11/xe-sedan-gia-re-thang-9-toyota-vios-dung-dau-honda-city-thang-hang-32261.jpg?width=0&s=7e0uvmV7Ak9bdewIIedOYA',
    description:
      'Sedan thanh lịch, mang phong cách tối giản nhưng không kém phần tinh tế. Honda Accord được biết đến với độ bền bỉ, vận hành êm ái và khả năng tiết kiệm nhiên liệu vượt trội. Xe được trang bị nhiều công nghệ hỗ trợ người lái và tiện nghi cao cấp.',
    type: 'Xe Sedan'
  }
]

const VehicleDetail: React.FC = () => {
  const { id } = useParams()
  const router = useRouter()

  // Lấy thông tin xe theo ID
  const vehicle = vehicles.find(v => v.id === Number(id))
  if (!vehicle) return <Typography variant="h5">Không tìm thấy xe!</Typography>

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
          onClick={() => router.push('/')}
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
              image={vehicle.imageUrl}
              alt={vehicle.name}
              sx={{ width: '100%', borderRadius: 2, objectFit: 'contain' }}
            />
          </Grid>

          {/* Thông tin chi tiết */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: 4, height: '680px' }}>
              <Typography variant="h4" fontWeight="bold">
                {vehicle.name}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Mô tả sản phẩm
                </Typography>
                <Typography variant="body1">{vehicle.description}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Dòng xe
                </Typography>
                <Typography variant="body1">{vehicle.type}</Typography>
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
                      slotProps={{ inputLabel: { shrink: true }, input: { inputProps: { min: fromDate || today } } }}
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
                      slotProps={{ inputLabel: { shrink: true }, input: { inputProps: { min: fromDate || today } } }}
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
