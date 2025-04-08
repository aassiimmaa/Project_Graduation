import { ALIGN_CENTER, FONT_WEIGHT_BOLD } from '../constant'

const stylePaperContainer = {
  width: 'fit-content',
  maxWidth: '90vw',
  borderRadius: 2,
  px: 4,
  py: 3
}

const styleContentLayout = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: ALIGN_CENTER,
  justifyContent: ALIGN_CENTER,
  gap: 2,
  p: 0
}

const styleAction = { justifyContent: ALIGN_CENTER, gap: 2, p: 2 }

const styleConfirmButton = {
  textTransform: 'none',
  fontWeight: FONT_WEIGHT_BOLD
}

export {
  stylePaperContainer,
  styleContentLayout,
  styleAction,
  styleConfirmButton
}
