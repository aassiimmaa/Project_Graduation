import { Card } from '@mui/material'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/material/Typography'
import React from 'react'
import Image from 'next/image'
import { CategoryDetailProps } from '../shared/inteface'
import {
  ALIGN_CENTER,
  FONT_WEIGHT_BOLD,
  VARIANT_INPUT
} from '../shared/constant'
import {
  styleChosenCard,
  styleImage,
  styleOverlay,
  styleUnchosenCard
} from '../shared/styles/CategoryDetailItem'

const CategoryDetailItem = ({
  image,
  name,
  description,
  chosen = false
}: CategoryDetailProps) => {
  return (
    <Card
      variant={VARIANT_INPUT}
      sx={chosen ? styleChosenCard : styleUnchosenCard}
    >
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
        <Typography
          mb={0.5}
          textAlign={ALIGN_CENTER}
          variant="h5"
          fontWeight={FONT_WEIGHT_BOLD}
        >
          {name}
        </Typography>
        <Typography textAlign={ALIGN_CENTER} variant="body1">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CategoryDetailItem
