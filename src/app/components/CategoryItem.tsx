import { Card } from '@mui/material'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import React from 'react'
import Image from 'next/image'

//inteface
interface CategoryProps {
  image: string
  name: string
  description: string
}

//Style
const styleCard = {
  width: 350,
  borderRadius: '8px',
  overflow: 'hidden',
  fontSize: 0,
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-15px)'
  }
}



const CategoryItem = ({ image, name, description }: CategoryProps) => {
  return (
    <Card variant="outlined" sx={styleCard}>
      <Image src={image} loading="lazy" alt={name} width={350} height={240} />
      <CardContent sx={{ padding: 2 }}>
        <Typography mb={0.5} textAlign="center" level="h4">
          {name}
        </Typography>
        <Typography textAlign="center" level="body-md">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CategoryItem
