// Styles
const styleCard = {
  width: 340,
  borderRadius: '12px',
  overflow: 'hidden',
  fontSize: 0,
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  position: 'relative',
  transition: 'all 0.4s ease-in-out'
}

const styleOverlay = {
  padding: 2,
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff'
}

const styleUnchosenCard = {
  ...styleCard,
  '&:hover': {
    transform: 'translateY(-15px) scale(1.03)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)'
  },
  '&:hover .image': {
    transform: 'scale(1.1)'
  },
  '&:hover .overlay': {
    opacity: 1
  }
}

const styleChosenCard = {
  ...styleCard,
  transform: 'translateY(-15px) scale(1.03)',
  boxShadow: '0 0 15px 10px rgba(218, 152, 53, 0.8)',
  '& .image': {
    transform: 'scale(1.1)'
  }
}

const styleImage = {
  transition: 'transform 0.4s ease-in-out'
}

export {
  styleCard,
  styleOverlay,
  styleUnchosenCard,
  styleChosenCard,
  styleImage
}
