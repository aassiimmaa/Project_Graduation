import { TableCell } from '@mui/material'
import React from 'react'

interface CellProps {
  width?: string
  align?: string
  children?: React.ReactNode
}

const TableHeadCell = ({ width, align, children }: CellProps) => {
  const styleCell = {
    fontWeight: 600,
    ...(width && { width }),
    ...(align && { textAlign: align })
  }
  return <TableCell sx={styleCell}>{children}</TableCell>
}

export default TableHeadCell
