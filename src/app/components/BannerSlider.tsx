// components/BannerSlider/index.tsx
'use client'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { FC, useEffect, useState } from 'react'

// Styled components
const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '700px',
  [theme.breakpoints.down('md')]: {
    height: '300px'
  },
  overflow: 'hidden'
}))

const SlideImage = styled('div')<{ image: string }>(({ image }) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'all 0.8s ease-in-out'
}))

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'rgba(255, 255, 255, 0.7)',
  backgroundColor: 'transparent',
  padding: '0 80px',
  borderRadius: 0,
  height: '100%',
  fontSize: '48px',
  zIndex: 2,
  '&:hover': {
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'transparent'
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.5)
  },
  '&:active .iconNavigation': {
    fontSize: '46px'
  }
}))

const styleBannerDescription = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingBottom: '48px',
  gap: '12px'
}

const styleBannerButton = {
  backgroundColor: '#0D6EFD',
  padding: '8px 24px',
  marginTop: '12px',
  color: '#fff',
  fontSize: '20px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(13, 110, 253, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#0B5ED7',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(13, 110, 253, 0.4)'
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 4px 8px rgba(13, 110, 253, 0.3)'
  }
}

//Data Banner
interface Slide {
  id: number
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    image:
      'https://thienthanhlimo.com/wp-content/uploads/2022/05/101-anh-sieu-xe-4k-tai-free-lam-hinh-nen-dt-may-tinh.jpg'
  },
  {
    id: 2,
    image:
      'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-sieu-xe.jpg'
  },
  {
    id: 3,
    image:
      'https://static.automotor.vn/images/upload/2022/08/28/bugatti-chay-hang-autonews.jpeg'
  }
]

const BannerSlider: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }

  const handleNextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }

  return (
    <SliderContainer
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {slides.map((slide, index) => (
        <SlideImage
          key={slide.id}
          image={slide.image}
          sx={{
            left: `${(index - currentSlide) * 100}%`
          }}
        />
      ))}

      <NavigationButton
        sx={{ left: { xs: 8 } }}
        onClick={handlePrevSlide}
        size={isMobile ? 'small' : 'medium'}
        disableRipple
      >
        <ArrowBackIosIcon
          className="iconNavigation"
          sx={{ fontSize: '48px' }}
        />
      </NavigationButton>
      <NavigationButton
        sx={{ right: { xs: 8 } }}
        onClick={handleNextSlide}
        size={isMobile ? 'small' : 'medium'}
        disableRipple
      >
        <ArrowForwardIosIcon
          className="iconNavigation"
          sx={{
            fontSize: '48px'
          }}
        />
      </NavigationButton>
      <Box sx={styleBannerDescription}>
        <Typography variant="h2">Khám Phá Thế Giới Dễ Dàng</Typography>
        <Typography variant="subtitle1">
          Khám phá các dòng xe phù hợp cho mọi hành trình của bạn. Dịch vụ thuê
          xe giá cả phải chăng và đáng tin cậy, đáp ứng mọi nhu cầu của bạn.
        </Typography>
        <Button sx={styleBannerButton}>Thuê Xe</Button>
      </Box>
    </SliderContainer>
  )
}

export default BannerSlider
