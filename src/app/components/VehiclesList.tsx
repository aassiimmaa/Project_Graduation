import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid2,
  Box
} from '@mui/material'
import Link from 'next/link'

// Interface
interface Vehicle {
  id: number
  name: string
  price: string
  imageUrl: string
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: 'Car A',
    price: '$20,000',
    imageUrl:
      'https://www.winauto.vn/wp-content/uploads/2024/09/sieu-xe-la-gi-bang-gia-cac-dong-sieu-xe-noi-bat-tai-viet-nam-4.jpg'
  },
  {
    id: 2,
    name: 'Car B',
    price: '$25,000',
    imageUrl:
      'https://www.winauto.vn/wp-content/uploads/2024/09/sieu-xe-la-gi-bang-gia-cac-dong-sieu-xe-noi-bat-tai-viet-nam-4.jpg'
  },
  {
    id: 3,
    name: 'Car C',
    price: '$30,000',
    imageUrl:
      'https://www.winauto.vn/wp-content/uploads/2024/09/sieu-xe-la-gi-bang-gia-cac-dong-sieu-xe-noi-bat-tai-viet-nam-4.jpg'
  },
  {
    id: 4,
    name: 'Car D',
    price: '$35,000',
    imageUrl:
      'https://www.winauto.vn/wp-content/uploads/2024/09/sieu-xe-la-gi-bang-gia-cac-dong-sieu-xe-noi-bat-tai-viet-nam-4.jpg'
  },
  {
    id: 5,
    name: 'Car E',
    price: '$40,000',
    imageUrl:
      'https://www.winauto.vn/wp-content/uploads/2024/09/sieu-xe-la-gi-bang-gia-cac-dong-sieu-xe-noi-bat-tai-viet-nam-4.jpg'
  },
  {
    id: 6,
    name: 'Car F',
    price: '$45,000',
    imageUrl:
      'https://www.winauto.vn/wp-content/uploads/2024/09/sieu-xe-la-gi-bang-gia-cac-dong-sieu-xe-noi-bat-tai-viet-nam-4.jpg'
  }
]

//Styles
const styleTitle = { mt: 8, mb: 4 }

const styleCardVehicle = {
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer'
  }
}

const VehiclesList: React.FC = () => {
  return (
    <>
      <Typography variant="h4" component="h1" sx={styleTitle}>
        <Box component="strong" color="rgba(218, 152, 53)">
          Xe SUV
        </Box>{' '}
        đang phục vụ
      </Typography>
      <Grid2 container spacing={3.665}>
        {vehicles.map(vehicle => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={vehicle.id}>
            <Link href={`/VehicleDetail/${vehicle.id}`} passHref>
              <Card sx={styleCardVehicle}>
                <CardMedia
                  component="img"
                  height="240"
                  image={vehicle.imageUrl}
                  alt={vehicle.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div" lineHeight={2.4}>
                    {vehicle.name}
                  </Typography>
                  <Typography variant="body1" color="red">
                    {vehicle.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </>
  )
}

export default VehiclesList
