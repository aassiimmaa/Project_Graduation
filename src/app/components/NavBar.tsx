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
import {
  styleAvatar,
  styleContainer,
  styleLayOutNavBar,
  styleMenu,
  styleMenuAvatar,
  styleMenuContainer,
  styleNavBarItem
} from '../shared/styles/NavBar'
import {
  CONTACT,
  FONT_WEIGHT_BOLD,
  GO_TO_ADMIN_PAGE,
  HISTORY_RENTAL,
  HOMEPAGE,
  INTRODUCE,
  LOGIN,
  LOGOUT,
  PERSONAL_INFORMATION,
  SERVICE
} from '../shared/constant'

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

  return (
    <Box sx={styleLayOutNavBar}>
      <Container maxWidth="xl" sx={styleContainer}>
        <LogoText />
        <Box sx={styleNavBarItem}>
          <Link className="navbar_item" href="/">
            {HOMEPAGE}
          </Link>
          <Link className="navbar_item" href="#Services">
            {SERVICE}
          </Link>
          <Link className="navbar_item" href="#About">
            {INTRODUCE}
          </Link>
          <Link className="navbar_item" href="#Contact">
            {CONTACT}
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
                sx={styleAvatar(open)}
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
                  <Typography variant="body1" fontWeight={FONT_WEIGHT_BOLD}>
                    {parsedUser.name}
                  </Typography>
                </Box>

                <Divider />

                <Link href="/Profile">
                  <MenuItem sx={{ mt: 1 }} onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircle fontSize="medium" />
                    </ListItemIcon>
                    <Typography variant="body2">
                      {PERSONAL_INFORMATION}
                    </Typography>
                  </MenuItem>
                </Link>
                <Link href="/HistoryRental">
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <ManageHistory fontSize="medium" />
                    </ListItemIcon>
                    <Typography variant="body2">{HISTORY_RENTAL}</Typography>
                  </MenuItem>
                </Link>
                {parsedUser.role && (
                  <Link href="/Admin">
                    <MenuItem sx={{ mb: 1 }} onClick={handleClose}>
                      <ListItemIcon>
                        <SupervisorAccount fontSize="medium" />
                      </ListItemIcon>
                      <Typography variant="body2">
                        {GO_TO_ADMIN_PAGE}
                      </Typography>
                    </MenuItem>
                  </Link>
                )}

                <Divider />

                <MenuItem onClick={handleLogOut} sx={{ color: 'red', mt: 1 }}>
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: 'red' }} />
                  </ListItemIcon>
                  <Typography variant="body2">{LOGOUT}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link href="/Login" onClick={handleLogin}>
              {LOGIN}
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  )
}
