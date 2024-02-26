import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GridBookProps } from '../components'

const initialState: GridBookProps[] = []

const GridBooksSlice = createSlice({
  name: 'GridBooks',
  initialState,
  reducers: {
    updateGridBooks: (_, action: PayloadAction<GridBookProps[]>) => {
      return action.payload
    },
  },
})

export const { updateGridBooks } = GridBooksSlice.actions
export default GridBooksSlice.reducer
