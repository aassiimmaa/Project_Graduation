'use server'
import prisma from '~/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import { AddCategoryParams } from '~/app/shared/inteface'

interface CategoryParams {
  categoryName: string
  description: string
  image: string
}

const getAllCategories = async () => {
  try {
    const categories = await prisma.categories.findMany({})
    return {
      success: true,
      categories
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Lỗi khi lấy danh sách loại xe, vui lòng thử lại sau.'
    }
  }
}

const addCategory = async ({
  categoryName,
  description,
  image
}: CategoryParams) => {
  try {
    const category = await prisma.categories.findUnique({
      where: { categoryName }
    })

    if (category) {
      return {
        success: false,
        message: 'Loại xe này đã có trong cơ sở dữ liệu!'
      }
    }

    if (image?.startsWith('data:image')) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      const filename = `${uuidv4()}.png`
      const filePath = path.join(process.cwd(), 'public', 'vehicles', filename)

      fs.writeFileSync(filePath, buffer)
      image = `/vehicles/${filename}`
    }

    const newCategory = await prisma.categories.create({
      data: {
        categoryName,
        description,
        image
      }
    })

    return {
      success: true,
      message: 'Đã thêm loại xe thành công!',
      category: newCategory
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Thêm loại xe thất bại, vui lòng thử lại sau.'
    }
  }
}

const getCategoryById = async (categoryId: string) => {
  try {
    const category = await prisma.categories.findUnique({
      where: { categoryId }
    })

    if (!category) {
      return {
        success: false,
        message: 'Không tìm thấy loại xe này!'
      }
    }

    return {
      success: true,
      category
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Lỗi khi lấy thông tin loại xe, vui lòng thử lại sau.'
    }
  }
}

const updateCategory = async (categoryId: string, data: AddCategoryParams) => {
  try {
    const category = await prisma.categories.findUnique({
      where: { categoryId }
    })
    
    if (!category) {
      return {
        success: false,
        message: 'Không tìm thấy loại xe này!'
      }
    }

    const tempImage = category.image // Lấy phần cuối URL, tạm thời lưu để xóa ảnh cũ sau khi cập nhật

    if (data.image.startsWith('data:image')) {
      const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      const filename = `${uuidv4()}.png`
      const filePath = path.join(process.cwd(), 'public', 'vehicles', filename)

      fs.writeFileSync(filePath, buffer)
      data.image = `/vehicles/${filename}`
    }

    // Xóa ảnh trong thư mục public/vehicles
    if (tempImage) {
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

    const res = await prisma.categories.update({
      where: { categoryId },
      data: {
        categoryName: data.categoryName,
        description: data.description,
        image: data.image
      }
    })
    if (res) {
      return {
        success: true,
        message: 'Cập nhật loại xe thành công!',
        category: res
      }
    } else {
      return {
        success: false,
        message: 'Cập nhật loại xe thất bại, vui lòng thử lại sau.'
      }
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Cập nhật loại xe thất bại, vui lòng thử lại sau.'
    }
  }
}

const deleteCategory = async (categoryId: string) => {
  try {
    const category = await prisma.categories.findUnique({
      where: { categoryId }
    })

    if (!category) {
      return {
        success: false,
        message: 'Không tìm thấy loại xe này!'
      }
    }

    // Xóa ảnh trong thư mục public/vehicles
    if (category.image) {
      const fileName = category.image.split('/').pop() // Lấy phần cuối URL
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

    await prisma.categories.delete({
      where: { categoryId }
    })

    return {
      success: true,
      message: 'Đã xóa loại xe thành công!'
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Xóa loại xe thất bại, vui lòng thử lại sau.'
    }
  }
}

export {
  addCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById,
  updateCategory
}
