import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { RoutePageLayout, GridBook } from '../components'
import { mapBook } from '../utils/mappers'
import { fetchRecommendedBooks } from '../utils/googleBooksApiService'
import { updateRecommendedBooks } from '../redux'

const RecommendedPage = () => {
  const recommendedBooks = useSelector(
    (state: RootState) => state.recommendedBooks
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (recommendedBooks.length === 0) {
      fetchRecommendedBooks().then((fetchedBooks) =>
        dispatch(updateRecommendedBooks(fetchedBooks))
      )
    }
  }, [dispatch, recommendedBooks.length])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Recommended for you</h1>
      {recommendedBooks.length !== 0 ? (
        <div className="searched-books-grid">
          {recommendedBooks.map((recommendedBook) => {
            const book = mapBook(recommendedBook)
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

export default RecommendedPage
