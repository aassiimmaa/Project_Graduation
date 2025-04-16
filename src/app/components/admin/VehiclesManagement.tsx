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
  Box,
  MenuItem
} from '@mui/material'
import TableHeadCell from '../TableHeadCell'
import TableBodyCell from '../TableBodyCell'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  ACTION,
  ALIGN_CENTER,
  ALL_TEXT,
  CATEGORY_NAME,
  CONFIRM_DELETE_VEHICLE,
  CREATE_NEW,
  DELETE_VEHICLE,
  DESCRIPTION,
  EDIT_VEHICLE,
  FONT_WEIGHT_BOLD,
  IMAGE,
  LOADING_VEHICLES,
  NO_DATA_AVAILABLE,
  PLACEHOLDER_SEARCH,
  PRICE,
  PRIMARY_COLOR,
  SEARCH_TEXT_BTN,
  SERIAL,
  SIZE_BUTTON,
  SIZE_PAGINATION,
  TABLE_TITLE_VARIANT,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  VEHICLE_MANAGEMENT,
  VEHICLE_NAME,
  W_10,
  W_15,
  W_5
} from '~/app/shared/constant'
import {
  PaginationContainer,
  styleDeleteButton,
  styleDivider,
  StyledTableHead,
  StyledTableRow,
  styleEditButton,
  styleHoverImage,
  styleImageContainer,
  stylePagination,
  styleSearchBox,
  styleSearchButton,
  styleSearchTextField,
  styleSelectCategory,
  styleTableContainer,
  styleVisibilityIcon
} from '~/app/shared/styles/AdminTable'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'next/image'
import ShowLargeImage from './ShowLargeImage'
import AddIcon from '@mui/icons-material/Add'
import AddVehicleDialog from './vehiclesComponents/AddVehicleDialog'
import {
  addVehicle,
  deleteVehicle,
  getAllVehicles,
  updateVehicle
} from '~/actions/vehicle.action'
import toast from 'react-hot-toast'
import { AddVehicleParams, Category, Vehicle } from '~/app/shared/inteface'
import { formatPrice } from '~/lib/formatPrice'
import { getAllCategories } from '~/actions/category.action'
import EditVehicleDialog from './vehiclesComponents/EditVehicleDialog'

const VehiclesManagement: React.FC = () => {
  const [page, setPage] = useState(1) // Trang hiện tại (Pagination bắt đầu từ 1)
  const [searchTerm, setSearchTerm] = useState('') // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('') // Từ khóa thực hiện tìm kiếm
  const [selectedImage, setSelectedImage] = useState<string | null>(null) // Hình ảnh được chọn
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectdVehicle, setSelectedVehicle] = useState('')
  const [open, setOpen] = useState(false) // Trạng thái mở modal thêm mới xe
  const [openEdit, setOpenEdit] = useState(false) // Trạng thái mở modal chỉnh sửa xe

  const [vehicles, setVehicles] = useState<Vehicle[]>([]) // Dữ liệu xe
  const [loading, setLoading] = useState(false) // Trạng thái loading

  const [categories, setCategories] = useState<Category[]>([]) // Dữ liệu loại xe

  const rowsPerPage = 5 // Số dòng mỗi trang

  // Lấy danh sách xe từ API
  const fetchVehicles = async () => {
    setLoading(true)
    const res = await getAllVehicles()
    if (res.success) {
      setVehicles(res.vehicles || [])
    } else {
      alert(res.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  // Lấy danh sách loại xe từ API
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories()
      if (res.success) {
        setCategories(res.categories || [])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchSearch = vehicle.vehicleName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory
      ? vehicle.categoryId.toLowerCase() === selectedCategory.toLowerCase()
      : true
    return matchSearch && matchCategory
  })

  //Tổng số trang
  const totalPages = Math.ceil(filteredVehicles.length / rowsPerPage) // Tổng số trang

  // Hàm xử lý thay đổi trang
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // Cắt dữ liệu thành từng trang
  const paginatedvehicles = filteredVehicles.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    setSearchQuery(searchTerm) // Cập nhật từ khóa tìm kiếm thực tế
    setPage(1) // Reset về trang đầu tiên
  }

  // Hàm xử lý thay đổi loại xe
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value)
    setPage(1)
    setSearchQuery(searchTerm) // Cập nhật từ khóa hiện tại
  }

  // Hàm mở modal hiển thị hình ảnh
  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  // Hàm đóng modal
  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  //Hàm mở modal thêm mới xe
  const handleOpenAddDialog = () => {
    setOpen(true)
  }

  //Hàm đóng modal thêm mới xe
  const handleCloseAddDialog = () => {
    setOpen(false)
  }

  //Hàm mở modal chỉnh sửa xe
  const handleOpenEdit = (vehicleId: string) => {
    setOpenEdit(true)
    setSelectedVehicle(vehicleId)
  }

  //Hàm đóng modal chỉnh sửa xe
  const handleCloseEdit = () => {
    setOpenEdit(false)
    setSelectedVehicle('')
  }

  // Hàm xử lý thêm xe
  const handleAddVehicle = async (data: AddVehicleParams) => {
    const res = await addVehicle(data)
    if (res.success) {
      await fetchVehicles()
      toast.success(res.message)
      setOpen(false)
    } else {
      toast.error(res.message)
    }
  }

  // Hàm xử lý chỉnh sửa xe
  const handleEditVehicle = async (
    vehicleId: string,
    data: AddVehicleParams
  ) => {
    const res = await updateVehicle(vehicleId, {
      vehicleName: data.vehicleName,
      categoryName: data.categoryName,
      description: data.description,
      price: data.price.replace(/,/g, ''),
      image: data.image
    })
    if (res.success) {
      await fetchVehicles()
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
    handleCloseEdit()
  }

  // Hàm xử lý xóa xe
  const handleDeleteVehicle = async (vehicleId: string) => {
    const confirmDelete = window.confirm(CONFIRM_DELETE_VEHICLE)
    if (confirmDelete) {
      const res = await deleteVehicle(vehicleId)
      if (res.success) {
        toast.success(res.message, {
          duration: 2000
        })
      } else {
        toast.error(res.message, {
          duration: 2000
        })
      }
      fetchVehicles()
      setPage(1)
    }
  }

  return (
    <>
      <Typography variant={TABLE_TITLE_VARIANT} fontWeight={FONT_WEIGHT_BOLD}>
        {VEHICLE_MANAGEMENT}
      </Typography>
      <Divider sx={styleDivider} />

      <Box sx={styleSearchBox}>
        <TextField
          select
          label={CATEGORY_NAME}
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant={VARIANT_INPUT}
          size={SIZE_BUTTON}
          sx={styleSelectCategory}
        >
          <MenuItem value="">{ALL_TEXT}</MenuItem>
          {categories.map(category => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </MenuItem>
          ))}
        </TextField>
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
          onClick={handleOpenAddDialog}
        >
          {CREATE_NEW}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={styleTableContainer}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableHeadCell align={ALIGN_CENTER} width={W_5}>
                {SERIAL}
              </TableHeadCell>
              <TableHeadCell width={W_10}>{VEHICLE_NAME}</TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {CATEGORY_NAME}
              </TableHeadCell>
              <TableHeadCell>{DESCRIPTION}</TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                {PRICE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {IMAGE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                {ACTION}
              </TableHeadCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedvehicles.length > 0 ? (
              paginatedvehicles.map((vehicle, index) => (
                <StyledTableRow key={vehicle.vehicleId}>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {index + 1 + (page - 1) * rowsPerPage}
                  </TableBodyCell>
                  <TableBodyCell>{vehicle.vehicleName}</TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {vehicle.categories.categoryName}
                  </TableBodyCell>
                  <TableBodyCell>
                    <Tooltip title={vehicle.description} arrow placement="top">
                      <Box component={'span'}>
                        {vehicle.description.length > 200
                          ? vehicle.description.slice(0, 200) + '...'
                          : vehicle.description}
                      </Box>
                    </Tooltip>
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {formatPrice(vehicle.price.toString())}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    <Box sx={styleImageContainer}>
                      <Image
                        src={vehicle.image}
                        alt={vehicle.image}
                        width={80}
                        height={68}
                        onClick={() => handleImageClick(vehicle.image)}
                      />
                      <Box
                        className="hover-icon"
                        sx={styleHoverImage}
                        onClick={() => handleImageClick(vehicle.image)}
                      >
                        <VisibilityIcon sx={styleVisibilityIcon} />
                      </Box>
                    </Box>
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    <Tooltip title={EDIT_VEHICLE}>
                      <Button
                        variant={VARIANT_BUTTON}
                        size={SIZE_BUTTON}
                        sx={styleEditButton}
                        onClick={() => handleOpenEdit(vehicle.vehicleId)}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title={DELETE_VEHICLE}>
                      <Button
                        variant={VARIANT_BUTTON}
                        size={SIZE_BUTTON}
                        sx={styleDeleteButton}
                        onClick={() => handleDeleteVehicle(vehicle.vehicleId)}
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
                  {LOADING_VEHICLES}
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

      {/* Modal thêm mới xe */}
      <AddVehicleDialog
        open={open}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddVehicle}
      />

      <EditVehicleDialog
        vehicleId={selectdVehicle}
        open={openEdit}
        onClose={handleCloseEdit}
        onSubmit={data => handleEditVehicle(selectdVehicle, data)}
      />
    </>
  )
}

export default VehiclesManagement
