import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import CategoryDetailItem from './CategoryDetailItem'
import { useParams } from 'next/navigation'
import VehiclesList from './VehiclesList'

const DetailCategory = () => {
  //inteface data
  interface CategoryItemProps {
    CategoryId: number
    image: string
    name: string
    description: string
  }

  const DataCategories: CategoryItemProps[] = [
    {
      CategoryId: 1,
      image:
        'https://icdn.24h.com.vn/upload/2-2023/images/2023-04-28/image7-1682662731-746-width1200height793.jpg',
      name: 'Xe Máy',
      description:
        'Nhanh gọn và tiết kiệm cho những chuyến đi ngắn trong thành phố.'
    },
    {
      CategoryId: 2,
      image:
        'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2024/10/11/xe-sedan-gia-re-thang-9-toyota-vios-dung-dau-honda-city-thang-hang-32261.jpg?width=0&s=7e0uvmV7Ak9bdewIIedOYA',
      name: 'Xe Sedan',
      description: 'Thoải mái, phù hợp cho chuyến đi gia đình hoặc công tác.'
    },
    {
      CategoryId: 3,
      image:
        'https://www.mitsubishi-motors.com.vn/w/wp-content/uploads/2023/07/All-New-Compact-SUV_Exterior_01.jpg',
      name: 'Xe SUV',
      description:
        'Thoáng mát, rộng rãi cho các chuyến đi đường dài và hành trình nhóm.'
    },
    {
      CategoryId: 4,
      image:
        'https://www.winauto.vn/wp-content/uploads/2024/09/sieu-xe-la-gi-bang-gia-cac-dong-sieu-xe-noi-bat-tai-viet-nam-4.jpg',
      name: 'Xe Cao Cấp',
      description:
        'Phù hợp cho các dịp đặc biệt và mang lại sự thoải mái tối ưu.'
    }
  ]

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

  //get params from URL
  const { id } = useParams()

  return (
    <Container id="Services" maxWidth="xl" sx={styleLayoutService}>
      <Typography sx={styleTitle} variant="h4">
        Chọn dòng xe cần phục vụ
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {DataCategories.map((item, index) => (
          <Link href={`/CategoryDetail/${index + 1}`} key={index}>
            <CategoryDetailItem
              image={item.image}
              name={item.name}
              description={item.description}
              chosen={id === item.CategoryId.toLocaleString() ? true : false}
            />
          </Link>
        ))}
      </Box>
        <VehiclesList />
    </Container>
  )
}

export default DetailCategory
