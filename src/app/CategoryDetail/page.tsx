'use client'
import React from 'react'
// import { useParams } from 'next/navigation'
import { NavBar } from '~/app/components/NavBar'
import Footer from '~/app/components/Footer'
import { Container } from '@mui/material'
import DetailCategory from '~/app/components/DetailCategory'
import { useSelector } from 'react-redux'
import { RootState } from '~/app/redux/store'

const ServicesPage: React.FC = () => {
  const categoryId = useSelector(
    (state: RootState) => state.category.selectedCategoryId
  )
  
  return (
    <>
      <NavBar />
      <Container
        sx={{ mt: '70px', color: '#000', textAlign: 'center' }}
        maxWidth="xl"
      >
        <DetailCategory id={categoryId?.toString()} />
      </Container>
      <Footer />
    </>
  )
}

export default ServicesPage
