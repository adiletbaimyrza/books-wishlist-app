import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateFavourites } from '../redux'
import {
  RoutePageLayout,
  GoogleBooksApiResponse,
  GridBook,
} from '../components'
import { mapBook } from '../utils/mappers'
import { getIdsFromLocalStorageByCollection } from '../utils/localStorageService'
import { fetchSingleBook } from '../utils/googleBooksApiService'

const FavouritesPage = () => {
  const favourites = useSelector((state: RootState) => state.favourites)
  const dispatch = useDispatch()

  useEffect(() => {
    const favourites = getIdsFromLocalStorageByCollection('favourites')

    const fetchBooks = async () => {
      const favouriteBooks: GoogleBooksApiResponse[] = []
      for (const favId of favourites) {
        fetchSingleBook(favId).then((book) => favouriteBooks.push(book))
      }
      dispatch(updateFavourites(favouriteBooks))
    }

    fetchBooks()
  }, [favourites, dispatch])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Your favourites</h1>
      {favourites.length !== 0 ? (
        <div className="searched-books-grid">
          {favourites.map((boo) => {
            const book = mapBook(boo)
            return (
              <GridBook
                key={book.id}
                id={book.id}
                title={book.title}
                authors={book.authors}
                publishedDate={book.publishedDate}
                description={book.description}
                averageRating={book.averageRating}
                smallThumbnail={book.smallThumbnail}
              />
            )
          })}
        </div>
      ) : (
        <div className="no-books">No books in this collection.</div>
      )}
    </RoutePageLayout>
  )
}

export default FavouritesPage
