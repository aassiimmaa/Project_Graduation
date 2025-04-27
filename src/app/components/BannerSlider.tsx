// components/BannerSlider/index.tsx
'use client'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Slide } from '../shared/inteface'
import { BANNER_DESCRIPTION, BANNER_TITLE, RENT_VEHICLE } from '../shared/constant'
import { NavigationButton, SlideImage, SliderContainer, styleBannerButton, styleBannerDescription, styleSlideImage } from '../shared/styles/BannerSlider'

//Data Banner

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
      id="Banner"
    >
      {slides.map((slide, index) => (
        <SlideImage key={slide.id} image={slide.image} sx={styleSlideImage(index, currentSlide)} />
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
        <Typography variant="h2">{BANNER_TITLE}</Typography>
        <Typography variant="subtitle1">
          {BANNER_DESCRIPTION}
        </Typography>
        <Button
          onClick={() =>
            document
              .getElementById('Services')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          sx={styleBannerButton}
        >
          {RENT_VEHICLE}
        </Button>
      </Box>
    </SliderContainer>
  )
}

export default BannerSlider
