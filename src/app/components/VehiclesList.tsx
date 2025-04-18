import React, { useEffect, useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid2,
  Box,
  Skeleton
} from '@mui/material'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { getVehicleByCategoryId } from '~/actions/vehicle.action'
import { Vehicle } from '../shared/inteface'
import { formatPrice } from '~/lib/formatPrice'
import {
  styleCardVehicle,
  styleImage,
  styleTitle,
  styleTitleOverflow
} from '../shared/styles/VehicleList'
import { COLOR_STRONG, VARIANT_SKELETON_BOX } from '../shared/constant'

const VehiclesList: React.FC = () => {
  const categoryId = useSelector(
    (state: RootState) => state.category.selectedCategoryId
  )
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const fetchVehiclesByCategoryId = async () => {
      if (categoryId) {
        try {
          const vehicles = await getVehicleByCategoryId(categoryId)
          if (vehicles) {
            setVehicles(vehicles.vehicles || [])
          }
        } finally {
          setLoading(false)
        }
      }
    }
    fetchVehiclesByCategoryId()
  }, [categoryId])

  return (
    <>
      <Typography variant="h4" component="h1" sx={styleTitle}>
        <Box component="strong" color={COLOR_STRONG}>
          {vehicles[0]?.categories.categoryName}
        </Box>{' '}
        đang phục vụ
      </Typography>
      <Grid2 container spacing={3.665}>
        {loading
          ? Array.from({ length: vehicles.length || 4 }).map((_, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Skeleton
                  variant={VARIANT_SKELETON_BOX}
                  height={360}
                  sx={{ borderRadius: 1 }}
                />
              </Grid2>
            ))
          : vehicles.map(vehicle => (
              <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={vehicle.vehicleId}>
                <Link href={`/VehicleDetail/${vehicle.vehicleId}`} passHref>
                  <Card sx={styleCardVehicle}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={vehicle.image}
                      alt={vehicle.vehicleName}
                      sx={styleImage}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        lineHeight={2.4}
                        sx={styleTitleOverflow}
                        title={
                          vehicle.vehicleName.length > 30
                            ? vehicle.vehicleName
                            : undefined
                        }
                      >
                        {vehicle.vehicleName}
                      </Typography>
                      <Typography variant="h6" color="red">
                        {formatPrice(vehicle.price.toString())}
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
