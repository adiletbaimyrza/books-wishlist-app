import { GoogleBooksApiResponse, GridBookProps } from '../components'

const mapBook = (rawBookObj: GoogleBooksApiResponse) => {
  const vol = rawBookObj.volumeInfo

  const smallThumbnail = vol.imageLinks ? vol.imageLinks.smallThumbnail : ''

  return {
    id: rawBookObj.id,
    title: vol.title,
    authors: vol.authors,
    publishedDate: vol.publishedDate,
    description: vol.description,
    averageRating: vol.averageRating,
    smallThumbnail: smallThumbnail,
  } as GridBookProps
}

export { mapBook }
