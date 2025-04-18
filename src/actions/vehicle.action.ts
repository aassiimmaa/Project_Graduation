'use server'
import { AddVehicleParams } from '~/app/shared/inteface'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import prisma from '~/lib/prisma'

const addVehicle = async ({
  vehicleName,
  categoryName,
  description,
  price,
  image
}: AddVehicleParams) => {
  try {
    if (image?.startsWith('data:image')) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      const filename = `${uuidv4()}.png`
      const filePath = path.join(process.cwd(), 'public', 'vehicles', filename)

      fs.writeFileSync(filePath, buffer)
      image = `/vehicles/${filename}`
    }

    const newVehicle = await prisma.vehicles.create({
      data: {
        vehicleName,
        categoryId: categoryName,
        description,
        price: parseInt(price.replace(/,/g, '')),
        image
      }
    })

    return {
      success: true,
      message: 'Đã thêm xe thành công!',
      vehicle: newVehicle
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Thêm xe thất bại, vui lòng thử lại sau.'
    }
  }
}

const getAllVehicles = async () => {
  try {
    const vehicles = await prisma.vehicles.findMany({
      include: {
        categories: true
      },
      orderBy: {
        price: 'asc'
      }
    })
    return {
      success: true,
      vehicles
    }
  } catch (err) {
    return {
      success: false,
      message: 'Lỗi khi lấy danh sách xe, vui lòng thử lại sau.' + err
    }
  }
}

const getVehicleById = async (vehicleId: string) => {
  try {
    const vehicle = await prisma.vehicles.findUnique({
      where: { vehicleId },
      include: {
        categories: true
      }
    })
    if (!vehicle) {
      return {
        success: false,
        message: 'Không tìm thấy xe này!'
      }
    }
    return {
      success: true,
      vehicle
    }
  } catch (err) {
    return {
      success: false,
      message: 'Lỗi khi lấy thông tin xe, vui lòng thử lại sau.' + err
    }
  }
}

const getVehicleByCategoryId = async (categoryId: string) => {
  try {
    if (!categoryId) {
      return {
        success: false,
        message: 'Không tìm thấy danh mục này!'
      }
    }

    const vehicles = await prisma.vehicles.findMany({
      where: { categoryId },
      include: {
        categories: true
      }
    })
    if (!vehicles) {
      return {
        success: false,
        message: 'Không tìm thấy xe này!'
      }
    }
    return {
      success: true,
      vehicles
    }
  } catch (err) {
    return {
      success: false,
      message: 'Lỗi khi lấy thông tin xe, vui lòng thử lại sau.' + err
    }
  }
}

const updateVehicle = async (vehicleId: string, data: AddVehicleParams) => {
  try {
    const vehicle = await prisma.vehicles.findUnique({
      where: { vehicleId }
    })

    if (!vehicle) {
      return {
        success: false,
        message: 'Không tìm thấy xe này!'
      }
    }

    const tempImage = vehicle.image

    if (data.image?.startsWith('data:image') && data.image !== vehicle.image) {
      const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      const filename = `${uuidv4()}.png`
      const filePath = path.join(process.cwd(), 'public', 'vehicles', filename)

      fs.writeFileSync(filePath, buffer)
      data.image = `/vehicles/${filename}`
    }

    // Xóa ảnh trong thư mục public/vehicles
    if (tempImage && tempImage !== data.image) {
      const fileName = tempImage.split('/').pop() // Lấy phần cuối URL
      const imagePath = path.join(
        process.cwd(),
        'public',
        'vehicles',
        fileName!
      )

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath) // Xóa file ảnh
      }
    }

    const updatedVehicle = await prisma.vehicles.update({
      where: { vehicleId },
      data: {
        vehicleName: data.vehicleName,
        categoryId: data.categoryName,
        description: data.description,
        price: parseInt(data.price.replace(/,/g, '')),
        image: data.image
      }
    })

    return {
      success: true,
      message: 'Đã cập nhật xe thành công!',
      vehicle: updatedVehicle
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Cập nhật xe thất bại, vui lòng thử lại sau.' + err
    }
  }
}

const deleteVehicle = async (vehicleId: string) => {
  try {
    const vehicle = await prisma.vehicles.findUnique({
      where: { vehicleId }
    })

    if (!vehicle) {
      return {
        success: false,
        message: 'Không tìm thấy xe này!'
      }
    }

    // Xóa ảnh trong thư mục public/vehicles
    if (vehicle.image) {
      const fileName = vehicle.image.split('/').pop() // Lấy phần cuối URL
      const imagePath = path.join(
        process.cwd(),
        'public',
        'vehicles',
        fileName!
      )

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath) // Xóa file ảnh
      }
    }
    const res = await prisma.vehicles.delete({
      where: { vehicleId }
    })

    if (res) {
      return {
        success: true,
        message: 'Đã xóa xe thành công!'
      }
    } else {
      return {
        success: false,
        message: 'Xóa xe thất bại, vui lòng thử lại sau.'
      }
    }
  } catch (err) {
    return {
      success: false,
      message: 'Xóa xe thất bại, vui lòng thử lại sau.' + err
    }
  }
}

export {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  getVehicleByCategoryId,
  updateVehicle,
  deleteVehicle
}
