//Styles
const styleTitle = { mt: 8, mb: 4 }

const styleCardVehicle = {
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer'
  }
}

const styleTitleOverflow = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%'
}

const styleImage = {
  objectFit: 'contain'
}

export { styleTitle, styleCardVehicle, styleTitleOverflow, styleImage }
