import { RoutePageLayout } from '../components'
import { cover, screenshot } from '../assets'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <RoutePageLayout>
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to Books Wishlist</h1>
          <p>
            Search for books, utilize collections, write reviews, and more from
            your local library for free! Books Wishlist is a your books
            management tool that helps you keep track of your readings!
          </p>
          <div className="action-buttons">
            <Link to={'/books-wishlist-app/search'}>
              <button>Dive in</button>
            </Link>
          </div>
        </div>
        <img className="screenshot-image" src={screenshot}></img>
      </div>
      <img className="cover-image" src={cover}></img>
    </RoutePageLayout>
  )
}

export default HomePage
