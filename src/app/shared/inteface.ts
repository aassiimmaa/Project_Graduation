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

export type {
  User,
  Category,
  AddCategoryParams,
  AddCategoryDialogParams,
  EditCategoryDialogParams
}
