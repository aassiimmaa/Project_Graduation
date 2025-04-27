import { Box, IconButton, styled } from "@mui/material"

// Styled components
const SliderContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '700px',
    [theme.breakpoints.down('md')]: {
      height: '300px'
    },
    overflow: 'hidden',
    marginTop: '70px'
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
  
  const styleSlideImage = (index: number, currentSlide: number) => ({
    left: `${(index - currentSlide) * 100}%`
  })

export {
    SliderContainer,
    SlideImage,
    NavigationButton,
    styleBannerDescription,
    styleBannerButton,
    styleSlideImage
};