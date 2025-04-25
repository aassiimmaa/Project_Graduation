'use server'
import { Vehicle } from '~/app/shared/inteface'
import prisma from '~/lib/prisma'

//Thuê xe tạo đơn
const RentVehicle = async (userId: string, vehicle: Vehicle, fromDate: Date, toDate: Date, status: number) => {
  try {
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
        userId,
        vehicleId: vehicle.vehicleId,
        fromDay: fromDate,
        toDay: toDate,
        status: status
      }
    })

    return {
      success: true,
      message: status === 1 ? 'Đã thuê xe thành công!' : 'Đã tạo đơn thuê xe thành công!'
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Thuê xe thất bại, vui lòng thử lại sau.' + err
    }
  }
}

export { RentVehicle }
