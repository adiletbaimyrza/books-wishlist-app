import { useEffect } from 'react'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavourites, updateRead, updateToRead } from '../redux'
import { GoogleBooksApiResponse, RoutePageLayout, Review } from '../components'
import storage from '../utils/localStorageService'

const ReviewsPage = () => {
  const favourites = useSelector((state: RootState) => state.favourites)
  const toRead = useSelector((state: RootState) => state.toRead)
  const read = useSelector((state: RootState) => state.read)

  const dispatch = useDispatch()

  const allBooks: GoogleBooksApiResponse[] = [...favourites, ...toRead, ...read]
  const booksWithReviews = allBooks.filter((book) => book.review !== undefined)

  useEffect(() => {
    dispatch(updateFavourites(storage.getBooks('favourites')))
    dispatch(updateToRead(storage.getBooks('to read')))
    dispatch(updateRead(storage.getBooks('read')))
  }, [dispatch])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Your Reviews</h1>
      {booksWithReviews.length > 0 ? (
        booksWithReviews.map((book, index) => (
          <Review key={index} book={book} />
        ))
      ) : (
        <div className="no-books">No reviews found</div>
      )}
    </RoutePageLayout>
  )
}

export default ReviewsPage
