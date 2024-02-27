import axios from 'axios'
import { MAX_ITEMS_PER_REQUEST } from './constants'
import { GoogleBooksApiResponse } from '../components'

type FetchBooksParams = {
  author: string | undefined
  title: string | undefined
  sortBy: string | undefined
  onlyFreeBooks: boolean | undefined
  q: string
}

const fetchBooksWithParams = async ({
  author,
  title,
  sortBy,
  onlyFreeBooks,
  q,
}: FetchBooksParams): Promise<GoogleBooksApiResponse[]> => {
  const getRequest = `https://www.googleapis.com/books/v1/volumes?q=${q}${
    author ? `+inauthor:${author}` : ''
  }${title ? `+intitle:${title}` : ''}${
    onlyFreeBooks ? '&filter=free-ebooks' : ''
  }${sortBy ? `&orderBy=${sortBy}` : ''}&maxResults=${MAX_ITEMS_PER_REQUEST}`

  const res = await axios.get(getRequest)

  return res.data.items
}

const fetchRecommendedBooks = async (): Promise<GoogleBooksApiResponse[]> => {
  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=${MAX_ITEMS_PER_REQUEST}`
  )

  return res.data.items
}

const fetchSingleBook = async (id: string): Promise<GoogleBooksApiResponse> => {
  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  )

  return res.data
}

export { fetchBooksWithParams, fetchRecommendedBooks, fetchSingleBook }
