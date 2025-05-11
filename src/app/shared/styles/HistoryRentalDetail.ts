import { ALIGN_CENTER, FONT_WEIGHT_BOLD, TEXT_COLOR } from '../constant'

const styleInvoiceContainer = {
  maxWidth: 800,
  m: '30px auto',
  p: 3,
  border: '1px solid #ddd',
  borderRadius: 2,
  backgroundColor: '#fff',
  boxShadow: 3,
  position: 'relative'
}

const styleBackBtn = { position: 'absolute', left: 4 }

const styleTableContainer = {
  mt: 3,
  border: '1px solid #ccc',
  borderBottom: 'none',
  '& p,td': { fontSize: 16 }
}

const styleKeyTable = {
  width: '40%',
  borderRight: '1px solid #ccc',
  fontWeight: FONT_WEIGHT_BOLD
}

const styleKeyDetail = { my: 2, fontWeight: FONT_WEIGHT_BOLD }

const styleValueDetail = {
  display: 'inline-block'
}

const styleFooter = {
  textAlign: ALIGN_CENTER,
  mt: 3,
  '& p': {
    color: TEXT_COLOR
  }
}

export {
  styleInvoiceContainer,
  styleBackBtn,
  styleTableContainer,
  styleKeyTable,
  styleKeyDetail,
  styleValueDetail,
  styleFooter
}
