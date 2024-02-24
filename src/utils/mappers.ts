import { SearchedBookProps } from '../components'

const mapBook = (rawBookObj: any) => {
  const vol = rawBookObj.volumeInfo

  const smallThumbnail = vol.imageLinks ? vol.imageLinks.smallThumbnail : ''

  return {
    id: rawBookObj.id,
    title: vol.title,
    authors: vol.authors,
    publishedDate: vol.publishedDate,
    description: vol.description,
    averageRating: vol.averageRating,
    ratingsCount: vol.ratingsCount,
    smallThumbnail: smallThumbnail,
  } as SearchedBookProps
}

export { mapBook }
