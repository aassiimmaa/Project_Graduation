import { Card } from '@mui/material'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import React from 'react'
import Image from 'next/image'
import { ALIGN_CENTER, VARIANT_INPUT } from '../shared/constant'
import { CategoryProps } from '../shared/inteface'
import { styleCard } from '../shared/styles/CategoryItem'

const CategoryItem = ({ image, name, description }: CategoryProps) => {
  return (
    <Card variant={VARIANT_INPUT} sx={styleCard}>
      <Image src={image} loading="lazy" alt={name} width={350} height={240} />
      <CardContent sx={{ padding: 2 }}>
        <Typography mb={0.5} textAlign={ALIGN_CENTER} level="h4">
          {name}
        </Typography>
        <Typography textAlign={ALIGN_CENTER} level="body-md">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CategoryItem
