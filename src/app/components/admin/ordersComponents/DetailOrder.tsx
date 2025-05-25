import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Grid2
} from '@mui/material'
import { formatDate } from '~/lib/formatDate'
import { formatDateTime } from '~/lib/formatDateTime'
import { formatPrice } from '~/lib/formatPrice'
import { totalPrice } from '~/lib/totalPrice'
import { getRentalDays } from '~/lib/getRentalDay'
import { OrderDetailModalProps } from '~/app/shared/inteface'
import {
  ADDRESS,
  ALIGN_CENTER,
  CANCEL_ORDER,
  CATEGORY_NAME,
  CLOSE,
  CONFIRM_COMPLETE_ORDER,
  CREATE_ORDER_DATE,
  DAYS,
  EMAIL,
  ERROR_COLOR,
  FONT_WEIGHT_BOLD,
  FROM_DATE,
  IMAGE,
  INFO_COLOR,
  KEY_COMPONENT,
  LINK_TO_LOGO,
  MY_ADDRESS,
  MY_EMAIL,
  MY_PHONENUM,
  ORDER_INVOICE,
  ORDERID_TEXT,
  PHONE_NUMBER,
  PRICE,
  RENTAL_TIME,
  RENTAL_VEHICLE_INFO,
  STATUS,
  SUCCESS_COLOR,
  SYSTEM_NAME,
  TEXT_TRANSFORM,
  TO_DATE,
  TOTAL_PRICE,
  USER_NAME,
  VARIANT_BUTTON,
  VARIANT_INPUT,
  VEHICLE_NAME
} from '../../../shared/constant'
import Image from 'next/image'
import {
  styleDialogActions,
  styleDialogContainer,
  styleImage,
  styleTableBody,
  styleTableHead,
  styleTitleInvoice
} from '~/app/shared/styles/DetailOrder'
import { styleDivider } from '~/app/shared/styles/DetailOrder'
import { getPaymentStatus } from '~/lib/getPaymentStatus'
import { OrderStatus } from '~/app/shared/enum/orderStatus'
import { cancelOrder } from '~/actions/order.action'
import toast from 'react-hot-toast'

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  open,
  onClose,
  order,
  onCompleteOrder,
  fetchOrders
}) => {
  if (!order) return null

  const rentalDays = getRentalDays(
    formatDate(order.fromDay),
    formatDate(order.toDay)
  )
  const total = totalPrice(order.vehicles.price, rentalDays)

  const handleCancelOrder = async (orderId: string, status: number) => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn hủy đơn hàng này không?'
    )
    if (!confirmed) return

    const res = await cancelOrder(orderId, status)

    if (res.success) {
      toast.success(res.message)
      fetchOrders()
      onClose()
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Dialog
      sx={styleDialogContainer}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box display={'flex'}>
          <Image src={LINK_TO_LOGO} alt="logo" width={140} height={100} />
          <Box ml={4}>
            <Typography
              variant="h5"
              fontWeight={FONT_WEIGHT_BOLD}
              textTransform={TEXT_TRANSFORM}
            >
              {SYSTEM_NAME}
            </Typography>
            <Typography>{`${ADDRESS}: ${MY_ADDRESS}`}</Typography>
            <Typography>{`${EMAIL}: ${MY_EMAIL}`}</Typography>
            <Typography>{`${PHONE_NUMBER}: ${MY_PHONENUM}`}</Typography>
          </Box>
        </Box>
      </DialogTitle>
      <Divider sx={styleDivider} />
      <DialogContent>
        <Typography
          variant="h4"
          textAlign={ALIGN_CENTER}
          fontWeight={FONT_WEIGHT_BOLD}
          sx={styleTitleInvoice}
        >
          {ORDER_INVOICE}
        </Typography>
        <Typography textAlign={ALIGN_CENTER}>
          <Box component={KEY_COMPONENT}>{`${ORDERID_TEXT}: `}</Box>
          {order.orderCode}
        </Typography>
        <Typography textAlign={ALIGN_CENTER}>
          <Box component={KEY_COMPONENT}>{`${CREATE_ORDER_DATE}: `}</Box>
          {formatDateTime(order.createdAt)}
        </Typography>

        {/* Info grid */}
        <Box mt={4}>
          <Grid2 container>
            <Grid2 size={6}>
              <Typography gutterBottom>
                <Box component={KEY_COMPONENT}>{`${USER_NAME}: `}</Box>{' '}
                {order.users.name}
              </Typography>
              <Typography gutterBottom>
                <Box component={KEY_COMPONENT}>{`${STATUS}: `}</Box>{' '}
                {getPaymentStatus(order.status)}
              </Typography>
              <Typography gutterBottom>
                <Box
                  component={KEY_COMPONENT}
                >{`${RENTAL_VEHICLE_INFO}: `}</Box>
              </Typography>
            </Grid2>
            <Grid2 container size={6}>
              <Grid2 size={6}>
                <Typography gutterBottom>
                  <Box component={KEY_COMPONENT}>{`${FROM_DATE}: `}</Box>{' '}
                  {formatDate(order.fromDay)}
                </Typography>
              </Grid2>
              <Grid2 size={6}>
                <Typography gutterBottom>
                  <Box component={KEY_COMPONENT}>{`${TO_DATE}`}</Box>{' '}
                  {formatDate(order.toDay)}
                </Typography>
              </Grid2>
              <Typography gutterBottom mt={-4}>
                <Box component={KEY_COMPONENT}>{`${RENTAL_TIME}: `}</Box>{' '}
                {rentalDays} {DAYS}
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
        <TableContainer component={Paper} variant={VARIANT_INPUT}>
          <Table size="small">
            <TableHead sx={styleTableHead}>
              <TableRow>
                <TableCell>
                  <Box component={KEY_COMPONENT}>{VEHICLE_NAME}</Box>
                </TableCell>
                <TableCell align={ALIGN_CENTER}>
                  <Box component={KEY_COMPONENT}>{CATEGORY_NAME}</Box>
                </TableCell>
                <TableCell align={ALIGN_CENTER}>
                  <Box component={KEY_COMPONENT}>{PRICE}</Box>
                </TableCell>
                <TableCell align={ALIGN_CENTER}>
                  <Box component={KEY_COMPONENT}>{IMAGE}</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={styleTableBody}>
              <TableRow>
                <TableCell>{order.vehicles.vehicleName}</TableCell>
                <TableCell align={ALIGN_CENTER}>
                  {order.vehicles.categories.categoryName}
                </TableCell>
                <TableCell align={ALIGN_CENTER}>
                  {formatPrice(order.vehicles.price.toString())}
                </TableCell>
                <TableCell align={ALIGN_CENTER}>
                  <Box
                    component={'img'}
                    src={order.vehicles.image}
                    alt={order.vehicles.vehicleName}
                    sx={styleImage}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Tổng cộng */}
        <Box textAlign="right" mt={2}>
          <Typography variant="h6" fontWeight={FONT_WEIGHT_BOLD}>
            {`${TOTAL_PRICE}: `}
            <Typography
              fontSize={20}
              component={'span'}
              color="red"
              fontWeight={FONT_WEIGHT_BOLD}
            >
              {formatPrice(total.toString())}
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={styleDialogActions}>
        <Button variant={VARIANT_BUTTON} color={INFO_COLOR} onClick={onClose}>
          {CLOSE}
        </Button>
        {order.status == OrderStatus.Pending && (
          <Button
            variant={VARIANT_BUTTON}
            color={ERROR_COLOR}
            sx={{ ml: 1 }}
            onClick={() => handleCancelOrder(order.orderId, order.status)}
          >
            {CANCEL_ORDER}
          </Button>
        )}
        {order.status == OrderStatus.Accepted && (
          <Button
            variant={VARIANT_BUTTON}
            color={SUCCESS_COLOR}
            sx={{ ml: 1 }}
            onClick={() =>
              onCompleteOrder(order.orderId, order.toDay.toString())
            }
          >
            {CONFIRM_COMPLETE_ORDER}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default OrderDetailModal
