import {
  FavouritesPage,
  HomePage,
  ReadPage,
  ToReadPage,
  NotFoundPage,
  SearchPage,
  SingleBookPage,
  ReviewsPage,
} from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RecommendedPage from './pages/RecommendedPage'

const router = createBrowserRouter([
  {
    path: '/books-wishlist-app/home',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/books-wishlist-app/favourites/',
    element: <FavouritesPage />,
  },
  {
    path: '/books-wishlist-app/toread/',
    element: <ToReadPage />,
  },
  {
    path: '/books-wishlist-app/read/',
    element: <ReadPage />,
  },
  {
    index: true,
    path: '/books-wishlist-app/search/',
    element: <SearchPage />,
  },
  {
    path: '/books-wishlist-app/:id/',
    element: <SingleBookPage />,
  },
  {
    path: '/books-wishlist-app/recommended/',
    element: <RecommendedPage />,
  },
  {
    path: '/books-wishlist-app/reviews/',
    element: <ReviewsPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
