import { configureStore } from '@reduxjs/toolkit'
import searchedBooksReducer from './searchedBooksSlice'
import searchValueReducer from './searchValueSlice'

export const store = configureStore({
  reducer: {
    searchedBooks: searchedBooksReducer,
    searchValue: searchValueReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
