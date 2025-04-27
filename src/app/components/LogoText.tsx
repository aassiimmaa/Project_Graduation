import { Typography } from '@mui/material'
import React from 'react'
import { LOGO_TEXT } from '../shared/constant'
import { styleLogo } from '../shared/styles/LogoText'

const LogoText = () => {
  return <Typography sx={styleLogo}>{LOGO_TEXT}</Typography>
}

export default LogoText
