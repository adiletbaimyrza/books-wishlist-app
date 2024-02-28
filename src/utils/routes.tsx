import {
  HomePage,
  NotFoundPage,
  FavouritesPage,
  ToReadPage,
  ReadPage,
  SearchPage,
  SingleBookPage,
  RecommendedPage,
  ReviewsPage,
} from '../pages'
import { Route } from './utils.types'

const routes: Route[] = [
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
]

export default routes
