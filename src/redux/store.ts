import { configureStore } from '@reduxjs/toolkit'
import searchedBooksReducer from './searchedBooksSlice'
import searchValueReducer from './searchValueSlice'
import recommendedBooksReducer from './recommendedBooksSlice'
import favouritesReducer from './favouritesSlice'
import readReducer from './readSlice'
import toReadReducer from './toReadSlice'

export const store = configureStore({
  reducer: {
    searchedBooks: searchedBooksReducer,
    searchValue: searchValueReducer,
    recommendedBooks: recommendedBooksReducer,
    favourites: favouritesReducer,
    read: readReducer,
    toRead: toReadReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
