import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleBooksApiResponse } from '../components'

const initialState: GoogleBooksApiResponse = {}

const singleBookSlice = createSlice({
  name: 'singleBook',
  initialState,
  reducers: {
    updateSingleBook: (_, action: PayloadAction<GoogleBooksApiResponse>) => {
      return action.payload
    },
  },
})

export const { updateSingleBook } = singleBookSlice.actions
export default singleBookSlice.reducer
