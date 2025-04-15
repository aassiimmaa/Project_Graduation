import {
  FONT_WEIGHT_BOLD,
  TEXT_COLOR,
  TEXT_COLOR_WHITE,
  TEXT_ERROR
} from '../constant'

const stylePaperDialog = {
  backgroundColor: TEXT_COLOR_WHITE
}

const styleInputAddCategory = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc' // viền mặc định
    },
    '&:hover fieldset': {
      borderColor: '#aaa' // viền khi hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3190f5' // viền khi focus
    },
    '&.Mui-error fieldset': {
      borderColor: '#d32f2f' // viền khi lỗi
    },
    '&.Mui-error:hover fieldset': {
      borderColor: '#d32f2f' // viền khi lỗi và hover
    }
  },
  '& .MuiInputBase-input': {
    color: '#000' // màu chữ input
  },
  '& .MuiInputLabel-root': {
    color: '#888' // label bình thường
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#3190f5' // label khi focus
  },
  '& .MuiInputLabel-root.Mui-error': {
    color: '#d32f2f' // label khi lỗi
  },
  '& .MuiFormHelperText-root': {
    color: '#d32f2f' // màu chữ lỗi ở dưới
  },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px white inset !important',
    WebkitTextFillColor: '#000',
    caretColor: '#000'
  }
}

const styleContentContainer = { px: 3, pt: 2, pb: 1 }

const styleChooseImageButton = (imageError: boolean) => ({
  borderColor: imageError ? TEXT_ERROR : '#ccc',
  color: imageError ? TEXT_ERROR : TEXT_COLOR,
  '&:hover': {
    borderColor: imageError ? TEXT_ERROR : '#888',
    backgroundColor: 'transparent'
  }
})

const styleDialogActions = { px: 3, pb: 2 }

const stylePreviewImage = {
  maxWidth: '100%',
  maxHeight: 300,
  mt: 1,
  borderRadius: 2,
  border: '1px solid #ccc',
  p: 1,
  backgroundColor: '#fafafa',
  objectFit: 'contain'
}

const styleButtonDialog = {
  color: TEXT_COLOR_WHITE,
  fontWeight: FONT_WEIGHT_BOLD
}

export {
  stylePaperDialog,
  styleInputAddCategory,
  styleContentContainer,
  styleChooseImageButton,
  styleDialogActions,
  stylePreviewImage,
  styleButtonDialog
}
