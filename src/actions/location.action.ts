'use server'
import { OrderStatus } from '~/app/shared/enum/orderStatus'
import prisma from '~/lib/prisma'

const updateLocation = async () => {
  const orders = await prisma.orders.findMany({
    where: {
      status: OrderStatus.Accepted
    }
  })

  const HUE_BOUNDING_BOX = {
    minLat: 16.455, // gần xã Thủy Bằng
    maxLat: 16.49, // gần phường An Đông
    minLng: 107.57, // gần sông Hương
    maxLng: 107.62 // gần cầu Dã Viên
  }

  const getRandomCoordinate = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  const updatePromises = orders.map(item =>
    prisma.location.update({
      where: { vehicleId: item.vehicleId },
      data: {
        lat: getRandomCoordinate(
          HUE_BOUNDING_BOX.minLat,
          HUE_BOUNDING_BOX.maxLat
        ),
        lng: getRandomCoordinate(
          HUE_BOUNDING_BOX.minLng,
          HUE_BOUNDING_BOX.maxLng
        )
      }
    })
  )

  await Promise.all(updatePromises)
  return {
    success: true,
    message: 'Đã update vị trí!'
  }
}

export { updateLocation }
