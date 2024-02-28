import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { GoogleBooksApiResponse, RoutePageLayout } from '../components'

const ReviewsPage = () => {
  const favourites = useSelector((state: RootState) => state.favourites)
  const toRead = useSelector((state: RootState) => state.toRead)
  const read = useSelector((state: RootState) => state.read)

  const allBooks: GoogleBooksApiResponse[] = [...favourites, ...toRead, ...read]
  const booksWithReviews = allBooks.filter((book) => book.review !== null)

  return (
    <RoutePageLayout>
      {booksWithReviews.map((book, index) => (
        <p key={index}>{book.review}</p>
      ))}
    </RoutePageLayout>
  )
}

export default ReviewsPage
