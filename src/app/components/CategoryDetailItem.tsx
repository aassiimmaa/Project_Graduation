import { Card } from '@mui/material'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/material/Typography'
import React from 'react'
import Image from 'next/image'

// Interface
interface CategoryDetailProps {
  image: string
  name: string
  description: string
  chosen: boolean
}

// Styles
const styleCard = {
  width: 340,
  borderRadius: '12px',
  overflow: 'hidden',
  fontSize: 0,
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  position: 'relative',
  transition: 'all 0.4s ease-in-out'
}

const styleOverlay = {
  padding: 2,
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff'
}

const styleUnchosenCard = {
  ...styleCard,
  '&:hover': {
    transform: 'translateY(-15px) scale(1.03)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)'
  },
  '&:hover .image': {
    transform: 'scale(1.1)'
  },
  '&:hover .overlay': {
    opacity: 1
  }
}

const styleChosenCard = {
  ...styleCard,
  transform: 'translateY(-15px) scale(1.03)',
  boxShadow: '0 0 15px 10px rgba(218, 152, 53, 0.8)',
  '& .image': {
    transform: 'scale(1.1)'
  }
}

const styleImage = {
  transition: 'transform 0.4s ease-in-out'
}

const CategoryDetailItem = ({
  image,
  name,
  description,
  chosen = false
}: CategoryDetailProps) => {
  return (
    <Card variant="outlined" sx={chosen ? styleChosenCard : styleUnchosenCard}>
      <Image
        src={image}
        loading="lazy"
        alt={name}
        width={350}
        height={240}
        className="image"
        style={styleImage}
      />
      <CardContent sx={styleOverlay} className="overlay">
        <Typography mb={0.5} textAlign="center" variant="h5" fontWeight={600}>
          {name}
        </Typography>
        <Typography textAlign="center" variant="body1">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CategoryDetailItem
