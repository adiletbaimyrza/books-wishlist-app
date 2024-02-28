import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleBooksApiResponse } from '../components'

const initialState: GoogleBooksApiResponse[] = []

const searchedBooksSlice = createSlice({
  name: 'searchedBooks',
  initialState,
  reducers: {
    updateSearchedBooks: (
      _,
      action: PayloadAction<GoogleBooksApiResponse[]>
    ) => {
      return action.payload
    },
  },
})

export const { updateSearchedBooks } = searchedBooksSlice.actions
export default searchedBooksSlice.reducer
