'use server'
import { OrderStatus } from '~/app/shared/enum/orderStatus'
import { Vehicle } from '~/app/shared/inteface'
import prisma from '~/lib/prisma'

//Thuê xe tạo đơn
const RentVehicle = async (
  userId: string,
  vehicle: Vehicle,
  fromDate: Date,
  toDate: Date,
  status: number
) => {
  try {
    const orderCount = await prisma.orders.count()
    const sequence = String(orderCount + 1).padStart(3, '0')
    const orderCode = `ORD${sequence}`
    if (!vehicle || !fromDate || !toDate) {
      return {
        success: false,
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau!'
      }
    }

    if (userId === '') {
      return {
        success: false,
        message: 'Bạn chưa đăng nhập!'
      }
    }

    await prisma.orders.create({
      data: {
        orderCode,
        userId,
        vehicleId: vehicle.vehicleId,
        fromDay: fromDate,
        toDay: toDate,
        status: status
      }
    })

    return {
      success: true,
      message:
        status === 1
          ? 'Đã thuê xe thành công!'
          : 'Đã tạo đơn thuê xe thành công!'
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Thuê xe thất bại, vui lòng thử lại sau.' + err
    }
  }
}

const getHistoryRentalByUserId = async (userId: string) => {
  try {
    if (!userId) {
      return {
        success: false,
        message: 'Vui lòng đăng nhập để dùng chức năng này!'
      }
    }

    const orders = await prisma.orders.findMany({
      where: { userId },
      select: {
        orderId: true,
        orderCode: true,
        fromDay: true,
        toDay: true,
        status: true,
        users: {
          select: {
            name: true
          }
        },
        vehicles: {
          select: {
            vehicleName: true,
            price: true
          }
        }
      }
    })

    if (!orders) {
      return {
        success: false,
        message: 'Bạn chưa thuê xe nào!',
        orders: []
      }
    }
    return {
      success: true,
      message: 'OK',
      orders
    }
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}

const getOrderByOrderId = async (orderId: string) => {
  try {
    if (!orderId) {
      return {
        success: false,
        message: 'Giao dịch không tồn tại!'
      }
    }

    const order = await prisma.orders.findUnique({
      where: { orderId },
      select: {
        orderId: true,
        orderCode: true,
        fromDay: true,
        toDay: true,
        status: true,
        users: {
          select: {
            name: true
          }
        },
        vehicles: {
          select: {
            vehicleName: true,
            image: true,
            price: true,
            categories: {
              select: {
                categoryName: true
              }
            }
          }
        }
      }
    })

    if (!order) {
      return {
        success: false,
        message: 'Bạn chưa thuê xe nào!',
        orders: {}
      }
    }
    return {
      success: true,
      message: 'OK',
      order
    }
  } catch (error) {
    console.log(error)
  }
}

const cancelOrder = async (orderId: string, status: number) => {
  try {
    if (status !== OrderStatus.Pending) {
      return {
        success: false,
        message: 'Không thể hủy đơn này!'
      }
    }

    await prisma.orders.update({
      where: { orderId },
      data: {
        status: OrderStatus.Cancelled
      }
    })

    return {
      success: true,
      message: 'Đã hủy đơn thành công!'
    }
  } catch (error) {
    console.error('Cancel order error:', error)
    return {
      success: false,
      message: 'Đã xảy ra lỗi khi hủy đơn!'
    }
  }
}

export { RentVehicle, getHistoryRentalByUserId, getOrderByOrderId, cancelOrder }
