import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { Reply, Logout } from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'

const styleMenuAvatar = { width: 42, height: 42 }

const LogedInUser = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //Styles
  const styleAvatar = {
    width: 50,
    height: 50,
    transition: 'all 0.3s ease',
    border: !open
      ? '1px solid transparent'
      : '1px solid rgba(218, 152, 53, 0.2)',
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
  }

  const styleMenu = {
    top: 50
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        onClick={handleMenu}
        sx={styleAvatar}
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={styleMenu}
        container={document.getElementById('menu-appbar')!}
        disablePortal
      >
        <Link href="/">
          <MenuItem sx={{ mb: 1 }} onClick={handleClose}>
            <ListItemIcon>
              <Reply fontSize="medium" />
            </ListItemIcon>
            <Typography variant="body2">Quay lại trang chủ</Typography>
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={handleClose} sx={{ color: 'red', mt: 1 }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: 'red' }} />
          </ListItemIcon>
          <Typography variant="body2">Đăng xuất</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default LogedInUser
