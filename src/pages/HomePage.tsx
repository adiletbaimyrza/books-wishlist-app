import { RoutePageLayout } from '../components'
import { cover, screenshot, openBook, globe, phone, comment } from '../assets'

const HomePage = () => {
  return (
    <RoutePageLayout>
      <div className="small-frame">
        <div className="hero">
          <div className="hero-text">
            <h1>Welcome to Books Wishlist</h1>
            <p>
              Search for books, utilize collections, write reviews, and more
              from your local library for free! Books Wishlist is a your books
              management tool that helps you keep track of your readings!
            </p>
            <div className="action-buttons">
              <button>Load Demo Data</button>
              <button>Dive in</button>
            </div>
          </div>
          <img className="screenshot-image" src={screenshot}></img>
        </div>
        <img className="cover-image" src={cover}></img>
        <div className="features">
          <h1 className="features-title">Features</h1>
          <div className="features-grid">
            <div className="features-grid-item">
              <img src={openBook} className="features-svg"></img>
              <h3>Collections</h3>
              <p>
                Utilize collections to keep track of your readings and manage
                your books across collections. You can add books to favourites,
                or to the read collection.
              </p>
            </div>
            <div className="features-grid-item">
              <img src={globe} className="features-svg"></img>
              <h3>Million+ books</h3>
              <p>
                Search for million+ books with the Google Books API, you can
                search for paid and free books, and sort them by relevance or
                newest.
              </p>
            </div>
            <div className="features-grid-item">
              <img src={comment} className="features-svg"></img>
              <h3>Add Reviews</h3>
              <p>
                Add your own reviews, and store them locally, you can add
                reviews edit and delete them.
              </p>
            </div>
            <div className="features-grid-item">
              <img src={phone} className="features-svg"></img>
              <h3>Responsive</h3>
              <p>
                You can use this app across all your devices, since it is
                responsive and the experience is pleasurable everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </RoutePageLayout>
  )
}

export default HomePage
