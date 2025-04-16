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

export type {
  User,
  Category,
  AddCategoryParams,
  AddCategoryDialogParams,
  EditCategoryDialogParams,
  Vehicle,
  AddVehicleParams,
  AddVehicleDialogParams,
  EditVehicleDialogParams
}
