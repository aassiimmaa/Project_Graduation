import {
  Cancel,
  HourglassEmpty,
  CheckCircle,
  DirectionsCar
} from '@mui/icons-material'
import { OrderStatus } from '~/app/shared/enum/orderStatus'

// Hàm hiển thị màu và icon trạng thái
export const getStatusStyle = (status: number) => {
  switch (status) {
    case OrderStatus.Pending:
      return {
        color: 'warning',
        icon: <HourglassEmpty fontSize="small" />,
        description: 'Chờ duyệt'
      }
    case OrderStatus.Accepted:
      return {
        color: 'primary',
        icon: <DirectionsCar fontSize="small" />,
        description: 'Đang thuê'
      }
    case OrderStatus.Completed:
      return {
        color: 'success',
        icon: <CheckCircle fontSize="small" />,
        description: 'Hoàn tất'
      }
    case OrderStatus.Cancelled:
      return {
        color: 'error',
        icon: <Cancel fontSize="small" />,
        description: 'Hủy'
      }
    default:
      return { color: undefined, icon: null }
  }
}
