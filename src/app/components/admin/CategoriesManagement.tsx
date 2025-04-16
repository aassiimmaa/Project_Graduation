import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Pagination,
  Typography,
  Divider,
  TableRow,
  Tooltip,
  TextField,
  Box
} from '@mui/material'
import TableHeadCell from '../TableHeadCell'
import TableBodyCell from '../TableBodyCell'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import {
  ACTION,
  ALIGN_CENTER,
  CATEGORY_MANAGEMENT,
  CATEGORY_NAME,
  CONFIRM_DELETE_CATEGORY,
  CREATE_NEW,
  DELETE_CATEGORY,
  DESCRIPTION,
  EDIT_CATEGORY,
  FONT_WEIGHT_BOLD,
  IMAGE,
  LOADING_CATEGORIES,
  NO_DATA_AVAILABLE,
  PLACEHOLDER_SEARCH,
  PRIMARY_COLOR,
  SEARCH_TEXT_BTN,
  SERIAL,
  SIZE_BUTTON,
  SIZE_PAGINATION,
  TABLE_TITLE_VARIANT,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  W_10,
  W_15,
  W_20
} from '~/app/shared/constant'
import {
  PaginationContainer,
  styleDeleteButton,
  styleDivider,
  StyledTableHead,
  StyledTableRow,
  styleEditButton,
  styleHoverImage,
  styleImage,
  styleImageContainer,
  stylePagination,
  styleSearchBox,
  styleSearchButton,
  styleSearchTextField,
  styleTableContainer,
  styleVisibilityIcon
} from '~/app/shared/styles/AdminTable'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'next/image'
import ShowLargeImage from './ShowLargeImage'
import AddCategoryDialog from './categoriesComponents/AddCategoryDialog'
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory
} from '~/actions/category.action'
import toast from 'react-hot-toast'
import { AddCategoryParams, Category } from '~/app/shared/inteface'
import EditCategoryDialog from './categoriesComponents/EditCategoryDialog'

const CategoriesManagement: React.FC = () => {
  const [page, setPage] = useState(1) // Trang hiện tại (Pagination bắt đầu từ 1)
  const [searchTerm, setSearchTerm] = useState('') // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('') // Từ khóa thực hiện tìm kiếm
  const [selectedImage, setSelectedImage] = useState<string | null>(null) // Hình ảnh được chọn
  const [openAddDialog, setOpenAddDialog] = useState(false) //Đóng mở modal thêm loại xe
  const [openEditDialog, setOpenEditDialog] = useState(false) //Đóng mở modal chỉnh sửa loại xe
  const [selectedCategory, setSelectedCategory] = useState<string>('') // ID loại xe được chọn
  const rowsPerPage = 5 // Số dòng mỗi trang

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  console.log('selectedCategory', selectedCategory)

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  //Lấy toàn bộ Categories trong hệ thống
  const fetchCategories = async () => {
    setLoading(true)
    const res = await getAllCategories()
    if (res.success) {
      setCategories(res.categories || [])
    } else {
      alert(res.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage) // Tổng số trang

  // Hàm xử lý thay đổi trang
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // Cắt dữ liệu thành từng trang
  const paginatedcategories = filteredCategories.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    setSearchQuery(searchTerm) // Cập nhật từ khóa tìm kiếm thực tế
    setPage(1) // Reset về trang đầu tiên
  }

  // Hàm mở modal hiển thị hình ảnh
  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  // Hàm đóng modal
  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  //Hàm xử lý thêm loại
  const handleAddCategory = async (data: AddCategoryParams) => {
    const newCategory = await addCategory({
      categoryName: data.categoryName,
      description: data.description,
      image: data.image
    })

    if (newCategory.success) {
      await fetchCategories() // Cập nhật danh sách loại xe sau khi thêm mới
      toast.success(newCategory.message, {
        duration: 2000
      })
    } else {
      toast.error(newCategory.message, {
        duration: 2000
      })
    }
    setOpenAddDialog(false)
  }

  //Hàm xử lý xóa loại xe
  const handleDeleteCategory = async (categoryId: string) => {
    const confirmDelete = window.confirm(CONFIRM_DELETE_CATEGORY)
    if (confirmDelete) {
      const res = await deleteCategory(categoryId)
      if (res.success) {
        toast.success(res.message, {
          duration: 2000
        })
      } else {
        toast.error(res.message, {
          duration: 2000
        })
      }
      fetchCategories()
      setPage(1)
    }
  }

  //Hàm xử lý chỉnh sửa loại xe
  const handleEditCategory = async (
    categoryId: string,
    data: AddCategoryParams
  ) => {
    const newCategory = await updateCategory(categoryId, {
      categoryName: data.categoryName,
      description: data.description,
      image: data.image
    })

    if (newCategory.success) {
      await fetchCategories() // Cập nhật danh sách loại xe sau khi thêm mới
      toast.success(newCategory.message, {
        duration: 2000
      })
    } else {
      toast.error(newCategory.message, {
        duration: 2000
      })
    }
    handleCloseEditDialog()
  }

  //Hàm đóng modal thêm loại xe
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false)
  }

  //Hàm đóng modal chỉnh sửa loại xe
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
    setSelectedCategory('')
  }

  return (
    <>
      <Typography variant={TABLE_TITLE_VARIANT} fontWeight={FONT_WEIGHT_BOLD}>
        {CATEGORY_MANAGEMENT}
      </Typography>
      <Divider sx={styleDivider} />

      <Box sx={styleSearchBox}>
        <TextField
          placeholder={PLACEHOLDER_SEARCH}
          variant={VARIANT_INPUT}
          size={SIZE_BUTTON}
          fullWidth
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={styleSearchTextField}
        />

        <Button
          variant={VARIANT_BUTTON}
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={styleSearchButton}
        >
          {SEARCH_TEXT_BTN}
        </Button>

        <Button
          variant={VARIANT_BUTTON}
          startIcon={<AddIcon />}
          sx={styleSearchButton}
          onClick={() => setOpenAddDialog(true)}
        >
          {CREATE_NEW}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={styleTableContainer}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {SERIAL}
              </TableHeadCell>
              <TableHeadCell width={W_20}>{CATEGORY_NAME}</TableHeadCell>
              <TableHeadCell>{DESCRIPTION}</TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_20}>
                {IMAGE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                {ACTION}
              </TableHeadCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedcategories.length > 0 ? (
              paginatedcategories.map((category, index) => (
                <StyledTableRow key={category.categoryId}>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {index + 1 + (page - 1) * rowsPerPage}
                  </TableBodyCell>
                  <TableBodyCell>{category.categoryName}</TableBodyCell>
                  <TableBodyCell>{category.description}</TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    <Box sx={styleImageContainer}>
                      <Image
                        src={category.image}
                        alt={category.image}
                        width={90}
                        height={68}
                        style={styleImage}
                        onClick={() => handleImageClick(category.image)}
                      />
                      <Box
                        className="hover-icon"
                        sx={styleHoverImage}
                        onClick={() => handleImageClick(category.image)}
                      >
                        <VisibilityIcon sx={styleVisibilityIcon} />
                      </Box>
                    </Box>
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    <Tooltip title={EDIT_CATEGORY}>
                      <Button
                        variant={VARIANT_BUTTON}
                        size={SIZE_BUTTON}
                        sx={styleEditButton}
                        onClick={() => {
                          setSelectedCategory(category.categoryId)
                          setOpenEditDialog(true)
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title={DELETE_CATEGORY}>
                      <Button
                        variant={VARIANT_BUTTON}
                        size={SIZE_BUTTON}
                        sx={styleDeleteButton}
                        onClick={() =>
                          handleDeleteCategory(category.categoryId)
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </TableBodyCell>
                </StyledTableRow>
              ))
            ) : loading ? (
              <StyledTableRow>
                <TableBodyCell align={ALIGN_CENTER} colSpan={8}>
                  {LOADING_CATEGORIES}
                </TableBodyCell>
              </StyledTableRow>
            ) : (
              <StyledTableRow>
                <TableBodyCell align={ALIGN_CENTER} colSpan={7}>
                  {NO_DATA_AVAILABLE}
                </TableBodyCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>

        {/* Phân trang */}
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color={PRIMARY_COLOR}
            size={SIZE_PAGINATION}
            sx={stylePagination}
          />
        </PaginationContainer>
      </TableContainer>

      {/* Modal hiển thị hình ảnh */}
      {selectedImage && (
        <ShowLargeImage
          selectedImage={selectedImage}
          close={handleCloseModal}
        />
      )}

      {/* Modal thêm loại xe */}
      <AddCategoryDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddCategory}
      />

      <EditCategoryDialog
        categoryId={selectedCategory}
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onSubmit={data => handleEditCategory(selectedCategory, data)}
      />
    </>
  )
}

export default CategoriesManagement
