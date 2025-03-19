'use client'
import {
  Avatar,
  Box,
  Container,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'

export function NavBar() {
  const [auth, setAuth] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //fake handle login
  const handleLogin = () => {
    setAuth(!auth)
  }

  // Style Navbar

  const styleLayOutNavBar = {
    backgroundColor: 'rgb(33, 37, 41)',
    width: '100%',
    height: '70px',
    paddingY: '8px',
    position: 'fixed',
    top:0,
    left: 0,
    zIndex: 1000
  }

  const styleContainer = {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const styleLogo = {
    fontSize: '2.2rem',
    fontWeight: 700,
    fontFamily: 'monospace',
    letterSpacing: '0.05rem',
    background: 'linear-gradient(90deg,rgb(255, 115, 0),rgb(59, 148, 238))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    userSelect: 'none'
  }

  const styleNavBarItem = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& a': {
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
    left: 75
  }

  return (
    <Box sx={styleLayOutNavBar}>
      <Container maxWidth="xl" sx={styleContainer}>
        <Typography sx={styleLogo}>ANRENTAL</Typography>
        <Box sx={styleNavBarItem}>
          <Link href="/">Trang chủ</Link>
          <Link href="#Services">Dịch vụ</Link>
          <Link href="#About">Giới thiệu</Link>
          <Link href="#Contact">Liên hệ</Link>
          <Box component={'span'} sx={{ paddingX: '8px', userSelect: 'none' }}>
            |
          </Box>
          {auth ? (
            <Box sx={{ position: 'relative' }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogin}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link href="#" onClick={handleLogin}>
              Đăng nhập
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  )
}
