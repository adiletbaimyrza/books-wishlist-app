import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: string[] = []

const searchedBooksSlice = createSlice({
  name: 'searchedBooks',
  initialState,
  reducers: {
    updateSearchedBooks: (_, action: PayloadAction<string[]>) => {
      return action.payload
    },
  },
})

export const { updateSearchedBooks } = searchedBooksSlice.actions
export default searchedBooksSlice.reducer
