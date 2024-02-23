import axios from 'axios'
import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateSearchedBooks, updateSearchValue } from '../redux'
import { RoutePageLayout } from '../components'

import Illustration from '../assets/boy-and-books-illustration.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const API_KEY: string = 'AIzaSyD-2SYYVG-vCeLhk5x0c0PxtPONd8twS_M'

interface BookItem {
  volumeInfo: {
    title: string
  }
}

const SearchPage = () => {
  const searchedBooks = useSelector((state: RootState) => state.searchedBooks)
  const searchValue = useSelector((state: RootState) => state.searchValue)

  const dispatch = useDispatch()

  const fetchData = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&filter=free-ebooks&key=${API_KEY}`
      )
      .then((res) =>
        dispatch(
          updateSearchedBooks(
            res.data.items.map((book: BookItem) => book.volumeInfo.title)
          )
        )
      )
      .catch((err) => console.error(err))
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchValue(event.target.value))
  }

  return (
    <RoutePageLayout>
      <div className="search-books">
        <h3 className="search-title">
          <img className="illustration" src={Illustration} />
          Search the world's most comprehensive index of full-text books.
        </h3>
        <div className="search-field">
          <input
            value={searchValue}
            onChange={handleInputChange}
            className="search"
            type="search"
            id="mySearch"
            name="q"
            placeholder="Ex: War and Peace by Leo Tolstoy"
          ></input>
          <button className="search-button" onClick={fetchData}>
            <div id="search-icon-wrapper" className="icon-wrapper">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            Search
          </button>
        </div>
      </div>
      {searchedBooks.map((book, index) => (
        <h4 key={index}>{book}</h4>
      ))}
    </RoutePageLayout>
  )
}

export default SearchPage
