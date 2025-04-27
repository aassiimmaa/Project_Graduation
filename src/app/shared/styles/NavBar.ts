// Style Navbar

const styleLayOutNavBar = {
  backgroundColor: 'rgb(33, 37, 41)',
  width: '100%',
  height: '70px',
  paddingY: '8px',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000
}

const styleContainer = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const styleNavBarItem = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  '& .navbar_item': {
    position: 'relative',
    textDecoration: 'none',
    fontSize: '1rem',
    color: '#fff',
    transition: 'color 0.3s ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '0%',
      height: '2px',
      bottom: '-4px',
      left: 0,
      backgroundColor: 'rgb(218, 152, 53)',
      transition: 'width 0.3s ease'
    },
    '&:hover': {
      color: 'rgb(218, 152, 53)'
    },
    '&:hover::after': {
      width: '100%'
    }
  }
}

const styleAvatar = (open: boolean) => ({
  transition: 'all 0.3s ease',
  border: !open ? '1px solid transparent' : '1px solid rgba(218, 152, 53, 0.2)',
  boxShadow: !open ? 0 : '0 0 16px 4px rgb(218, 152, 53)',
  '&:hover': {
    cursor: 'pointer',
    border: '1px solid rgba(218, 152, 53, 0.2)',
    boxShadow: '0 0 16px 4px rgb(218, 152, 53)'
  },
  '&:active': {
    transform: 'scale(0.9)',
    border: '1px solid rgba(218, 152, 53, 0.4)',
    boxShadow: '0 0 12px 2px rgb(218, 152, 53)'
  }
})

const styleMenu = {
  top: 48,
  left: 96
}

const styleMenuContainer = {
  px: 2,
  py: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  width: 230
}

const styleMenuAvatar = { width: 42, height: 42 }

export {
  styleLayOutNavBar,
  styleContainer,
  styleNavBarItem,
  styleAvatar,
  styleMenu,
  styleMenuContainer,
  styleMenuAvatar
}
