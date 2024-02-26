import { Link } from 'react-router-dom'
import { MAX_DESCRIPTION_LENGTH } from '../utils/constants'
import { truncateDescription, undefinedCaseHandler } from '../utils/helpers'
import { GridBookProps } from './components.types'

const GridBook = ({
  id,
  title,
  authors,
  publishedDate,
  description,
  averageRating,
  smallThumbnail,
}: GridBookProps) => {
  const formattedTitle = undefinedCaseHandler(title, 'title')
  const formattedAuthors = undefinedCaseHandler(authors, 'authors')
  const formattedPublishedDate = publishedDate
    ? new Date(publishedDate).getFullYear()
    : 'No published date.'

  let formattedDescription = truncateDescription(
    description,
    MAX_DESCRIPTION_LENGTH
  )
  formattedDescription =
    formattedDescription === undefined
      ? 'No description.'
      : formattedDescription

  const formattedAverageRating = averageRating
    ? `${averageRating} / 5.0`
    : 'No ratings'

  return (
    <Link id={`id-${id}`} className="sb-card" to={`/search/${id}`}>
      <div className="sb-thumbnail-wrapper">
        {smallThumbnail ? (
          <img src={smallThumbnail} className="sb-thumbnail" />
        ) : (
          'No image preview available.'
        )}
      </div>

      <div className="sb-content">
        <h3 className="sb-title">{formattedTitle}</h3>
        <p className="sb-author">{formattedAuthors}</p>
        <p className="sb-description">{formattedDescription}</p>
        <div className="sb-details">
          <p className="sb-rating">{formattedAverageRating}</p>
          <p className="sb-published-date">{formattedPublishedDate}</p>
        </div>
      </div>
    </Link>
  )
}

export default GridBook
