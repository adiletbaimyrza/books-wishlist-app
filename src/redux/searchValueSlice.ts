import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: string = ''

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    updateSearchValue: (_, action: PayloadAction<string>) => {
      return action.payload
    },
  },
})

export const { updateSearchValue } = searchValueSlice.actions
export default searchValueSlice.reducer
