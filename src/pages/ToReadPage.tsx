import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateToRead } from '../redux'
import {
  RoutePageLayout,
  GoogleBooksApiResponse,
  GridBook,
} from '../components'
import {} from '../components'
import { mapBook } from '../utils/mappers'
import { getBooksFromLocalStorageByCollection } from '../utils/localStorageService'
import { fetchSingleBook } from '../utils/googleBooksApiService'

const ToReadPage = () => {
  const toRead = useSelector((state: RootState) => state.toRead)
  const dispatch = useDispatch()

  useEffect(() => {
    const toRead = getBooksFromLocalStorageByCollection('to read')

    const fetchBooks = async () => {
      const toReadBooks: GoogleBooksApiResponse[] = []
      for (const t of toRead) {
        const book = await fetchSingleBook(t.id as string)
        toReadBooks.push(book)
      }
      dispatch(updateToRead(toReadBooks))
    }

    fetchBooks()
  }, [dispatch])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Your To Read Books</h1>
      {toRead.length !== 0 ? (
        <div className="searched-books-grid">
          {toRead.map((tore) => {
            const book = mapBook(tore)
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

export default ToReadPage
