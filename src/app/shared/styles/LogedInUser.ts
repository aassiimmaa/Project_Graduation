//Styles
const styleAvatar = (open: boolean) => ({
  width: 50,
  height: 50,
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
  top: 50
}
export { styleAvatar, styleMenu }
