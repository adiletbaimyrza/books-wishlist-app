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
    path: '/books-wishlist-app',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/books-wishlist-app/favourites',
        element: <FavouritesPage />,
      },
      {
        path: '/books-wishlist-app/toread',
        element: <ToReadPage />,
      },
      {
        path: '/books-wishlist-app/read',
        element: <ReadPage />,
      },
      {
        index: true,
        path: '/books-wishlist-app/search',
        element: <SearchPage />,
      },
      {
        path: '/books-wishlist-app/:id',
        element: <SingleBookPage />,
      },
      {
        path: '/books-wishlist-app/featured',
        element: <FeaturedPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
