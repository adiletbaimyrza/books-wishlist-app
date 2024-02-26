import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: string[] = []

const readSlice = createSlice({
  name: 'read',
  initialState,
  reducers: {
    updateRead: (_, action: PayloadAction<string[]>) => {
      return action.payload
    },
  },
})

export const { updateRead } = readSlice.actions
export default readSlice.reducer
