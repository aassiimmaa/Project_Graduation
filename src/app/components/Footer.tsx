import React from 'react'
import { Box, Typography } from '@mui/material'

//Style
const styleFooter = {
  backgroundColor: 'rgb(33, 37, 41)',
  color: '#fff',
  textAlign: 'center',
  py: 2,
  width: '100%',
}

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={styleFooter}>
      <Typography variant="body1">
        © {new Date().getFullYear()} AnRental. Bảo lưu mọi quyền.
      </Typography>
    </Box>
  )
}

export default Footer
