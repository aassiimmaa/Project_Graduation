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
import { useRouter } from 'next/navigation'
import { User } from '~/app/shared/inteface'
import { styleAvatar, styleMenu } from '~/app/shared/styles/LogedInUser'
import { BACK_HOME, LOGOUT } from '~/app/shared/constant'

interface UserProps {
  user: User
}

const LogedInUser = (LogIn: UserProps) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

 

  return (
    <Box sx={{ position: 'relative' }}>
      <Avatar
        alt={LogIn.user.name}
        src={LogIn.user.image ?? undefined}
        onClick={handleMenu}
        sx={styleAvatar(open)}
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
            <Typography variant="body2">{BACK_HOME}</Typography>
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={handleLogOut} sx={{ color: 'red', mt: 1 }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: 'red' }} />
          </ListItemIcon>
          <Typography variant="body2">{LOGOUT}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default LogedInUser
