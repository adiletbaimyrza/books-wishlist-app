import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateGridBooks, updateSearchValue } from '../redux'
import { RoutePageLayout, GridBook } from '../components'
import { MAX_ITEMS_PER_REQUEST, SEARCH_PLACEHOLDER } from '../utils/constants'

import Illustration from '../assets/boy-and-books-illustration.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { mapBook } from '../utils/mappers'
import { GoogleBooksApiResponse } from '../components/components.types'

const SearchPage = () => {
  const GridBooks = useSelector((state: RootState) => state.GridBooks)
  const searchValue = useSelector((state: RootState) => state.searchValue)
  const [inputSuggestions, setInputSuggestions] = useState<string[]>([])

  const dispatch = useDispatch()

  type ApiProps = {
    author: string | undefined
    title: string | undefined
    sortBy: string | undefined
    onlyFreeBooks: boolean | undefined
  }

  const fetchData = ({ author, title, sortBy, onlyFreeBooks }: ApiProps) => {
    let filters = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}`

    if (author !== undefined) {
      filters = filters.concat(`+inauthor:${author}`)
    }

    if (title !== undefined) {
      filters = filters.concat(`+intitle:${title}`)
    }

    if (onlyFreeBooks === true) {
      filters = filters.concat('&filter=free-ebooks')
    }

    if (sortBy !== undefined) {
      filters = filters.concat(`&orderBy=${sortBy}`)
    }

    filters = filters.concat(`&maxResults=${MAX_ITEMS_PER_REQUEST}`)

    console.log(filters)

    axios
      .get(filters)
      .then((res) => {
        const GridBooks = res.data.items.map((item: GoogleBooksApiResponse) =>
          mapBook(item)
        )
        return GridBooks
      })
      .then((books) => dispatch(updateGridBooks(books)))
      .catch((err) => console.error(err))
  }

  const fetchDataWithFilters = () => {
    fetchData({
      author:
        (document.querySelector('#filter-author') as HTMLInputElement)?.value
          .length > 0
          ? (document.querySelector('#filter-author') as HTMLInputElement)
              ?.value
          : undefined,
      title:
        (document.querySelector('#filter-title') as HTMLInputElement)?.value
          .length > 0
          ? (document.querySelector('#filter-title') as HTMLInputElement)?.value
          : undefined,
      sortBy:
        (document.querySelector('#sortby') as HTMLSelectElement)?.value ===
          'relevance' ||
        (document.querySelector('#sortby') as HTMLSelectElement)?.value ===
          'newest'
          ? (document.querySelector('#sortby') as HTMLSelectElement)?.value
          : undefined,
      onlyFreeBooks:
        (document.querySelector('#filter-free') as HTMLInputElement)
          ?.checked === true
          ? true
          : undefined,
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchValue(event.target.value))
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
            onChange={(e) => {
              handleInputChange(e)

              if (e.target.value.length > 0) {
                axios
                  .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${e.target.value}`
                  )
                  .then((res): void => {
                    const suggestions = res.data.items.map(
                      (item: GoogleBooksApiResponse) => item.volumeInfo?.title
                    )
                    setInputSuggestions(suggestions)
                  })
              }
            }}
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
            <input id="filter-free" className="filter-free" type="checkbox" />
            Only free books
          </div>
          <div className="filters-item">
            Filter by author:
            <input
              id="filter-author"
              type="text"
              className="filter-ins"
              onKeyPress={handleEnterKeyPress}
            />
          </div>
          <div className="filters-item">
            Filter by title:
            <input
              id="filter-title"
              type="text"
              className="filter-ins"
              onKeyPress={handleEnterKeyPress}
            />
          </div>
          <div className="filters-item">
            Sort by:
            <select id="sortby" className="filter-ins">
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="searched-books-grid">
        {GridBooks.map(
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