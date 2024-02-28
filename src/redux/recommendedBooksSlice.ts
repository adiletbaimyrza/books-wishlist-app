import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleBooksApiResponse } from '../components'

const initialState: GoogleBooksApiResponse[] = []

const recommendedBooksSlice = createSlice({
  name: 'recommendedBooks',
  initialState,
  reducers: {
    updateRecommendedBooks: (
      _,
      action: PayloadAction<GoogleBooksApiResponse[]>
    ) => {
      return action.payload
    },
  },
})

export const { updateRecommendedBooks } = recommendedBooksSlice.actions
export default recommendedBooksSlice.reducer
