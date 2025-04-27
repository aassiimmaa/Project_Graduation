import { TableCell } from '@mui/material'
import React from 'react'
import { CellHeadProps } from '../shared/inteface'
import { FONT_WEIGHT_BOLD, TEXT_COLOR } from '../shared/constant'

const TableHeadCell = ({ width, align, children }: CellHeadProps) => {
  const styleCell = {
    fontWeight: FONT_WEIGHT_BOLD,
    color: {TEXT_COLOR},
    fontSize: '1rem',
    ...(width && { width }),
    ...(align && { textAlign: align })
  }
  return <TableCell sx={styleCell}>{children}</TableCell>
}

export default TableHeadCell
