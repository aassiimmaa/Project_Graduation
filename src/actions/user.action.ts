'use server'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'

const prisma = new PrismaClient()

//Register
interface RegisterUserParams {
  fullName: string
  email: string
  phoneNumber: string
  password: string
}

const registerUser = async ({
  fullName,
  email,
  phoneNumber,
  password
}: RegisterUserParams) => {
  try {
    // Kiểm tra email đã tồn tại
    const existingEmail = await prisma.users.findUnique({
      where: { email }
    })
    if (existingEmail) {
      revalidatePath('/Register')
      return { success: false, message: 'Email đã được sử dụng!' }
    }

    // Kiểm tra số điện thoại đã tồn tại
    const existingPhone = await prisma.users.findUnique({
      where: { phone: phoneNumber }
    })
    if (existingPhone) {
      return { success: false, message: 'Số điện thoại đã được sử dụng!' }
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10)

    // Lưu thông tin người dùng vào bảng User
    const newUser = await prisma.users.create({
      data: {
        name: fullName,
        email,
        phone: phoneNumber,
        password: hashedPassword // Lưu mật khẩu đã mã hóa
      }
    })

    return { success: true, message: 'Đăng ký thành công!', user: newUser }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Đã xảy ra lỗi, vui lòng thử lại sau!' }
  }
}

//Login
interface LoginUserParams {
  email: string
  password: string
}

const LoginUser = async ({ email, password }: LoginUserParams) => {
  try {
    // Kiểm tra email có tồn tại trong cơ sở dữ liệu
    const user = await prisma.users.findUnique({
      where: { email }
    })

    if (!user) {
      return { success: false, message: 'Email không tồn tại!' }
    }

    if (user.isBanned) {
      return { success: false, message: 'Tài khoản của bạn đã bị khóa!' }
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: 'Mật khẩu không chính xác!' }
    }

    // Trả về thông tin người dùng nếu đăng nhập thành công
    return {
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        id: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        role: user.role,
        isBanned: user.isBanned
      }
    }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Đã xảy ra lỗi, vui lòng thử lại sau!' }
  }
}

//Update user
interface UpdateUserParams {
  userId: string
  fullName: string
  email: string
  phoneNumber: string
  avatar: string | null
}
const updateUser = async ({
  userId,
  fullName,
  email,
  phoneNumber,
  avatar
}: UpdateUserParams) => {
  try {
    const currentUser = await prisma.users.findUnique({
      where: { userId }
    })

    let avatarUrl = currentUser?.image // mặc định giữ nguyên

    // Nếu avatar là base64 và khác ảnh cũ → mới xử lý lưu file
    if (avatar?.startsWith('data:image') && avatar !== currentUser?.image) {
      const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      const filename = `${uuidv4()}.png`
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename)

      fs.writeFileSync(filePath, buffer)
      avatarUrl = `/uploads/${filename}`
    }

    const updatedUser = await prisma.users.update({
      where: { userId },
      data: {
        name: fullName,
        email,
        phone: phoneNumber,
        image: avatarUrl
      }
    })

    revalidatePath('/Profile')
    return {
      success: true,
      message: 'Cập nhật thành công',
      user: updatedUser
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Cập nhật thất bại, vui lòng thử lại sau.'
    }
  }
}

//Change Password
interface ChangePasswordParams {
  userId: string
  currentPassword: string
  newPassword: string
}

const changePassword = async ({
  userId,
  currentPassword,
  newPassword
}: ChangePasswordParams) => {
  try {
    // Tìm người dùng theo userId
    const user = await prisma.users.findUnique({
      where: { userId }
    })

    if (!user) {
      return { success: false, message: 'Người dùng không tồn tại!' }
    }

    // Kiểm tra mật khẩu hiện tại
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordValid) {
      return { success: false, message: 'Mật khẩu hiện tại không chính xác!' }
    }

    // Mã hóa mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    await prisma.users.update({
      where: { userId },
      data: {
        password: hashedNewPassword
      }
    })

    return { success: true, message: 'Thay đổi mật khẩu thành công!' }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Đã xảy ra lỗi, vui lòng thử lại sau!' }
  }
}

//getAllUsers
const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        createdAt: 'desc' // Sắp xếp theo thời gian tạo nếu có field này
      },
      select: {
        userId: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        isBanned: true,
        createdAt: true
      }
    })

    return { success: true, users }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Không thể lấy danh sách người dùng.'
    }
  }
}

//getUserById
const getUserById = async (userId: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: { userId },
      select: {
        userId: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        isBanned: true,
        createdAt: true
      }
    })

    if (!user) {
      return { success: false, message: 'Người dùng không tồn tại!' }
    }

    return { success: true, user }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Không thể lấy thông tin người dùng.'
    }
  }
}

//Ban User
const banUser = async (userId: string) => {
  try {
    const user = await getUserById(userId)

    if (!user) {
      return { success: false, message: 'Người dùng không tồn tại!' }
    }

    await prisma.users.update({
      where: { userId },
      data: {
        isBanned: true
      }
    })

    return {
      success: true,
      message: `Đã khóa người dùng ${user.user?.name} thành công!`
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Cập nhật thất bại, vui lòng thử lại sau.'
    }
  }
}

//Delete User
const deleteUser = async (userId: string) => {
  try {
    const user = await getUserById(userId)

    if (!user) {
      return { success: false, message: 'Người dùng không tồn tại!' }
    }

    // Xóa avatar trong thư mục public/uploads
    if (user.user?.image) {
      const fileName = user.user.image.split('/').pop() // Lấy phần cuối URL
      const imagePath = path.join(
        process.cwd(),
        'public',
        'uploads',
        fileName!
      )

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath) // Xóa file ảnh
      }
    }

    await prisma.users.delete({
      where: { userId }
    })

    return {
      success: true,
      message: `Đã xóa người dùng ${user.user?.name} thành công!`
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      message: 'Xóa thất bại, vui lòng thử lại sau.'
    }
  }
}

export {
  registerUser,
  LoginUser,
  updateUser,
  changePassword,
  getAllUsers,
  banUser,
  deleteUser
}
