import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SearchedBookProps } from '../components'

const initialState: SearchedBookProps[] = []

const searchedBooksSlice = createSlice({
  name: 'searchedBooks',
  initialState,
  reducers: {
    updateSearchedBooks: (_, action: PayloadAction<SearchedBookProps[]>) => {
      return action.payload
    },
  },
})

export const { updateSearchedBooks } = searchedBooksSlice.actions
export default searchedBooksSlice.reducer
