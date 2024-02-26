import { Outlet } from 'react-router-dom'
import { CustomNavLinkProps } from '../components'
import { CustomNavLink } from '../components'
import {
  faMagnifyingGlass,
  faStar,
  faBookmark,
  faBasketShopping,
} from '@fortawesome/free-solid-svg-icons'

const NAV_LINKS: CustomNavLinkProps[] = [
  {
    path: '/books-wishlist-app/search',
    faIcon: faMagnifyingGlass,
    name: 'Search books',
  },
  {
    path: '/books-wishlist-app/favourites',
    faIcon: faStar,
    name: 'Favourites',
  },
  {
    path: '/books-wishlist-app/toread',
    faIcon: faBasketShopping,
    name: 'To read',
  },
  { path: '/books-wishlist-app/read', faIcon: faBookmark, name: 'Read' },
]

const HomePage = () => {
  return (
    <div className="layout">
      <nav className="navbar">
        {NAV_LINKS.map(({ path, faIcon, name }, index) => (
          <CustomNavLink key={index} path={path} faIcon={faIcon} name={name} />
        ))}
      </nav>
      <Outlet />
    </div>
  )
}

export default HomePage