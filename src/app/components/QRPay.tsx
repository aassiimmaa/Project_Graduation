import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  Divider,
  Box
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
  QR_TITLE,
  STORAGE_DATA_USER,
  TO_DATE,
  VARIANT_BUTTON,
  VARIANT_TEXT,
  VEHICLE_NAME
} from '../shared/constant'
import { RentVehicle } from '~/actions/order.action'
import toast from 'react-hot-toast'

const handlePayLater = async ({userId, vehicle, fromDate, toDate, status}: payLaterProps) => {
  const res = await RentVehicle(userId, vehicle, fromDate, toDate, status)
  if (res.success){
    toast.success(res.message)
    window.location.href = '/HistoryRental'
  } else{
    toast.error(res.message)
  }
}

const user = JSON.parse(localStorage.getItem(STORAGE_DATA_USER) || '{}')

const QRPay = ({ openQR, closeQR, vehicle, fromDate, toDate }: QRProps) => {

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

        <Image src="/uploads/QR-Pay.png" alt="QR" width={256} height={256} />

        <Typography mt={2}>
          {`${VEHICLE_NAME}:`} <strong>{vehicle?.vehicleName}</strong>
          <br />
          {`${FROM_DATE}:`} {fromDate} - {`${TO_DATE}:`} {toDate}
        </Typography>

        <Box display="flex" alignItems={ALIGN_CENTER} my={3}>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography variant="body2" mx={2} color="text.secondary">
            {OR}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Box display="flex" justifyContent={ALIGN_CENTER}>
          <Button variant={VARIANT_BUTTON} color={PRIMARY_COLOR} onClick={() => handlePayLater({ userId: user.id, vehicle, fromDate: new Date(fromDate), toDate: new Date(toDate), status: 0 })}>
            {PAY_LATER}
          </Button>
        </Box>

        {/* Lưu ý */}
        <Typography variant={VARIANT_TEXT} color={ERROR_COLOR} mt={2} display="block" textAlign={ALIGN_CENTER}>
          {PAY_LATER_NOTE}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default QRPay
