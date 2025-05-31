'use client'

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  ADDRESS,
  ALIGN_CENTER,
  CATEGORY_NAME,
  EMAIL,
  ERROR_HAPPEN,
  FONT_WEIGHT_BOLD,
  FROM_DATE,
  IMAGE,
  LINK_TO_LOGO,
  MY_ADDRESS,
  MY_EMAIL,
  MY_PHONENUM,
  ORDER_DETAIL_INFOMATION,
  ORDER_INVOICE,
  ORDER_RENT,
  ORDERID_TEXT,
  PHONE_NUMBER,
  PRICE,
  STATUS,
  TEXT_COLOR,
  THANKS_TEXT,
  TO_DATE,
  TOTAL_PRICE,
  VEHICLE_NAME
} from '~/app/shared/constant'
import { getOrderByOrderId } from '~/actions/order.action'
import { OrderDetailProps } from '~/app/shared/inteface'
import toast from 'react-hot-toast'
import { formatPrice } from '~/lib/formatPrice'
import { totalPrice } from '~/lib/totalPrice'
import { getRentalDays } from '~/lib/getRentalDay'
import { useParams } from 'next/navigation'
import { formatDate } from '~/lib/formatDate'
import { getPaymentStatus } from '~/lib/getPaymentStatus'
import {
  styleBackBtn,
  styleFooter,
  styleInvoiceContainer,
  styleKeyDetail,
  styleKeyTable,
  styleLoading,
  styleTableContainer,
  styleValueDetail
} from '~/app/shared/styles/HistoryRentalDetail'

const Invoice = () => {
  const [data, setData] = useState<OrderDetailProps>()
  const params = useParams()
  const orderId = params.id as string

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!orderId) {
        alert('Giao dịch không tồn tại!')
        return
      }

      const detail = await getOrderByOrderId(orderId)

      if (detail) {
        if (detail.success) {
          setData(detail.order)
        } else {
          toast.error(detail.message)
        }
      } else {
        toast.error(ERROR_HAPPEN)
      }
    }
    fetchOrderDetail()
  }, [orderId])

  if (!data) {
    return (
      <Box sx={styleLoading}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={styleInvoiceContainer}>
      {/* Header */}
      <IconButton sx={styleBackBtn} href={`/HistoryRental`}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Box display="flex" alignItems={ALIGN_CENTER}>
        <Box textAlign={ALIGN_CENTER} flex={1}>
          <Image src={LINK_TO_LOGO} width={140} height={100} alt="Logo" />
          <Typography variant="body2" color={TEXT_COLOR} gutterBottom>
            {`${ADDRESS}: ${MY_ADDRESS}`}
          </Typography>
          <Typography variant="body2" color={TEXT_COLOR} gutterBottom>
            {`${PHONE_NUMBER}: ${MY_PHONENUM}`}
          </Typography>
          <Typography variant="body2" color={TEXT_COLOR} gutterBottom>
            {`${EMAIL}: ${MY_EMAIL}`}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h4"
            fontWeight={FONT_WEIGHT_BOLD}
            color={TEXT_COLOR}
            mt={1}
          >
            {ORDER_INVOICE}
          </Typography>
        </Box>
      </Box>

      {/* Body */}
      <TableContainer sx={styleTableContainer}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={styleKeyTable}>{ORDERID_TEXT}</TableCell>
              <TableCell>{data.orderCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styleKeyTable}>{ORDER_RENT}</TableCell>
              <TableCell>{data.users.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styleKeyTable}>{FROM_DATE}</TableCell>
              <TableCell>{formatDate(data.fromDay)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styleKeyTable}>{TO_DATE}</TableCell>
              <TableCell>{formatDate(data.toDay)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styleKeyTable}>
                {ORDER_DETAIL_INFOMATION}
              </TableCell>
              <TableCell>
                <Box gap={2}>
                  <Typography sx={styleKeyDetail}>{IMAGE}</Typography>
                  <Image
                    src={data.vehicles.image}
                    alt="photo"
                    height={60}
                    width={100}
                    style={styleKeyDetail}
                  />
                  <Typography sx={styleKeyDetail}>
                    {`${VEHICLE_NAME}: `}
                    <Typography sx={styleValueDetail}>
                      {data.vehicles.vehicleName}
                    </Typography>
                  </Typography>
                  <Typography sx={styleKeyDetail}>
                    {`${CATEGORY_NAME}: `}
                    <Typography sx={styleValueDetail}>
                      {data.vehicles.categories.categoryName}
                    </Typography>
                  </Typography>
                  <Typography sx={styleKeyDetail}>
                    {`${PRICE}: `}
                    <Typography sx={styleValueDetail}>
                      {formatPrice(data.vehicles.price.toString())}
                    </Typography>
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styleKeyTable}>{TOTAL_PRICE}</TableCell>
              <TableCell>
                {formatPrice(
                  totalPrice(
                    data.vehicles.price,
                    getRentalDays(
                      formatDate(data.fromDay),
                      formatDate(data.toDay)
                    )
                  ).toString()
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styleKeyTable}>{STATUS}</TableCell>
              <TableCell>{getPaymentStatus(data.status)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box sx={styleFooter}>
        <Typography>{THANKS_TEXT}</Typography>
      </Box>
    </Box>
  )
}

export default Invoice
