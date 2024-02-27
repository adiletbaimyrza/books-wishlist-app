import { ChangeEvent, useState, useRef } from 'react'
import { RoutePageLayout, GridBook } from '../components'
import { SEARCH_PLACEHOLDER } from '../utils/constants'
import Illustration from '../assets/boy-and-books-illustration.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { mapBook } from '../utils/mappers'
import {
  GoogleBooksApiResponse,
  GridBookProps,
} from '../components/components.types'
import {
  fetchBooksWithParams,
  fetchBooksWithoutParams,
} from '../utils/googleBooksApiService'

const SearchPage = () => {
  const [searchedBooks, setSearchedBooks] = useState<GridBookProps[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
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
    })
      .then((books) => {
        const GridBooks = books.map((item: GoogleBooksApiResponse) =>
          mapBook(item)
        )
        return GridBooks
      })
      .then((books) => setSearchedBooks(books))
  }

  const updateSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(e)

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
        {searchedBooks.map(
          ({
            id,
            title,
            authors,
            publishedDate,
            description,
            averageRating,
            smallThumbnail,
          }) => (
            <GridBook
              key={id}
              id={id}
              title={title}
              authors={authors}
              publishedDate={publishedDate}
              description={description}
              averageRating={averageRating}
              smallThumbnail={smallThumbnail}
            />
          )
        )}
      </div>
    </RoutePageLayout>
  )
}

export default SearchPage
