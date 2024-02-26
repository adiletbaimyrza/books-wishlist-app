import { useEffect, useState } from 'react'
import axios from 'axios'
import { RoutePageLayout, GoogleBooksApiResponse } from '../components'
import { GridBook } from '../components'
import { mapBook } from '../utils/mappers'

const ToReadPage = () => {
  const [books, setBooks] = useState<GoogleBooksApiResponse[]>([])

  useEffect(() => {
    const toReadRaw = localStorage.getItem('to read')
    const toRead = toReadRaw !== null ? JSON.parse(toReadRaw) : []

    const fetchBooks = async () => {
      const booksArray: GoogleBooksApiResponse[] = []
      for (const t of toRead) {
        const address = `https://www.googleapis.com/books/v1/volumes/${t}`
        const res = await axios.get(address)
        booksArray.push(res.data)
      }
      setBooks(booksArray)
    }

    fetchBooks()
  }, [])

  return (
    <RoutePageLayout>
      <h1>Your To Read Books</h1>
      <div className="searched-books-grid">
        {books.map((boo) => {
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
    </RoutePageLayout>
  )
}

export default ToReadPage
