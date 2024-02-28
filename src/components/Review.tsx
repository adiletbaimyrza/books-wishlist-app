import { Link } from 'react-router-dom'
import { ReviewProps } from './components.types'

const Review = ({ id, title, review }: ReviewProps) => {
  return (
    <Link to={`/books-wishlist-app/${id}`} className="review-card">
      <h4 className="review-title">{title}</h4>
      <p className="review-text">{review}</p>
    </Link>
  )
}

export default Review
