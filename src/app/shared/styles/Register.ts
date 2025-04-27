import { ALIGN_CENTER } from "../constant"

const styleRegisterContainer = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: ALIGN_CENTER,
  justifyContent: ALIGN_CENTER
}

const stylePaperRegister = {
  p: 4,
  borderRadius: 3,
  maxWidth: 500,
  width: '100%',
  backgroundColor: 'white'
}

const styleHeaderRegisterForm = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: ALIGN_CENTER
}

export { styleRegisterContainer, stylePaperRegister, styleHeaderRegisterForm }
