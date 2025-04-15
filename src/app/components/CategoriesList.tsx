'use client'
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'
import Link from 'next/link'
import { getAllCategories } from '~/actions/category.action'
import { Category } from '../shared/inteface'
import {
  styleLayoutService,
  styleServiceSectionLayout,
  styleTitle
} from '../shared/styles/CategoriesList'
import {
  ERROR_HAPPEN,
  SERVICE_CAR,
  SIZE_CONTAINER,
  TABLE_TITLE_VARIANT
} from '../shared/constant'
import toast from 'react-hot-toast'

const CategoriesList = () => {
  const [DataCategories, setDataCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories()
        if (res.success) {
          setDataCategories(res.categories || [])
        } else {
          toast.error(res.message || ERROR_HAPPEN)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <Container id="Services" maxWidth={SIZE_CONTAINER} sx={styleLayoutService}>
      <Typography sx={styleTitle} variant={TABLE_TITLE_VARIANT}>
        {SERVICE_CAR}
      </Typography>
      <Box sx={styleServiceSectionLayout}>
        {DataCategories?.map((item, index) => (
          <Link href={`/CategoryDetail/${index + 1}`} key={index}>
            <CategoryItem
              image={item.image}
              name={item.categoryName}
              description={item.description}
            />
          </Link>
        ))}
      </Box>
    </Container>
  )
}

export default CategoriesList
