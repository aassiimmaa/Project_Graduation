'use client'
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'
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
import { useDispatch } from 'react-redux'
import { setSelectedCategoryId } from '../redux/store/features/categorySlice'
import { useRouter } from 'next/navigation'

const CategoriesList = () => {
  const [DataCategories, setDataCategories] = useState<Category[]>([])
  const dispatch = useDispatch()
  const router = useRouter()

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
          <Box key={index} onClick={() => {
            dispatch(setSelectedCategoryId(item.categoryId))
            router.push(`/CategoryDetail`)
          }}>
            <CategoryItem
              image={item.image}
              name={item.categoryName}
              description={item.description}
            />
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default CategoriesList
