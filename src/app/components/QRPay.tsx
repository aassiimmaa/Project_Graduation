import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  Divider,
  Box,
  CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import { payLaterProps, QRProps } from '../shared/inteface'
import { styleDialogContent, styleDialogTitle } from '../shared/styles/QRPay'
import {
  ALIGN_CENTER,
  ERROR_COLOR,
  FROM_DATE,
  OR,
  PAY_LATER,
  PAY_LATER_NOTE,
  PRIMARY_COLOR,
  QR_HELP,
  QR_PAY_NOTE,
  QR_TITLE,
  TO_DATE,
  TOTAL_PRICE,
  VARIANT_BUTTON,
  VARIANT_TEXT,
  VEHICLE_NAME
} from '../shared/constant'
import { acceptOrder, checkPaid, RentVehicle } from '~/actions/order.action'
import toast from 'react-hot-toast'
import { getRentalDays } from '~/lib/getRentalDay'
import { formatDate } from '~/lib/formatDate'
import { totalPrice } from '~/lib/totalPrice'
import { useEffect, useState, useCallback } from 'react'
import { formatPrice } from '~/lib/formatPrice'
import { OrderStatus } from '../shared/enum/orderStatus'
import useRequireAuth from '~/hooks/useRequireAuth'

const QRPay = ({
  openQR,
  closeQR,
  vehicle,
  fromDate,
  toDate,
  PayCode
}: QRProps) => {
  const user = useRequireAuth()
  const rentalDays = getRentalDays(
    formatDate(new Date(fromDate)),
    formatDate(new Date(toDate))
  )
  const totalAmount = totalPrice(vehicle.price, rentalDays)
  const [amountPay, setAmountPay] = useState(0)
  const [contentPay, setContentPay] = useState('')
  const testPrice = 1000
  const uniquePaymentCode = `Pay${PayCode}`

  const handlePayLater = async ({
    userId,
    vehicle,
    fromDate,
    toDate,
    status
  }: payLaterProps) => {
    const res = await RentVehicle(userId, vehicle, fromDate, toDate, status)
    if (res.success) {
      toast.success(res.message)
      window.location.href = '/HistoryRental'
    } else {
      toast.error(res.message)
    }
  }

  const fetchPaid = async () => {
    const res = await checkPaid()
    // console.log(res.data.records[res.data.records.length - 1].amount)
    // console.log(res)
    setAmountPay(res.data.records[res.data.records.length - 1].amount)
    setContentPay(res.data.records[res.data.records.length - 1].description)
  }

  const paidOrder = useCallback(
    async (status: number) => {
      if (!user) return
      const res = await RentVehicle(
        user.userId,
        vehicle,
        new Date(fromDate),
        new Date(toDate),
        status
      )
      if (res.order) {
        await acceptOrder(res.order.orderId)
      }
      if (res.success) {
        toast.success(res.message)
        window.location.href = '/HistoryRental'
      } else {
        toast.error(res.message)
      }
    },
    [user, vehicle, fromDate, toDate]
  )

  useEffect(() => {
    // Gọi lần đầu sau 20 giây
    const timeout = setTimeout(() => {
      fetchPaid()

      // Sau lần đầu, lặp lại mỗi 30 giây
      const interval = setInterval(() => {
        fetchPaid()
      }, 30000)

      // Cleanup interval khi component unmount
      return () => clearInterval(interval)
    }, 20000)

    // Cleanup timeout nếu component unmount trước khi timeout chạy
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (amountPay === 0 || contentPay === '') return

    if (amountPay >= testPrice && contentPay.includes(uniquePaymentCode)) {
      // Thông báo
      toast.success('Thanh toán thành công!')
      paidOrder(OrderStatus.Accepted)
    }
  }, [amountPay, contentPay, paidOrder, uniquePaymentCode])

  // console.log('Tiền đã nhận: ', amountPay)
  // console.log('Nội dung nhận: ', contentPay)
  // console.log(uniquePaymentCode)

  if (!user) return <CircularProgress />;

  return (
    <Dialog open={openQR} onClose={() => closeQR()} maxWidth="sm" fullWidth>
      <DialogTitle sx={styleDialogTitle}>
        {QR_TITLE}
        <IconButton onClick={() => closeQR()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={styleDialogContent}>
        <Typography variant="body1" mb={2}>
          {QR_HELP}
        </Typography>

        <Image
          // src={`https://img.vietqr.io/image/vietinbank-106875540580-compact.jpg?amount=${totalAmount}&addInfo=Thanh%20toan%20don%20hang%20${vehicle.vehicleId}&accountName=NGUYEN%20THANH%20AN`}
          src={`https://img.vietqr.io/image/vietinbank-106875540580-compact.jpg?amount=${1000}&addInfo=${uniquePaymentCode}&accountName=NGUYEN%20THANH%20AN`}
          alt="QR"
          width={300}
          height={300}
        />

        <Typography mt={2}>
          {`${VEHICLE_NAME}:`} <strong>{vehicle?.vehicleName}</strong>
          <br />
          {`${FROM_DATE}:`} {fromDate} - {`${TO_DATE}:`} {toDate}
          <br />
          {`${TOTAL_PRICE}: `} {formatPrice(totalAmount.toString())}
        </Typography>

        <Typography
          variant={VARIANT_TEXT}
          color={ERROR_COLOR}
          mt={2}
          display="block"
          textAlign={ALIGN_CENTER}
        >
          {QR_PAY_NOTE}
        </Typography>

        <Box display="flex" alignItems={ALIGN_CENTER} my={3}>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography variant="body2" mx={2} color="text.secondary">
            {OR}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Box display="flex" justifyContent={ALIGN_CENTER}>
          <Button
            variant={VARIANT_BUTTON}
            color={PRIMARY_COLOR}
            onClick={() =>
              handlePayLater({
                userId: user?.userId,
                vehicle,
                fromDate: new Date(fromDate),
                toDate: new Date(toDate),
                status: 0
              })
            }
          >
            {PAY_LATER}
          </Button>
        </Box>

        {/* Lưu ý */}
        <Typography
          variant={VARIANT_TEXT}
          color={ERROR_COLOR}
          mt={2}
          display="block"
          textAlign={ALIGN_CENTER}
        >
          {PAY_LATER_NOTE}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default QRPay
