import React from 'react'
import { Box, Typography } from '@mui/material'
import { styleFooter } from '../shared/styles/Footer'
import { AUTHOR_DESCRIPTION } from '../shared/constant'

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={styleFooter}>
      <Typography variant="body1">
        © {new Date().getFullYear()} {AUTHOR_DESCRIPTION}
      </Typography>
    </Box>
  )
}

export default Footer
