import React, { useState } from 'react'
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
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
  ACTION,
  ALIGN_CENTER,
  CATEGORY_NAME,
  DELETE_VEHICLE,
  DESCRIPTION,
  EDIT_VEHICLE,
  FONT_WEIGHT_BOLD,
  IMAGE,
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
  styleTableContainer,
  styleVisibilityIcon
} from '~/app/shared/styles/AdminTable'
import SearchIcon from '@mui/icons-material/Search'
import Image from 'next/image'
import ShowLargeImage from './ShowLargeImage'

// Mock data
const vehicles = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Tên xe ${index + 1}`,
  type: index % 2 === 0 ? 'SUV' : 'Sedan',
  description: `Mô tả về xe ${index + 1}`,
  rentalPrice: `${(index + 1) * 1000000}`,
  image: `/images/air-blade-125-2025-tieu-chuan-den-bac.jpg`
}))

const VehiclesManagement: React.FC = () => {
  const [page, setPage] = useState(1) // Trang hiện tại (Pagination bắt đầu từ 1)
  const [searchTerm, setSearchTerm] = useState('') // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('') // Từ khóa thực hiện tìm kiếm
  const [selectedImage, setSelectedImage] = useState<string | null>(null) // Hình ảnh được chọn
  const rowsPerPage = 5 // Số dòng mỗi trang

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  // Hàm mở modal hiển thị hình ảnh
  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  // Hàm đóng modal
  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <Typography variant={TABLE_TITLE_VARIANT} fontWeight={FONT_WEIGHT_BOLD}>
        {VEHICLE_MANAGEMENT}
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
      </Box>

      <TableContainer component={Paper} sx={styleTableContainer}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableHeadCell align={ALIGN_CENTER} width={W_5}>
                {SERIAL}
              </TableHeadCell>
              <TableHeadCell width={W_15}>{VEHICLE_NAME}</TableHeadCell>
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
                <StyledTableRow key={vehicle.id}>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {index + 1 + (page - 1) * rowsPerPage}
                  </TableBodyCell>
                  <TableBodyCell>{vehicle.name}</TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {vehicle.type}
                  </TableBodyCell>
                  <TableBodyCell>{vehicle.description}</TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {vehicle.rentalPrice}
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
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title={DELETE_VEHICLE}>
                      <Button
                        variant={VARIANT_BUTTON}
                        size={SIZE_BUTTON}
                        sx={styleDeleteButton}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </TableBodyCell>
                </StyledTableRow>
              ))
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
    </>
  )
}

export default VehiclesManagement
