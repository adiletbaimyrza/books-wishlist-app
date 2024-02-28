import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateToRead } from '../redux'
import { RoutePageLayout, GridBook } from '../components'
import {} from '../components'
import { mapBook } from '../utils/mappers'
import storage from '../utils/localStorageService'

const ToReadPage = () => {
  const toRead = useSelector((state: RootState) => state.toRead)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateToRead(storage.getBooks('to read')))
  }, [dispatch])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Your To Read Books</h1>
      {toRead.length !== 0 ? (
        <div className="searched-books-grid">
          {toRead.map((toReadBook) => {
            const book = mapBook(toReadBook)
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
