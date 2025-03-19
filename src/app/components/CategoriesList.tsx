import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import CategoryItem from './CategoryItem'

const CategoriesList = () => {
  //Style Section
  const styleLayoutService = {
    paddingY: '60px'
  }

  const styleTitle = {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '48px'
  }

  return (
    <Container id='Services' maxWidth="xl" sx={styleLayoutService}>
      <Typography sx={styleTitle} variant="h4">
        Chọn dòng xe cần phục vụ
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CategoryItem
          image="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-28/image7-1682662731-746-width1200height793.jpg"
          name="Xe SUV"
          description="Thoáng mát, rộng rãi cho các chuyến đi đường dài và hành trình nhóm."
        />
        <CategoryItem
          image="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-28/image7-1682662731-746-width1200height793.jpg"
          name="Xe SUV"
          description="Thoáng mát, rộng rãi cho các chuyến đi đường dài và hành trình nhóm."
        />
        <CategoryItem
          image="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-28/image7-1682662731-746-width1200height793.jpg"
          name="Xe SUV"
          description="Thoáng mát, rộng rãi cho các chuyến đi đường dài và hành trình nhóm."
        />
        <CategoryItem
          image="https://icdn.24h.com.vn/upload/2-2023/images/2023-04-28/image7-1682662731-746-width1200height793.jpg"
          name="Xe SUV"
          description="Thoáng mát, rộng rãi cho các chuyến đi đường dài và hành trình nhóm."
        />
      </Box>
    </Container>
  )
}

export default CategoriesList
