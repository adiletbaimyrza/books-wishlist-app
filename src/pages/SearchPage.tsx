import { ChangeEvent, useState, useRef } from 'react'
import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { updateSearchedBooks, updateSearchValue } from '../redux'
import { RoutePageLayout, GridBook } from '../components'
import { SEARCH_PLACEHOLDER } from '../utils/constants'
import {
  fetchBooksWithParams,
  fetchBooksWithoutParams,
} from '../utils/googleBooksApiService'
import { GoogleBooksApiResponse } from '../components/components.types'

import Illustration from '../assets/boy-and-books-illustration.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchPage = () => {
  const searchedBooks = useSelector((state: RootState) => state.searchedBooks)
  const searchValue = useSelector((state: RootState) => state.searchValue)
  const dispatch = useDispatch()

  const [inputSuggestions, setInputSuggestions] = useState<string[]>([])

  const authorInputRef = useRef<HTMLInputElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const sortBySelectRef = useRef<HTMLSelectElement>(null)
  const freeBooksCheckboxRef = useRef<HTMLInputElement>(null)

  const fetchDataWithFilters = () => {
    fetchBooksWithParams({
      author: authorInputRef.current?.value,
      title: titleInputRef.current?.value,
      sortBy:
        sortBySelectRef.current?.value === 'relevance' ||
        sortBySelectRef.current?.value === 'newest'
          ? sortBySelectRef.current?.value
          : undefined,
      onlyFreeBooks:
        freeBooksCheckboxRef.current?.checked === true ? true : undefined,
      q: searchValue,
    }).then((fetchedBooks) => dispatch(updateSearchedBooks(fetchedBooks)))
  }

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchValue(e.target.value))

    if (e.target.value.length > 0) {
      fetchBooksWithoutParams(e.target.value).then((books): void => {
        const suggestions = books
          .map((item: GoogleBooksApiResponse) => item.volumeInfo?.title)
          .filter((title): title is string => title !== undefined)
        setInputSuggestions(suggestions)
      })
    }
  }

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      fetchDataWithFilters()
    }
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
            onChange={handleSearchInputChange}
            className="search"
            type="search"
            id="search"
            name="q"
            placeholder={SEARCH_PLACEHOLDER}
            list="suggestions"
            onKeyPress={handleEnterKeyPress}
          ></input>
          <datalist id="suggestions">
            {inputSuggestions.map((suggestion, index) => (
              <option key={index}>{suggestion}</option>
            ))}
          </datalist>
          <button
            className={
              searchValue.length === 0
                ? 'search-button'
                : 'search-button search-button-active'
            }
            onClick={fetchDataWithFilters}
            disabled={searchValue.length === 0 ? true : false}
          >
            <div id="search-icon-wrapper" className="icon-wrapper">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            Search
          </button>
        </div>
        <div className="search-filters">
          <div className="filters-item">
            <input
              ref={freeBooksCheckboxRef}
              className="filter-free"
              type="checkbox"
            />
            Only free books
          </div>
          <div className="filters-item">
            Filter by author:
            <input
              ref={authorInputRef}
              type="text"
              className="filter-ins"
              onKeyPress={handleEnterKeyPress}
            />
          </div>
          <div className="filters-item">
            Filter by title:
            <input
              ref={titleInputRef}
              type="text"
              className="filter-ins"
              onKeyPress={handleEnterKeyPress}
            />
          </div>
          <div className="filters-item">
            Sort by:
            <select ref={sortBySelectRef} className="filter-ins">
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="searched-books-grid">
        {searchedBooks.map((book) => (
          <GridBook
            key={book.id}
            id={book.id}
            title={book.volumeInfo?.title}
            authors={book.volumeInfo?.authors}
            publishedDate={book.volumeInfo?.publishedDate}
            description={book.volumeInfo?.description}
            averageRating={book.volumeInfo?.averageRating}
            smallThumbnail={book.volumeInfo?.imageLinks?.smallThumbnail}
          />
        ))}
      </div>
    </RoutePageLayout>
  )
}

export default SearchPage
