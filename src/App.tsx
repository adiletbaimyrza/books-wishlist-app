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
import FeaturedPage from './pages/FeaturedPage'

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
        index: true,
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/:id',
        element: <SingleBookPage />,
      },
      {
        path: '/featured',
        element: <FeaturedPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
