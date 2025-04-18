import { Box, Container, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CategoryDetailItem from './CategoryDetailItem'
import VehiclesList from './VehiclesList'
import { Category, DetailCategoryProps } from '../shared/inteface'
import { getAllCategories } from '~/actions/category.action'
import toast from 'react-hot-toast'
import {
  ERROR_HAPPEN,
  HELPER_CHOOSE_CATEGORY,
  SIZE_CONTAINER,
  TABLE_TITLE_VARIANT,
  VARIANT_SKELETON_BOX
} from '../shared/constant'
import { useDispatch } from 'react-redux'
import { setSelectedCategoryId } from '../redux/store/features/categorySlice'
import {
  styleCategoriesContainer,
  styleCategoriesSkeleton,
  styleLayoutService,
  styleTitle
} from '../shared/styles/DetailCategory'

const DetailCategory: React.FC<DetailCategoryProps> = ({ id }) => {
  const [selectId, setSelectId] = useState<string>(id || '')
  const [dataCategories, setDataCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const res = await getAllCategories()
        if (res.success) {
          setDataCategories(res.categories || [])
        } else {
          toast.error(res.message || ERROR_HAPPEN)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const handleChooseCategory = (categoryId: string) => {
    setSelectId(categoryId)
    dispatch(setSelectedCategoryId(categoryId))
  }

  return (
    <Container id="Services" maxWidth={SIZE_CONTAINER} sx={styleLayoutService}>
      <Typography sx={styleTitle} variant={TABLE_TITLE_VARIANT}>
        {HELPER_CHOOSE_CATEGORY}
      </Typography>
      <Box sx={styleCategoriesContainer}>
        {loading
          ? Array.from({ length: dataCategories.length || 4 }).map(
              (_, index) => (
                <Skeleton
                  key={index}
                  variant={VARIANT_SKELETON_BOX}
                  width={338}
                  height={240}
                  sx={styleCategoriesSkeleton}
                />
              )
            )
          : dataCategories.map((item, index) => (
              <Box
                onClick={() => handleChooseCategory(item.categoryId)}
                key={index}
              >
                <CategoryDetailItem
                  image={item.image}
                  name={item.categoryName}
                  description={item.description}
                  chosen={selectId === item.categoryId}
                />
              </Box>
            ))}
      </Box>
      <VehiclesList />
    </Container>
  )
}

export default DetailCategory
