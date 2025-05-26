'use server'
import { OrderStatus } from '~/app/shared/enum/orderStatus'
import prisma from '~/lib/prisma'
import { updateRentStatus } from './vehicle.action'
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns'
import { getRentalDays } from '~/lib/getRentalDay'
import { formatDate } from '~/lib/formatDate'
import { MY_PLACE_IN_MAP } from '~/app/shared/constant'
import { OrderWithTotal, Vehicle } from '~/app/shared/inteface'

//Thuê xe tạo đơn
const RentVehicle = async (
  userId: string,
  vehicle: Vehicle,
  fromDate: Date,
  toDate: Date,
  status: number
) => {
  try {
    const timestamp = Date.now()
    const orderCode = `ORD${timestamp}`
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

    const order = await prisma.orders.create({
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
      order: order,
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
      },
      orderBy: {
        createdAt: 'desc'
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
        createdAt: true,
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
            },
            location: {
              select: {
                lat: true,
                lng: true
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

const getAllOrders = async () => {
  try {
    const orders = await prisma.orders.findMany({
      select: {
        orderId: true,
        orderCode: true,
        fromDay: true,
        toDay: true,
        status: true,
        createdAt: true,
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
            },
            location: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!orders) {
      return {
        success: false,
        message: 'Lỗi lấy danh sách đơn hàng!',
        orders: []
      }
    }

    return {
      success: true,
      message: 'OK',
      orders
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error)
    return {
      success: false,
      message: 'Không thể lấy danh sách đơn hàng.'
    }
  }
}

const acceptOrder = async (orderId: string) => {
  try {
    const order = await prisma.orders.findUnique({
      where: { orderId },
      include: {
        vehicles: {
          select: {
            vehicleId: true
          }
        }
      }
    })

    if (!order) {
      return {
        success: false,
        message: 'Không tồn tại hóa đơn!'
      }
    }

    const vehicleId = order.vehicles.vehicleId

    await prisma.orders.updateMany({
      where: {
        orderId: { not: orderId },
        vehicles: {
          vehicleId: vehicleId
        },
        status: OrderStatus.Pending
      },
      data: {
        status: OrderStatus.Cancelled
      }
    })

    await prisma.orders.update({
      where: { orderId },
      data: {
        status: OrderStatus.Accepted
      }
    })

    await updateRentStatus(order.vehicles.vehicleId, true)

    return {
      success: true,
      message: 'Đơn hàng đã được xác nhận.'
    }
  } catch (error) {
    console.error('Lỗi xác nhận đơn:', error)
    return {
      success: false,
      message: 'Xác nhận đơn hàng thất bại.'
    }
  }
}

const deleteOrder = async (orderId: string) => {
  try {
    const order = prisma.orders.findUnique({
      where: { orderId }
    })

    if (!order) {
      return {
        success: false,
        message: 'Không tồn tại hóa đơn!'
      }
    }

    await prisma.orders.delete({
      where: { orderId }
    })

    return {
      success: true,
      message: 'Xóa đơn hàng thành công!'
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'Lỗi khi xóa hóa đơn!'
    }
  }
}

const completeOrder = async (orderId: string) => {
  try {
    const order = await prisma.orders.findUnique({
      where: { orderId },
      include: {
        vehicles: {
          select: {
            vehicleId: true
          }
        }
      }
    })

    if (!order) {
      return {
        success: false,
        message: 'Không tồn tại hóa đơn!'
      }
    }

    await prisma.orders.update({
      where: { orderId },
      data: {
        status: OrderStatus.Completed
      }
    })

    await updateRentStatus(order.vehicles.vehicleId, false)

    const freeVehicles = await prisma.vehicles.findMany({
      where: {
        isRent: false
      }
    })

    const updateVehicleLocations = freeVehicles.map((v: Vehicle) =>
      prisma.vehicles.update({
        where: { vehicleId: v.vehicleId },
        data: {
          location: {
            update: {
              lat: MY_PLACE_IN_MAP.lat,
              lng: MY_PLACE_IN_MAP.lng
            }
          }
        }
      })
    )

    await Promise.all(updateVehicleLocations)

    return {
      success: true,
      message: 'Đơn hàng đã hoàn tất.'
    }
  } catch (error) {
    console.error('Lỗi hoàn tất đơn:', error)
    return {
      success: false,
      message: 'Xác nhận hoàn tất đơn hàng thất bại.'
    }
  }
}

const GetRevenueOnDate = async (date: Date) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        createdAt: {
          gte: startOfDay(date),
          lte: endOfDay(date)
        },
        status: {
          in: [OrderStatus.Accepted, OrderStatus.Completed]
        }
      },
      include: {
        users: true,
        vehicles: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const ordersWithTotal = orders.map((order: OrderWithTotal) => {
      const rentalDays = getRentalDays(
        formatDate(order.fromDay),
        formatDate(order.toDay)
      )
      const price = order.vehicles?.price ?? 0
      const totalAmount = price * rentalDays
      return {
        ...order,
        totalAmount
      }
    })

    const totalRevenue = ordersWithTotal.reduce(
      (sum: number, order: OrderWithTotal) => sum + order.totalAmount,
      0
    )

    return {
      data: ordersWithTotal,
      totalOrders: orders.length,
      totalRevenue
    }
  } catch (error) {
    console.error('Lỗi khi tính doanh thu:', error)
    return {
      orders: [],
      totalOrders: 0,
      totalRevenue: 0
    }
  }
}

const GetRevenueInMonth = async (month: number, year: number) => {
  try {
    const fromDate = startOfMonth(new Date(year, month - 1, 1))
    const toDate = endOfMonth(fromDate)

    const orders = await prisma.orders.findMany({
      where: {
        createdAt: {
          gte: fromDate,
          lte: toDate
        },
        status: {
          in: [OrderStatus.Accepted, OrderStatus.Completed]
        }
      },
      include: {
        users: true,
        vehicles: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const ordersWithTotal = orders.map((order: OrderWithTotal) => {
      const rentalDays = getRentalDays(
        formatDate(order.fromDay),
        formatDate(order.toDay)
      )
      const price = order.vehicles?.price ?? 0
      const totalAmount = price * rentalDays
      return {
        ...order,
        totalAmount
      }
    })

    const totalRevenue = ordersWithTotal.reduce(
      (sum: number, order: OrderWithTotal) => sum + order.totalAmount,
      0
    )

    return {
      data: ordersWithTotal,
      totalOrders: orders.length,
      totalRevenue
    }
  } catch (error) {
    console.error('Lỗi khi tính doanh thu tháng:', error)
    return {
      data: [],
      totalRevenue: 0
    }
  }
}

const getRevenueInYear = async (year: number) => {
  try {
    const fromDate = new Date(year, 0, 1)
    const toDate = new Date(year, 11, 31, 23, 59, 59, 999)

    const orders = await prisma.orders.findMany({
      where: {
        createdAt: {
          gte: fromDate,
          lte: toDate
        },
        status: {
          in: [OrderStatus.Accepted, OrderStatus.Completed]
        }
      },
      include: {
        users: true,
        vehicles: {
          include: {
            categories: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const ordersWithTotal = orders.map((order: OrderWithTotal) => {
      const rentalDays = getRentalDays(
        formatDate(order.fromDay),
        formatDate(order.toDay)
      )
      const price = order.vehicles?.price ?? 0
      const totalAmount = price * rentalDays
      return {
        ...order,
        totalAmount
      }
    })

    const totalRevenue = ordersWithTotal.reduce(
      (sum: number, order: OrderWithTotal) => sum + order.totalAmount,
      0
    )

    return {
      data: ordersWithTotal,
      totalOrders: orders.length,
      totalRevenue
    }
  } catch (error) {
    console.error('Lỗi khi tính doanh thu năm:', error)
    return {
      data: [],
      totalRevenue: 0
    }
  }
}

const getRevenueAllTime = async () => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        status: {
          in: [OrderStatus.Accepted, OrderStatus.Completed]
        }
      },
      include: {
        users: true,
        vehicles: {
          include: {
            categories: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const ordersWithTotal = orders.map((order: OrderWithTotal) => {
      const rentalDays = getRentalDays(
        formatDate(order.fromDay),
        formatDate(order.toDay)
      )
      const price = order.vehicles?.price ?? 0
      const totalAmount = price * rentalDays
      return {
        ...order,
        totalAmount
      }
    })

    const totalRevenue = ordersWithTotal.reduce(
      (sum: number, order: OrderWithTotal) => sum + order.totalAmount,
      0
    )

    return {
      data: ordersWithTotal,
      totalOrders: orders.length,
      totalRevenue
    }
  } catch (error) {
    console.error('Lỗi khi tính doanh thu toàn thời gian:', error)
    return {
      data: [],
      totalRevenue: 0
    }
  }
}

const checkPaid = async () => {
  const url = process.env.API_GET_PAID
  if (!url) {
    console.error('API_KEY is not defined')
    return
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `apikey ${process.env.API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching:', error)
  }
}

export {
  RentVehicle,
  getHistoryRentalByUserId,
  getOrderByOrderId,
  cancelOrder,
  getAllOrders,
  acceptOrder,
  deleteOrder,
  completeOrder,
  GetRevenueOnDate,
  GetRevenueInMonth,
  getRevenueInYear,
  getRevenueAllTime,
  checkPaid
}
