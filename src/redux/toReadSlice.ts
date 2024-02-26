import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleBooksApiResponse } from '../components'

const initialState: GoogleBooksApiResponse[] = []

const toReadSlice = createSlice({
  name: 'toRead',
  initialState,
  reducers: {
    updateToRead: (_, action: PayloadAction<GoogleBooksApiResponse[]>) => {
      return action.payload
    },
  },
})

export const { updateToRead } = toReadSlice.actions
export default toReadSlice.reducer
