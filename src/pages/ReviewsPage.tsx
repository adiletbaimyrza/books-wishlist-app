import { useEffect } from 'react'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavourites, updateRead, updateToRead } from '../redux'
import { GoogleBooksApiResponse, RoutePageLayout, Review } from '../components'
import { getBooksFromLocalStorage } from '../utils/localStorageService'

const ReviewsPage = () => {
  const favourites = useSelector((state: RootState) => state.favourites)
  const toRead = useSelector((state: RootState) => state.toRead)
  const read = useSelector((state: RootState) => state.read)

  const dispatch = useDispatch()

  const allBooks: GoogleBooksApiResponse[] = [...favourites, ...toRead, ...read]
  const booksWithReviews = allBooks.filter((book) => book.review !== null)

  useEffect(() => {
    dispatch(updateFavourites(getBooksFromLocalStorage('favourites')))
    dispatch(updateToRead(getBooksFromLocalStorage('to read')))
    dispatch(updateRead(getBooksFromLocalStorage('read')))
  }, [dispatch])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Your Reviews</h1>
      {booksWithReviews.length > 0 ? (
        booksWithReviews.map((book, index) => (
          <Review
            key={index}
            id={book.id as string}
            title={book.volumeInfo?.title as string}
            review={book.review as string}
          />
        ))
      ) : (
        <div className="no-books">No reviews found</div>
      )}
    </RoutePageLayout>
  )
}

export default ReviewsPage
