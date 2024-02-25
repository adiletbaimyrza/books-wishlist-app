import {
  FavouritesPage,
  HomePage,
  ReadPage,
  ToReadPage,
  NotFoundPage,
  SearchPage,
  SingleBookPage,
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
      {
        path: '/search/:id',
        element: <SingleBookPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
