import axios from 'axios'
import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateSearchedBooks, updateSearchValue } from '../redux'
import { RoutePageLayout, SearchedBook } from '../components'
import { MAX_ITEMS_PER_REQUEST } from '../utils/constants'

import Illustration from '../assets/boy-and-books-illustration.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { mapBook } from '../utils/mappers'

const SearchPage = () => {
  const searchedBooks = useSelector((state: RootState) => state.searchedBooks)
  const searchValue = useSelector((state: RootState) => state.searchValue)

  const dispatch = useDispatch()

  type ApiProps = {
    author: string | undefined
    title: string | undefined
    sortBy: 'relevance' | 'newest' | undefined
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
        const searchedBooks = res.data.items.map((item: any) => mapBook(item))
        return searchedBooks
      })
      .then((books) => dispatch(updateSearchedBooks(books)))
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
            list="fruits"
          ></input>
          <datalist id="fruits">
            <option value="Apple" />
            <option value="Banana" />
            <option value="Orange" />
            <option value="Grapes" />
            <option value="Strawberry" />
          </datalist>
          <button
            className={
              searchValue.length === 0
                ? 'search-button'
                : 'search-button search-button-active'
            }
            onClick={() => {
              fetchData({
                author:
                  (document.querySelector('#filter-author') as HTMLInputElement)
                    ?.value.length > 0
                    ? (
                        document.querySelector(
                          '#filter-author'
                        ) as HTMLInputElement
                      )?.value
                    : undefined,
                title:
                  (document.querySelector('#filter-title') as HTMLInputElement)
                    ?.value.length > 0
                    ? (
                        document.querySelector(
                          '#filter-title'
                        ) as HTMLInputElement
                      )?.value
                    : undefined,
                sortBy:
                  (document.querySelector('#sortby') as HTMLSelectElement)
                    ?.value === 'relevance' ||
                  (document.querySelector('#sortby') as HTMLSelectElement)
                    ?.value === 'newest'
                    ? (document.querySelector('#sortby') as HTMLSelectElement)
                        ?.value
                    : undefined,
                onlyFreeBooks:
                  (document.querySelector('#filter-free') as HTMLInputElement)
                    ?.checked === true
                    ? true
                    : undefined,
              })
            }}
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
            <input id="filter-author" type="text" className="filter-ins" />
          </div>
          <div className="filters-item">
            Filter by title:
            <input id="filter-title" type="text" className="filter-ins" />
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
        {searchedBooks.map(
          ({
            id,
            title,
            authors,
            publishedDate,
            description,
            averageRating,
            ratingsCount,
            smallThumbnail,
          }) => (
            <SearchedBook
              key={id}
              id={id}
              title={title}
              authors={authors}
              publishedDate={publishedDate}
              description={description}
              averageRating={averageRating}
              ratingsCount={ratingsCount}
              smallThumbnail={smallThumbnail}
            />
          )
        )}
      </div>
    </RoutePageLayout>
  )
}

export default SearchPage
