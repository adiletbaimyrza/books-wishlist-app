import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: string[] = []

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    updateFavourites: (_, action: PayloadAction<string[]>) => {
      return action.payload
    },
  },
})

export const { updateFavourites } = favouritesSlice.actions
export default favouritesSlice.reducer
