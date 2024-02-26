import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateToRead } from '../redux'
import axios from 'axios'
import {
  RoutePageLayout,
  GoogleBooksApiResponse,
  GridBook,
} from '../components'
import {} from '../components'
import { mapBook } from '../utils/mappers'

const ToReadPage = () => {
  const toRead = useSelector((state: RootState) => state.toRead)
  const dispatch = useDispatch()

  useEffect(() => {
    const toReadRaw = localStorage.getItem('to read')
    const toRead = toReadRaw !== null ? JSON.parse(toReadRaw) : []

    const fetchBooks = async () => {
      const toReadBooks: GoogleBooksApiResponse[] = []
      for (const t of toRead) {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${t}`
        )
        toReadBooks.push(res.data)
      }
      dispatch(updateToRead(toReadBooks))
    }

    fetchBooks()
  }, [toRead, dispatch])

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
