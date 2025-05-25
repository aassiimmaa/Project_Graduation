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
  Chip
} from '@mui/material'
import TableHeadCell from '../TableHeadCell'
import TableBodyCell from '../TableBodyCell'
import DeleteIcon from '@mui/icons-material/Delete'
import PlaceIcon from '@mui/icons-material/Place'
import CheckIcon from '@mui/icons-material/Check'
import SearchIcon from '@mui/icons-material/Search'
import { Visibility } from '@mui/icons-material'
import {
  ACCEPT_ORDER,
  ACTION,
  ALIGN_CENTER,
  CREATED_AT,
  DELETE_ORDER,
  DETAIL_ORDER,
  FONT_WEIGHT_BOLD,
  FROM_DATE,
  LOADING_ORDERS,
  LOCATION_CAR,
  NO_DATA_AVAILABLE,
  ORDER_MANAGEMENT,
  ORDERID_TEXT,
  PAYMENT_STATUS,
  PLACEHOLDER_SEARCH,
  PRIMARY_COLOR,
  SEARCH_TEXT_BTN,
  SIZE_BUTTON,
  SIZE_PAGINATION,
  STATUS,
  TABLE_TITLE_VARIANT,
  TO_DATE,
  TOTAL_PRICE,
  USER_NAME,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  W_10,
  W_15
} from '~/app/shared/constant'
import {
  PaginationContainer,
  styleAcceptButton,
  styleButtonContainer,
  styleButtonContainerChildren,
  styleChip,
  styleDeleteButton,
  styleDetailButton,
  styleDivider,
  StyledTableHead,
  StyledTableRow,
  styleLocationButton,
  stylePagination,
  styleSearchBox,
  styleSearchButton,
  styleSearchTextField,
  styleTableContainer
} from '~/app/shared/styles/AdminTable'
import {
  acceptOrder,
  completeOrder,
  deleteOrder,
  getAllOrders
} from '~/actions/order.action'
import { MuiColor, OrderDetailProps } from '~/app/shared/inteface'
import toast from 'react-hot-toast'
import { formatDate } from '~/lib/formatDate'
import { totalPrice } from '~/lib/totalPrice'
import { getRentalDays } from '~/lib/getRentalDay'
import { getStatusStyle } from '~/lib/getStatusStyle'
import { getPaymentStatus } from '~/lib/getPaymentStatus'
import { formatPrice } from '~/lib/formatPrice'
import { formatDateTime } from '~/lib/formatDateTime'
import { OrderStatus } from '~/app/shared/enum/orderStatus'
import OrderDetailModal from './ordersComponents/DetailOrder'
import VehicleLocationModal from './VehicleLocationModal'

const OrdersManagement: React.FC = () => {
  const [page, setPage] = useState(1) // Trang hiện tại (Pagination bắt đầu từ 1)
  const [searchTerm, setSearchTerm] = useState('') // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState('') // Từ khóa thực hiện tìm kiếm
  const [orders, setOrders] = useState<OrderDetailProps[]>()
  const [loading, setLoading] = useState(false)
  const rowsPerPage = 5 // Số dòng mỗi trang
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailProps | null>(
    null
  )

  //location
  const [openLocationModal, setOpenLocationModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
  }>({ lat: 0, lng: 0 })
  const [newLocation, setNewLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0
  })

  // console.log(selectedLocation)

  useEffect(() => {
    if (selectedLocation) {
      setNewLocation(selectedLocation)
    }
  }, [selectedLocation])

  const handleShowLocation = (order: OrderDetailProps) => {
    if (!order.vehicles?.location) {
      toast.error('Không có thông tin vị trí xe')
      return
    }
    setSelectedLocation(order.vehicles.location)
    setOpenLocationModal(true)
  }

  const fetchOrders = async () => {
    setLoading(true)
    const res = await getAllOrders()
    if (res.success) {
      setOrders(res.orders)
    } else {
      toast.error(res.message)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  const filteredOrders =
    orders?.filter(order =>
      order.orderCode.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage) // Tổng số trang

  // Hàm xử lý thay đổi trang
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // Cắt dữ liệu thành từng trang
  const paginatedorders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    setSearchQuery(searchTerm) // Cập nhật từ khóa tìm kiếm thực tế
    setPage(1) // Reset về trang đầu tiên
  }

  //Hàm xử lý duyệt đơn
  const handleAcceptOrder = async (orderId: string) => {
    const res = await acceptOrder(orderId)
    if (res.success) {
      toast.success(res.message)
      fetchOrders()
    } else {
      toast.error(res.message)
    }
  }

  //Hàm xử lý xóa đơn
  const handleDeleteOrder = async (orderId: string) => {
    const confirmed = window.confirm(
      'Việc xóa sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa đơn hàng này không?'
    )
    if (!confirmed) return

    const res = await deleteOrder(orderId)
    if (res.success) {
      toast.success(res.message)
      fetchOrders()
    } else {
      toast.error(res.message)
    }
  }

  const handleOpenDetail = (order: OrderDetailProps) => {
    setSelectedOrder(order)
    setOpenDetailModal(true)
  }

  // Hàm xử lý hoàn thành đơn hàng
  const handleCompleteOrder = async (orderId: string, toDate: string) => {
    const now = new Date()
    const endDate = new Date(toDate)
    if (endDate > now) {
      const confirm = window.confirm(
        'Chưa hết hạn thuê, bạn có chắc chắn muốn hoàn tất đơn hàng không?'
      )
      if (!confirm) return
    }
    const res = await completeOrder(orderId)
    if (res.success) {
      toast.success(res.message)
      fetchOrders()
      setOpenDetailModal(false)
    } else {
      toast.error(res.message)
    }
  }

  const testLocation = { lat: 16.459214186981786, lng: 107.5927976982721 }

  // console.log(selectedLocation)

  return (
    <>
      <Typography variant={TABLE_TITLE_VARIANT} fontWeight={FONT_WEIGHT_BOLD}>
        {ORDER_MANAGEMENT}
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
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {ORDERID_TEXT}
              </TableHeadCell>
              <TableHeadCell>{USER_NAME}</TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {FROM_DATE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {TO_DATE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                {CREATED_AT}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_15}>
                {TOTAL_PRICE}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {STATUS}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {PAYMENT_STATUS}
              </TableHeadCell>
              <TableHeadCell align={ALIGN_CENTER} width={W_10}>
                {ACTION}
              </TableHeadCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedorders.length > 0 ? (
              paginatedorders.map(order => (
                <StyledTableRow key={order.orderId}>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {order.orderCode}
                  </TableBodyCell>
                  <TableBodyCell>{order.users.name}</TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {formatDate(order.fromDay)}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {formatDate(order.toDay)}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {formatDateTime(order.createdAt)}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {formatPrice(
                      totalPrice(
                        order.vehicles.price,
                        getRentalDays(
                          formatDate(order.fromDay),
                          formatDate(order.toDay)
                        )
                      ).toString()
                    )}
                  </TableBodyCell>
                  <TableBodyCell
                    align={ALIGN_CENTER}
                    fontWeight={`${FONT_WEIGHT_BOLD}`}
                  >
                    <Chip
                      label={getStatusStyle(order.status).description}
                      color={getStatusStyle(order.status).color as MuiColor}
                      icon={getStatusStyle(order.status).icon || undefined}
                      sx={styleChip}
                    />
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    {getPaymentStatus(order.status)}
                  </TableBodyCell>
                  <TableBodyCell align={ALIGN_CENTER}>
                    <Box sx={styleButtonContainer}>
                      <Box sx={styleButtonContainerChildren}>
                        <Tooltip title={ACCEPT_ORDER} placement="top">
                          <Button
                            variant={VARIANT_BUTTON}
                            size={SIZE_BUTTON}
                            sx={styleAcceptButton}
                            onClick={() => handleAcceptOrder(order.orderId)}
                            disabled={order.status != OrderStatus.Pending}
                          >
                            <CheckIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title={DETAIL_ORDER} placement="top">
                          <Button
                            variant={VARIANT_BUTTON}
                            size={SIZE_BUTTON}
                            sx={styleDetailButton}
                            onClick={() => handleOpenDetail(order)}
                          >
                            <Visibility />
                          </Button>
                        </Tooltip>
                      </Box>

                      <Box sx={styleButtonContainerChildren}>
                        <Tooltip title={LOCATION_CAR} placement="bottom">
                          <Button
                            variant={VARIANT_BUTTON}
                            size={SIZE_BUTTON}
                            sx={styleLocationButton}
                            onClick={() => handleShowLocation(order)}
                          >
                            <PlaceIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title={DELETE_ORDER} placement="bottom">
                          <Button
                            variant={VARIANT_BUTTON}
                            size={SIZE_BUTTON}
                            sx={styleDeleteButton}
                            onClick={() => handleDeleteOrder(order.orderId)}
                            disabled={order.status != OrderStatus.Cancelled}
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </Box>
                    </Box>
                  </TableBodyCell>
                </StyledTableRow>
              ))
            ) : loading ? (
              <StyledTableRow>
                <TableBodyCell align={ALIGN_CENTER} colSpan={10}>
                  {LOADING_ORDERS}
                </TableBodyCell>
              </StyledTableRow>
            ) : (
              <StyledTableRow>
                <TableBodyCell align={ALIGN_CENTER} colSpan={10}>
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

      <OrderDetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        order={selectedOrder}
        onCompleteOrder={() => {
          if (selectedOrder && selectedOrder.orderId && selectedOrder.toDay) {
            handleCompleteOrder(
              selectedOrder.orderId,
              selectedOrder.toDay.toString()
            )
          }
        }}
        fetchOrders={fetchOrders}
      />
      {selectedLocation && openLocationModal && (
        <VehicleLocationModal
          open={openLocationModal}
          onClose={() => {
            setOpenLocationModal(false)
            setSelectedLocation(testLocation)
            setNewLocation(testLocation)
          }}
          location={newLocation}
        />
      )}
    </>
  )
}

export default OrdersManagement
