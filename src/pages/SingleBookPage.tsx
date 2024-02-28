import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateFavourites, updateRead, updateToRead } from '../redux'
import { GoogleBooksApiResponse, RoutePageLayout } from '../components'
import { fetchSingleBook } from '../utils/googleBooksApiService'
import { CollectionType } from '../utils/localStorageService'
import storage from '../utils/localStorageService'

const SingleBookPage = () => {
  const favourites = useSelector((state: RootState) => state.favourites)
  const toRead = useSelector((state: RootState) => state.toRead)
  const read = useSelector((state: RootState) => state.read)
  const dispatch = useDispatch()

  const [selectedOption, setSelectedOption] =
    useState<CollectionType>('favourites')
  const [singleBook, setSingleBook] = useState<GoogleBooksApiResponse>()
  const { id } = useParams()
  const reviewInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (id) {
      const { isInCollection, collectionType } = storage.isInCollections(id)
      if (isInCollection) {
        const collection = storage.getBooks(collectionType as CollectionType)
        const book = collection.find((book) => book.id === id)
        setSingleBook(book)
      } else {
        fetchSingleBook(id)
          .then((book) => setSingleBook(book))
          .catch((err) => console.error(err))
      }
    }
  }, [id])

  const addToCollections = () => {
    const collections = storage.getBooks(selectedOption)
    if (id) {
      if (!collections.find((collectionItem) => collectionItem.id === id)) {
        collections.push(singleBook as GoogleBooksApiResponse)
        // book added to a collection [NOTIFICATION]
      } else {
        // book is already in the collection, cannot add to collections [NOTIFICATION]
      }
    }
    storage.updateBooks(selectedOption, collections)
    switch (selectedOption) {
      case 'favourites':
        dispatch(updateFavourites(collections))
        break
      case 'read':
        dispatch(updateRead(collections))
        break
      case 'to read':
        dispatch(updateToRead(collections))
    }
  }

  const removeFromCollections = () => {
    const { collectionType } = storage.isInCollections(id as string)

    switch (collectionType) {
      case 'favourites':
        dispatch(updateFavourites(favourites.filter((item) => item.id !== id)))
        storage.updateBooks(
          'favourites',
          favourites.filter((item) => item.id !== id)
        )
        break
      case 'read':
        dispatch(updateRead(read.filter((item) => item.id !== id)))
        storage.updateBooks(
          'read',
          read.filter((item) => item.id !== id)
        )
        break
      case 'to read':
        dispatch(updateToRead(toRead.filter((item) => item.id !== id)))
        storage.updateBooks(
          'to read',
          toRead.filter((item) => item.id !== id)
        )
    }
  }

  const addReview = () => {
    if (singleBook && reviewInputRef.current) {
      const updatedBook = {
        ...singleBook,
        review: reviewInputRef.current.value,
      }
      setSingleBook(updatedBook)

      const { collectionType } = storage.isInCollections(
        singleBook.id as string
      )
      let updatedCollection: GoogleBooksApiResponse[] = []

      switch (collectionType) {
        case 'favourites':
          updatedCollection = favourites.map((book) =>
            book.id === singleBook.id ? updatedBook : book
          )
          dispatch(updateFavourites(updatedCollection))
          break
        case 'read':
          updatedCollection = read.map((book) =>
            book.id === singleBook.id ? updatedBook : book
          )
          dispatch(updateRead(updatedCollection))
          break
        case 'to read':
          updatedCollection = toRead.map((book) =>
            book.id === singleBook.id ? updatedBook : book
          )
          dispatch(updateToRead(updatedCollection))
          break
      }

      storage.updateBooks(collectionType as CollectionType, updatedCollection)
    }
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as CollectionType)
  }

  const formattedTitle = singleBook?.volumeInfo
    ? singleBook.volumeInfo.title
    : 'No title.'

  const formattedAuthors =
    singleBook?.volumeInfo && singleBook.volumeInfo.authors
      ? singleBook.volumeInfo?.authors.join(', ')
      : 'No authors.'

  const formattedPublishedDate =
    singleBook?.volumeInfo && singleBook.volumeInfo.publishedDate
      ? new Date(singleBook.volumeInfo?.publishedDate).getFullYear()
      : 'No published date.'

  const formattedPublisher = singleBook?.volumeInfo
    ? singleBook.volumeInfo.publisher
    : 'No publishers.'

  const formattedRating = singleBook?.averageRating
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

          <a className="sbp-link" href={singleBook?.saleInfo?.buyLink}>
            Buy
          </a>
          <a
            className="sbp-link"
            href={singleBook?.accessInfo?.pdf?.downloadLink}
          >
            Download
          </a>
        </div>
        <div className="sbp-main-thumbnail">
          <img src={singleBook?.volumeInfo?.imageLinks?.thumbnail}></img>
        </div>
      </div>
      <div className="sbp-description">
        {singleBook?.volumeInfo?.description}
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
      {id && storage.isInCollections(id).isInCollection && (
        <div>
          <button
            className="remove-from-collections-button"
            onClick={removeFromCollections}
          >
            Remove from {storage.isInCollections(id).collectionType}
          </button>
          <button
            className="remove-from-collections-button"
            onClick={addReview}
          >
            Add review
          </button>
          <input ref={reviewInputRef}></input>
          <div>{singleBook?.review}</div>
        </div>
      )}
    </RoutePageLayout>
  )
}

export default SingleBookPage
