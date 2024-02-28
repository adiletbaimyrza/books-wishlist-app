import { ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { updateFavourites, updateToRead, updateRead } from '../redux'
import { Link } from 'react-router-dom'
import { GoogleBooksApiResponse, ReviewProps } from './components.types'
import { updateBooksInLocalStorageByCollection } from '../utils/localStorageService'
import { CollectionType } from '../utils/utils.types'
import { isInCollections } from '../utils/localStorageService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '@mui/material'

const Review = ({ book }: ReviewProps) => {
  const favourites = useSelector((state: RootState) => state.favourites)
  const toRead = useSelector((state: RootState) => state.toRead)
  const read = useSelector((state: RootState) => state.read)
  const dispatch = useDispatch()

  const [open, setOpen] = useState<boolean>(false)
  const [reviewValue, setReviewValue] = useState<string>(book.review as string)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const reviewValueChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewValue(e.target.value)
  }

  const editReviewSubmitHandler = () => {
    const { collectionType } = isInCollections(book.id as string)
    let updatedCollection: GoogleBooksApiResponse[] = []

    const updatedBook = { ...book, review: reviewValue }

    switch (collectionType) {
      case 'favourites':
        updatedCollection = favourites.map((boo) =>
          boo.id === book.id ? updatedBook : boo
        )
        dispatch(updateFavourites(updatedCollection))
        break
      case 'read':
        updatedCollection = read.map((boo) =>
          boo.id === book.id ? updatedBook : boo
        )
        dispatch(updateRead(updatedCollection))
        break
      case 'to read':
        updatedCollection = toRead.map((boo) =>
          boo.id === book.id ? updatedBook : boo
        )
        dispatch(updateToRead(updatedCollection))
        break
    }

    updateBooksInLocalStorageByCollection(
      collectionType as CollectionType,
      updatedCollection
    )

    handleClose()
  }

  const deleteReviewHandler = () => {
    const { collectionType } = isInCollections(book.id as string)
    let updatedCollection: GoogleBooksApiResponse[] = []

    const updatedBook = { ...book, review: undefined }

    switch (collectionType) {
      case 'favourites':
        updatedCollection = favourites.map((boo) =>
          boo.id === book.id ? updatedBook : boo
        )
        dispatch(updateFavourites(updatedCollection))
        break
      case 'read':
        updatedCollection = read.map((boo) =>
          boo.id === book.id ? updatedBook : boo
        )
        dispatch(updateRead(updatedCollection))
        break
      case 'to read':
        updatedCollection = toRead.map((boo) =>
          boo.id === book.id ? updatedBook : boo
        )
        dispatch(updateToRead(updatedCollection))
        break
    }

    updateBooksInLocalStorageByCollection(
      collectionType as CollectionType,
      updatedCollection
    )
  }

  return (
    <div className="review-card">
      <Link to={`/books-wishlist-app/${book.id}`} className="review-title">
        {book.volumeInfo?.title}
      </Link>
      <p className="review-text">{book.review}</p>
      <div className="review-buttons">
        <button
          className="edit-button"
          onClick={(e) => {
            console.log('edit button clicked')
            e.stopPropagation()
            e.preventDefault()
            handleOpen()
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </button>
        <Modal open={open} onClose={handleClose}>
          <div className="modal">
            <textarea
              onChange={reviewValueChangeHandler}
              value={reviewValue}
              className="modal-textarea"
              rows={20}
              cols={50}
            ></textarea>
            <button onClick={editReviewSubmitHandler} className="submit-review">
              Submit
            </button>
          </div>
        </Modal>
        <button className="delete-button" onClick={deleteReviewHandler}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  )
}

export default Review
