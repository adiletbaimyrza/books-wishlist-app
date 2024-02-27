import { useEffect, useState } from 'react'
import {
  RoutePageLayout,
  GoogleBooksApiResponse,
  GridBook,
} from '../components'
import { mapBook } from '../utils/mappers'
import { fetchRecommendedBooks } from '../utils/googleBooksApiService'

const RecommendedPage = () => {
  const [recommended, setRecommended] = useState<GoogleBooksApiResponse[]>([])

  useEffect(() => {
    fetchRecommendedBooks().then((books) => setRecommended(books))
  }, [])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Recommended for you</h1>
      {recommended.length !== 0 ? (
        <div className="searched-books-grid">
          {recommended.map((boo) => {
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

export default RecommendedPage
