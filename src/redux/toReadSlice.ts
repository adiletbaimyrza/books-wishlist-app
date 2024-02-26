import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: string[] = []

const toReadSlice = createSlice({
  name: 'toRead',
  initialState,
  reducers: {
    updateToRead: (_, action: PayloadAction<string[]>) => {
      return action.payload
    },
  },
})

export const { updateToRead } = toReadSlice.actions
export default toReadSlice.reducer
