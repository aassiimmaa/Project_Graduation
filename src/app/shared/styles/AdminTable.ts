import { Box, styled, TableHead, TableRow } from '@mui/material'
import {
  BACKGROUND_TABLE_HEAD_COLOR,
  FONT_WEIGHT_BOLD,
  TEXT_COLOR,
  W_10
} from '../constant'

//Common styles
export const styleDivider = { mt: 1, mb: 2, backgroundColor: '#ccc' }

export const styleSearchBox = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  pb: 1
}

export const styleSearchTextField = {
  color: '#000',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ddd' },
    '&:hover fieldset': { borderColor: '#007BFF' },
    '&.Mui-focused fieldset': { borderColor: '#007BFF' }
  },
  '& .MuiInputBase-input': {
    caretColor: '#000',
    color: '#000'
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#000',
    opacity: 0.4
  }
}

export const styleSearchButton = {
  width: W_10,
  ml: 1,
  backgroundColor: BACKGROUND_TABLE_HEAD_COLOR,
  fontWeight: FONT_WEIGHT_BOLD
}

export const styleTableContainer = {
  backgroundColor: '#fff',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
}

export const StyledTableHead = styled(TableHead)({
  backgroundColor: BACKGROUND_TABLE_HEAD_COLOR
})

export const StyledTableRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
})

export const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '16px',
  backgroundColor: '#f9f9f9'
})

export const stylePagination = {
  '& .MuiPaginationItem-root': {
    color: TEXT_COLOR
  }
}

export const styleImageContainer = {
  position: 'relative',
  display: 'inline-block',
  '&:hover .hover-icon': {
    opacity: 1
  }
}

export const styleHoverImage = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: 4,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  cursor: 'pointer'
}

export const styleVisibilityIcon = { color: '#fff', fontSize: 24 }

export const styleImageDialog = { width: '100%', height: 'auto' }

export const styleEditButton = {
  color: '#fff',
  backgroundColor: '#ccb100'
}

export const styleBannedButton = {
  color: '#fff',
  backgroundColor: '#ff7700'
}

export const styleDeleteButton = {
  ml: 1,
  color: '#fff',
  backgroundColor: '#d60000'
}
