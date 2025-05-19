import { Box, styled, TableHead, TableRow } from '@mui/material'
import {
  ACCEPT_COLOR_BUTTON,
  BACKGROUND_TABLE_HEAD_COLOR,
  BANNED_COLOR_BUTTON,
  DELETE_COLOR_BUTTON,
  EDIT_COLOR_BUTTON,
  FONT_WEIGHT_BOLD,
  TEXT_COLOR,
  TEXT_COLOR_WHITE
} from '../constant'

//Common styles
export const styleDivider = { mt: 1, mb: 2, backgroundColor: '#ccc' }

export const styleSearchBox = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  pb: 1
}

export const styleChip = { width: 130, color: TEXT_COLOR_WHITE }

export const styleSelectCategory = {
  color: TEXT_COLOR,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ccc' },
    '&:hover fieldset': { borderColor: '#007BFF' },
    '&.Mui-focused fieldset': { borderColor: '#007BFF' }
  },
  '& .MuiInputBase-input': {
    caretColor: TEXT_COLOR,
    color: TEXT_COLOR
  },
  '& .MuiInputLabel-root': {
    color: '#888'
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#007BFF'
  },
  '& .MuiSelect-icon': {
    color: TEXT_COLOR,
    opacity: 0.5
  },
  width: '200px',
  mr: 1
}

export const styleSearchTextField = {
  color: TEXT_COLOR,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ccc' },
    '&:hover fieldset': { borderColor: '#007BFF' },
    '&.Mui-focused fieldset': { borderColor: '#007BFF' }
  },
  '& .MuiInputBase-input': {
    caretColor: TEXT_COLOR,
    color: TEXT_COLOR
  },
  '& .MuiInputBase-input::placeholder': {
    color: TEXT_COLOR,
    opacity: 0.4
  }
}

export const styleSearchButton = {
  width: '180px',
  ml: 1,
  backgroundColor: BACKGROUND_TABLE_HEAD_COLOR,
  fontWeight: FONT_WEIGHT_BOLD
}

export const styleTableContainer = {
  backgroundColor: TEXT_COLOR_WHITE,
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

export const styleImage = {
  borderRadius: '16px'
}

export const styleHoverImage = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '68px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: 4,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  cursor: 'pointer'
}

export const styleVisibilityIcon = { color: TEXT_COLOR_WHITE, fontSize: 24 }

export const styleDialogContainer = {
  '.MuiDialogContent-root': {
    p: 1,
    fontSize: 0
  }
}

export const styleImageDialog = {
  width: '100%',
  height: 'auto',
  borderRadius: 3
}

export const styleEditButton = {
  color: TEXT_COLOR_WHITE,
  backgroundColor: EDIT_COLOR_BUTTON
}

export const styleAcceptButton = {
  mr: 1,
  color: TEXT_COLOR_WHITE,
  backgroundColor: ACCEPT_COLOR_BUTTON
}

export const styleDetailButton = {
  color: TEXT_COLOR_WHITE,
  backgroundColor: '#0062a3'
}

export const styleLocationButton = {
  color: TEXT_COLOR_WHITE,
  backgroundColor: '#bf6300'
}

export const styleBannedButton = {
  color: TEXT_COLOR_WHITE,
  backgroundColor: BANNED_COLOR_BUTTON
}

export const styleDeleteButton = {
  ml: 1,
  color: TEXT_COLOR_WHITE,
  backgroundColor: DELETE_COLOR_BUTTON
}

export const styleButtonContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1
}

//Box inside BoxContainer
export const styleButtonContainerChildren = {
  display: 'flex',
  justifyContent: 'center',
  gap: 1
}

export const styleAvatar = { width: 72, height: 72 }
