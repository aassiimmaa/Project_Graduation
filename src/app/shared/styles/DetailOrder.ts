import {
  FONT_WEIGHT_BOLD,
  TEXT_COLOR,
  TEXT_COLOR_WHITE,
  TEXT_TRANSFORM
} from '../constant'

const styleDialogContainer = {
  '.MuiDialog-paper': {
    backgroundColor: '#FFF',
    color: TEXT_COLOR,
    p: 2
  }
}

const styleDivider = { backgroundColor: '#ccc', mx: 2 }

const styleTableHead = {
  backgroundColor: '#f0f0f0',
  th: {
    outline: 'none',
    color: TEXT_COLOR
  }
}

const styleTableBody = {
  backgroundColor: '#fff',
  td: {
    color: TEXT_COLOR
  }
}

const styleTitleInvoice = { textTransform: TEXT_TRANSFORM }

const styleImage = {
  height: 100,
  width: 'auto'
}

const styleDialogActions = {
  px: 3,
  pb: 2,
  justifyContent: 'flex-end',
  '& > button': {
    minWidth: 120,
    fontSize: '0.95rem',
    fontWeight: FONT_WEIGHT_BOLD,
    color: TEXT_COLOR_WHITE
  }
}

export {
  styleDialogContainer,
  styleDivider,
  styleTableHead,
  styleTableBody,
  styleTitleInvoice,
  styleImage,
  styleDialogActions
}
