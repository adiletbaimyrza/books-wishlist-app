import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleBooksApiResponse } from '../components'

const initialState: GoogleBooksApiResponse[] = []

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    updateFavourites: (_, action: PayloadAction<GoogleBooksApiResponse[]>) => {
      return action.payload
    },
  },
})

export const { updateFavourites } = favouritesSlice.actions
export default favouritesSlice.reducer
