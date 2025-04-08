'use client'
import {
  Avatar,
  Box,
  Container,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import Link from 'next/link'
import {
  AccountCircle,
  Logout,
  ManageHistory,
  SupervisorAccount
} from '@mui/icons-material'
import LogoText from './LogoText'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export function NavBar() {
  const user = localStorage.getItem('user')
  const parsedUser = user ? JSON.parse(user) : null
  const [auth, setAuth] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  useEffect(() => {
    if (parsedUser) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [parsedUser])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //handle login
  const handleLogin = () => {
    router.push('/Login')
  }

  //Logout function
  const handleLogOut = () => {
    localStorage.removeItem('user')
    setAuth(false)
    router.push('/')
  }

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

  const styleAvatar = {
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

  return (
    <Box sx={styleLayOutNavBar}>
      <Container maxWidth="xl" sx={styleContainer}>
        <LogoText />
        <Box sx={styleNavBarItem}>
          <Link className="navbar_item" href="/">
            Trang chủ
          </Link>
          <Link className="navbar_item" href="#Services">
            Dịch vụ
          </Link>
          <Link className="navbar_item" href="#About">
            Giới thiệu
          </Link>
          <Link className="navbar_item" href="#Contact">
            Liên hệ
          </Link>
          <Box component={'span'} sx={{ paddingX: '8px', userSelect: 'none' }}>
            |
          </Box>
          {auth ? (
            <Box sx={{ position: 'relative' }}>
              <Avatar
                alt="Avatar"
                src={parsedUser.image}
                onClick={handleMenu}
                sx={styleAvatar}
              />
              <Menu
                disableScrollLock
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
                <Box sx={styleMenuContainer}>
                  <Avatar
                    alt="User Avatar"
                    src={parsedUser.image}
                    sx={styleMenuAvatar}
                  />
                  <Typography variant="body1" fontWeight="bold">
                    {parsedUser.name}
                  </Typography>
                </Box>

                <Divider />

                <Link href="/Profile">
                  <MenuItem sx={{ mt: 1 }} onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircle fontSize="medium" />
                    </ListItemIcon>
                    <Typography variant="body2">Thông tin cá nhân</Typography>
                  </MenuItem>
                </Link>
                <Link href="/HistoryRental">
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <ManageHistory fontSize="medium" />
                    </ListItemIcon>
                    <Typography variant="body2">Lịch sử thuê xe</Typography>
                  </MenuItem>
                </Link>
                {parsedUser.role && (
                  <Link href="/Admin">
                    <MenuItem sx={{ mb: 1 }} onClick={handleClose}>
                      <ListItemIcon>
                        <SupervisorAccount fontSize="medium" />
                      </ListItemIcon>
                      <Typography variant="body2">Đến trang quản lý</Typography>
                    </MenuItem>
                  </Link>
                )}

                <Divider />

                <MenuItem onClick={handleLogOut} sx={{ color: 'red', mt: 1 }}>
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: 'red' }} />
                  </ListItemIcon>
                  <Typography variant="body2">Đăng xuất</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link href="/Login" onClick={handleLogin}>
              Đăng nhập
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  )
}
