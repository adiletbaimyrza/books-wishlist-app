import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateFavourites } from '../redux'
import axios from 'axios'
import {
  RoutePageLayout,
  GoogleBooksApiResponse,
  GridBook,
} from '../components'
import { mapBook } from '../utils/mappers'

const FavouritesPage = () => {
  const favourites = useSelector((state: RootState) => state.favourites)
  const dispatch = useDispatch()

  useEffect(() => {
    const favouritesRaw = localStorage.getItem('favourites')
    const favourites = favouritesRaw !== null ? JSON.parse(favouritesRaw) : []

    const fetchBooks = async () => {
      const favouriteBooks: GoogleBooksApiResponse[] = []
      for (const favId of favourites) {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${favId}`
        )
        favouriteBooks.push(res.data)
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
