// store/features/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CategoryState {
  selectedCategoryId: string | null
}

const initialState: CategoryState = {
  selectedCategoryId: null
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload
    },
    clearSelectedCategoryId: (state) => {
      state.selectedCategoryId = null
    }
  }
})

export const { setSelectedCategoryId, clearSelectedCategoryId } = categorySlice.actions
export default categorySlice.reducer
