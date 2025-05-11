import { OrderStatus } from '~/app/shared/enum/orderStatus'

export const getPaymentStatus = (status: number) => {
  if (status == OrderStatus.Cancelled){
    return 'Đã Hủy'
  } else if (status == OrderStatus.Pending){
    return 'Chưa Thanh Toán'
  } else {
    return 'Đã Thanh Toán'
  }
}
