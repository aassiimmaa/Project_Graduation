import { ALIGN_CENTER, TEXT_COLOR_WHITE } from '../constant'

//Styles
const styleLayoutTable = { mt: 12, mb: 6 }

const styleCardContainer = { borderRadius: 3, overflow: 'hidden' }

const styleRowTitle = { backgroundColor: '#E3F2FD' }

const styleTitleTable = {
  p: 3,
  backgroundColor: '#2864c0',
  color: TEXT_COLOR_WHITE,
  textAlign: ALIGN_CENTER
}

const styleHoverRow = {
  transition: '0.3s',
  '&:hover': { backgroundColor: '#a1bcec3d' }
}

const styleActionButtonContainer = {
  display: 'flex',
  gap: 1,
  justifyContent: ALIGN_CENTER
}

const styleActionButton = { textTransform: 'none', fontSize: '0.9rem' }

export {
  styleLayoutTable,
  styleCardContainer,
  styleRowTitle,
  styleTitleTable,
  styleHoverRow,
  styleActionButtonContainer,
  styleActionButton
}
