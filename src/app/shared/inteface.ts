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
}


interface payLaterProps{
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
  CellHeadProps
}


