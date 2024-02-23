import {
  FavouritesPage,
  HomePage,
  ReadPage,
  ToReadPage,
  NotFoundPage,
  SearchPage,
} from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/favourites',
        element: <FavouritesPage />,
      },
      {
        path: '/toread',
        element: <ToReadPage />,
      },
      {
        path: '/read',
        element: <ReadPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
