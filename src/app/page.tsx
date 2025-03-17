import BannerSlider from './components/BannerSlider'
import { NavBar } from './components/NavBar'
import { Box } from '@mui/material'

const HomePage = () => {
  return (
    <Box>
      <NavBar />
      <BannerSlider />
    </Box>
  )
}

export default HomePage
