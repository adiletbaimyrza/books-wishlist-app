import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateFavourites } from '../redux'
import { RoutePageLayout, GridBook } from '../components'
import { mapBook } from '../utils/mappers'
import { getBooksFromLocalStorage } from '../utils/localStorageService'

const FavouritesPage = () => {
  const favourites = useSelector((state: RootState) => state.favourites)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateFavourites(getBooksFromLocalStorage('favourites')))
  }, [dispatch])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Your favourites</h1>
      {favourites.length !== 0 ? (
        <div className="searched-books-grid">
          {favourites.map((favouriteBook) => {
            const book = mapBook(favouriteBook)
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
