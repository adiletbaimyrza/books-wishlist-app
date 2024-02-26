import { useEffect, useState } from 'react'
import axios from 'axios'
import { RoutePageLayout, GoogleBooksApiResponse } from '../components'
import { GridBook } from '../components'
import { mapBook } from '../utils/mappers'

const ReadPage = () => {
  const [books, setBooks] = useState<GoogleBooksApiResponse[]>([])

  useEffect(() => {
    const readRaw = localStorage.getItem('read')
    const read = readRaw !== null ? JSON.parse(readRaw) : []

    const fetchBooks = async () => {
      const booksArray: GoogleBooksApiResponse[] = []
      for (const r of read) {
        const address = `https://www.googleapis.com/books/v1/volumes/${r}`
        const res = await axios.get(address)
        booksArray.push(res.data)
      }
      setBooks(booksArray)
    }

    fetchBooks()
  }, [])

  return (
    <RoutePageLayout>
      <h1>Your Read Books</h1>
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

export default ReadPage
