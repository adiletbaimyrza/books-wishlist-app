import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateRead } from '../redux'
import {
  RoutePageLayout,
  GoogleBooksApiResponse,
  GridBook,
} from '../components'
import { mapBook } from '../utils/mappers'
import { getBooksFromLocalStorageByCollection } from '../utils/localStorageService'
import { fetchSingleBook } from '../utils/googleBooksApiService'

const ReadPage = () => {
  const read = useSelector((state: RootState) => state.read)
  const dispatch = useDispatch()

  useEffect(() => {
    const read = getBooksFromLocalStorageByCollection('read')

    const fetchBooks = async () => {
      const readBooks: GoogleBooksApiResponse[] = []
      for (const r of read) {
        const book = await fetchSingleBook(r.id as string)
        readBooks.push(book)
      }
      dispatch(updateRead(readBooks))
    }

    fetchBooks()
  }, [dispatch])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Your Read Books</h1>
      {read.length !== 0 ? (
        <div className="searched-books-grid">
          {read.map((re) => {
            const book = mapBook(re)
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

export default ReadPage
