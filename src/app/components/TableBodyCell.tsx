import { TableCell } from '@mui/material'
import React from 'react'

interface CellProps {
  align?: string
  fontWeight?: string
  color?: string
  children?: React.ReactNode
}

const TableBodyCell = ({ color, fontWeight, align, children }: CellProps) => {
  const styleCell = {
    fontWeight: '0.9rem',
    color: color || '#000',
    ...(align && { textAlign: align }),
    ...(fontWeight && { fontWeight: fontWeight })
  }
  return <TableCell sx={styleCell}>{children}</TableCell>
}

export default TableBodyCell
