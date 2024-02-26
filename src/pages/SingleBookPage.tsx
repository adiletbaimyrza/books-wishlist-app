import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { updateSingleBook } from '../redux'
import { RootState } from '../redux/store'
import { RoutePageLayout } from '../components'

const SingleBookPage = () => {
  const [selectedOption, setSelectedOption] = useState('favourites')
  const singleBook = useSelector((state: RootState) => state.singleBook)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    const address = `https://www.googleapis.com/books/v1/volumes/${id}`

    axios
      .get(address)
      .then((res) => dispatch(updateSingleBook(res.data)))
      .catch((err) => console.error(err))
  }, [id, dispatch])

  const addToCollections = () => {
    const collectionsRaw: string | null = localStorage.getItem(selectedOption)
    const collections: string[] =
      collectionsRaw !== null ? JSON.parse(collectionsRaw) : []
    if (id) {
      if (!collections.find((collectionId) => collectionId === id)) {
        collections.push(id)
      }
    }
    localStorage.setItem(selectedOption, JSON.stringify(collections))
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const formattedTitle = singleBook.volumeInfo
    ? singleBook.volumeInfo.title
    : 'No title.'

  const formattedAuthors =
    singleBook.volumeInfo && singleBook.volumeInfo.authors
      ? singleBook.volumeInfo?.authors.join(', ')
      : 'No authors.'

  const formattedPublishedDate =
    singleBook.volumeInfo && singleBook.volumeInfo.publishedDate
      ? new Date(singleBook.volumeInfo?.publishedDate).getFullYear()
      : 'No published date.'

  const formattedPublisher = singleBook.volumeInfo
    ? singleBook.volumeInfo.publisher
    : 'No publishers.'

  const formattedRating = singleBook.averageRating
    ? `${singleBook.averageRating} / 5.0`
    : 'No ratings.'

  return (
    <RoutePageLayout>
      <div className="sbp-main">
        <div className="sbp-main-info">
          <div className="sbp-title">{formattedTitle}</div>
          <div className="sbp-author">{formattedAuthors}</div>
          <div className="sbp-publish-info">
            <div className="sbp-publishedDate">{formattedPublishedDate}</div>
            <div className="sbp-publisher">{formattedPublisher}</div>
          </div>
          <div className="sbp-rating">{formattedRating}</div>

          <a className="sbp-link" href={singleBook.saleInfo?.buyLink}>
            Buy
          </a>
          <a
            className="sbp-link"
            href={singleBook.accessInfo?.pdf?.downloadLink}
          >
            Download
          </a>
        </div>
        <div className="sbp-main-thumbnail">
          <img src={singleBook.volumeInfo?.imageLinks?.thumbnail}></img>
        </div>
      </div>
      <div className="sbp-description">
        {singleBook.volumeInfo?.description}
      </div>
      <div className="sbp-review"></div>
      <div className="sbp-controls">
        <button
          id="sbp-control-button"
          className="sbp-control"
          onClick={addToCollections}
        >
          Add To:
        </button>
        <select
          className="sbp-control"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="favourites">favourites</option>
          <option value="to read">to read</option>
          <option value="read">read</option>
        </select>
      </div>
    </RoutePageLayout>
  )
}

export default SingleBookPage
