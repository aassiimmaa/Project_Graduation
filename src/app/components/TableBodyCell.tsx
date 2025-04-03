import { TableCell } from '@mui/material'
import React from 'react'
import { TEXT_COLOR } from '../shared/constant'

interface CellProps {
  align?: string
  fontWeight?: string
  color?: string
  colSpan?: number
  children?: React.ReactNode
}

const TableBodyCell = ({
  colSpan,
  color,
  fontWeight,
  align,
  children
}: CellProps) => {
  const styleCell = {
    fontWeight: '0.9rem',
    color: color || TEXT_COLOR,
    ...(align && { textAlign: align }),
    ...(fontWeight && { fontWeight: fontWeight })
  }
  return (
    <TableCell colSpan={colSpan || 1} sx={styleCell}>
      {children}
    </TableCell>
  )
}

export default TableBodyCell
