//Users
interface User {
  userId: string
  name: string
  email: string
  phone: string
  createdAt: Date
  role: boolean
  isBanned: boolean
  image?: string | null
}

//Categories
interface Category {
  categoryId: string
  categoryName: string
  description: string
  image: string
}

interface AddCategoryParams {
  categoryName: string
  description: string
  image: string
}

interface AddCategoryDialogParams {
  open: boolean
  onClose: () => void
  onSubmit: (data: AddCategoryParams) => void
}

interface EditCategoryDialogParams {
  categoryId: string
  open: boolean
  onClose: () => void
  onSubmit: (data: AddCategoryParams) => void
}

interface CategoryDetailProps {
  image: string
  name: string
  description: string
  chosen: boolean
}

//Vehicles

interface Vehicle {
  categories: {
    image: string
    categoryId: string
    description: string
    categoryName: string
  }
  image: string
  vehicleId: string
  vehicleName: string
  categoryId: string
  description: string
  price: number
  isRent: boolean
  createdAt: Date
  updatedAt: Date
}
interface AddVehicleParams {
  vehicleName: string
  categoryName: string
  description: string
  price: string
  image: string
}

interface AddVehicleDialogParams {
  open: boolean
  onClose: () => void
  onSubmit: (data: AddVehicleParams) => void
}

interface EditVehicleDialogParams {
  vehicleId: string
  open: boolean
  onClose: () => void
  onSubmit: (data: AddVehicleParams) => void
}

// DetailCategory
interface DetailCategoryProps {
  id?: string
}

// Components
interface QRProps {
  openQR: boolean
  closeQR: () => void
  vehicle: Vehicle
  fromDate: string
  toDate: string
  PayCode: number
}

interface payLaterProps {
  userId: string
  vehicle: Vehicle
  fromDate: Date
  toDate: Date
  status: number
}

interface AvatarCroperProps {
  open: boolean
  onCloseDialog: () => void
  onCrop: (croppedImage: string) => void
  onCloseAvatar: () => void
  avatar: string | null
}

interface Slide {
  id: number
  image: string
}

interface CategoryProps {
  image: string
  name: string
  description: string
}
interface CellProps {
  align?: string
  fontWeight?: string
  color?: string
  colSpan?: number
  children?: React.ReactNode
}

interface CellHeadProps {
  width?: string
  align?: string
  children?: React.ReactNode
}

interface HistoryRentalProps {
  orderId: string
  fromDay: Date
  toDay: Date
  status: number
  users: {
    name: string
  }
  vehicles: {
    vehicleName: string
    price: number
  }
}

interface Order {
    orderId: string;
    orderCode: string;
    userId: string;
    vehicleId: string;
    fromDay: Date;
    toDay: Date;
    status: number;
    createdAt: Date;
}

interface OrderDetailProps {
  orderId: string
  orderCode: string
  fromDay: Date
  toDay: Date
  status: number
  createdAt: Date
  users: {
    name: string
  }
  vehicles: {
    vehicleName: string
    image: string
    price: number
    categories: {
      categoryName: string
    }
    location: {
      lat: number
      lng: number
    } | null
  }
}

interface OrderDetailModalProps {
  open: boolean
  onClose: () => void
  order: OrderDetailProps | null
  onCompleteOrder: (orderId: string, toDate: string) => void
  fetchOrders: () => void
}

interface OrderWithTotal {
  orderId: string
  orderCode: string
  userId: string
  vehicleId: string
  fromDay: Date
  toDay: Date
  status: number
  createdAt: Date
  users: {
    userId: string
    email: string
    phone: string
    name: string
    password: string
    image: string
    createdAt: Date
    updatedAt: Date
    isBanned: boolean
    role: boolean
  }
  vehicles: {
    vehicleId: string
    vehicleName: string
    image: string
    price: number
    description: string
    isRent: boolean
    createdAt: Date
    updatedAt: Date
    categories: {
      categoryId: string
      categoryName: string
      description: string
      image: string
    }
    location: {
      locationId: string
      vehicleId: string
      lat: number,
      lng: number
    } | null
  }
  totalAmount: number
}

interface OrderStatistic {
  data: OrderWithTotal[]
  totalOrders: number
  totalRevenue: number
}

//common type
type MuiColor =
  | 'default'
  | 'error'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | undefined

export type {
  User,
  Category,
  AddCategoryParams,
  AddCategoryDialogParams,
  EditCategoryDialogParams,
  CategoryDetailProps,
  Vehicle,
  AddVehicleParams,
  AddVehicleDialogParams,
  EditVehicleDialogParams,
  DetailCategoryProps,
  QRProps,
  payLaterProps,
  AvatarCroperProps,
  Slide,
  CategoryProps,
  CellProps,
  CellHeadProps,
  HistoryRentalProps,
  Order,
  OrderDetailProps,
  OrderDetailModalProps,
  OrderWithTotal,
  OrderStatistic,
  MuiColor
}
