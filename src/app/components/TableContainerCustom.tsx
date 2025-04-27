import { TableContainer } from '@mui/material'
import React from 'react'

const styleTableContainer = {
//   backgroundColor: '#fff',
//   color: '#000'
}

const TableContainerCustom: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <TableContainer sx={styleTableContainer}>
      {children}
    </TableContainer>
  )
}

export default TableContainerCustom
