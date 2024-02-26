import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleBooksApiResponse } from '../components'

const initialState: GoogleBooksApiResponse[] = []

const readSlice = createSlice({
  name: 'read',
  initialState,
  reducers: {
    updateRead: (_, action: PayloadAction<GoogleBooksApiResponse[]>) => {
      return action.payload
    },
  },
})

export const { updateRead } = readSlice.actions
export default readSlice.reducer
