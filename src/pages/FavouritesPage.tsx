import { useEffect, useState } from 'react'
import axios from 'axios'
import { RoutePageLayout, GoogleBooksApiResponse } from '../components'
import { GridBook } from '../components'

const FavouritesPage = () => {
  const [books, setBooks] = useState<GoogleBooksApiResponse[]>([])

  useEffect(() => {
    const favouritesRaw = localStorage.getItem('favourites')
    const favourites = favouritesRaw !== null ? JSON.parse(favouritesRaw) : []

    const fetchBooks = async () => {
      const booksArray: GoogleBooksApiResponse[] = []
      for (const fav of favourites) {
        const address = `https://www.googleapis.com/books/v1/volumes/${fav}`
        const res = await axios.get(address)
        booksArray.push(res.data)
      }
      setBooks(booksArray)
    }

    fetchBooks()
  }, [])

  return (
    <RoutePageLayout>
      {books.map((book) => (
        <GridBook
          key={book.id}
          id={book.id}
          title={book.volumeInfo.title}
          authors={book.volumeInfo.authors}
          publishedDate={book.volumeInfo.publishedDate}
          description={book.volumeInfo.description}
          averageRating={undefined}
          ratingsCount={undefined}
          smallThumbnail={undefined}
        />
      ))}
    </RoutePageLayout>
  )
}

export default FavouritesPage
