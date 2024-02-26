import { configureStore } from '@reduxjs/toolkit'
import GridBooksReducer from './gridBookSlice'
import searchValueReducer from './searchValueSlice'
import singleBookReducer from './singleBookSlice'
import favouritesReducer from './favouritesSlice'
import readReducer from './readSlice'
import toReadReducer from './toReadSlice'

export const store = configureStore({
  reducer: {
    GridBooks: GridBooksReducer,
    searchValue: searchValueReducer,
    singleBook: singleBookReducer,
    favourites: favouritesReducer,
    read: readReducer,
    toRead: toReadReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
