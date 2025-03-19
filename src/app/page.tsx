import About from './components/About'
import BannerSlider from './components/BannerSlider'
import CategoriesList from './components/CategoriesList'
import { NavBar } from './components/NavBar'
import { Box } from '@mui/material'

const HomePage = () => {
  return (
    <Box>
      <NavBar />
      <BannerSlider />
      <CategoriesList />
      <About />
    </Box>
  )
}

export default HomePage
