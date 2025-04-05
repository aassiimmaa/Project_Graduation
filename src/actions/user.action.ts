'use server'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

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
      return { success: false, message: 'Email đã được sử dụng' }
    }

    // Kiểm tra số điện thoại đã tồn tại
    const existingPhone = await prisma.users.findUnique({
      where: { phone: phoneNumber }
    })
    if (existingPhone) {
      return { success: false, message: 'Số điện thoại đã được sử dụng' }
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
    return { success: false, message: 'Đã xảy ra lỗi, vui lòng thử lại sau' }
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
      where: { email },
    })

    if (!user) {
      return { success: false, message: 'Email không tồn tại' }
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: 'Mật khẩu không chính xác' }
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
      },
    }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Đã xảy ra lỗi, vui lòng thử lại sau' }
  }
}

export { registerUser, LoginUser }
