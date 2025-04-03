import About from './components/About'
import BannerSlider from './components/BannerSlider'
import CategoriesList from './components/CategoriesList'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { NavBar } from './components/NavBar'

const HomePage = () => {
  return (
    <>
      <NavBar />
      <BannerSlider />
      <CategoriesList />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

export default HomePage
