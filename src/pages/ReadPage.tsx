import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateRead } from '../redux'
import { RoutePageLayout, GridBook } from '../components'
import { mapBook } from '../utils/mappers'
import storage from '../utils/localStorageService'

const ReadPage = () => {
  const read = useSelector((state: RootState) => state.read)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateRead(storage.getBooks('read')))
  }, [dispatch])

  return (
    <RoutePageLayout>
      <h1 className="grand-title">Your Read Books</h1>
      {read.length !== 0 ? (
        <div className="searched-books-grid">
          {read.map((readBook) => {
            const book = mapBook(readBook)
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
