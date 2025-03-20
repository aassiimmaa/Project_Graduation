'use client'
import React from 'react'
// import { useParams } from 'next/navigation'
import { NavBar } from '../../components/NavBar'
import Footer from '../../components/Footer'
import { Container } from '@mui/material'
import DetailCategory from '~/app/components/DetailCategory'

const ServicesPage: React.FC = () => {
  // const { id } = useParams() // Lấy param "id" từ URL

  return (
    <>
      <NavBar />
      <Container
        sx={{ mt: '70px', color: '#000', textAlign: 'center' }}
        maxWidth="xl"
      >
        <DetailCategory />
      </Container>
      <Footer />
    </>
  )
}

export default ServicesPage
