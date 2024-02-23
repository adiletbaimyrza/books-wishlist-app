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
  { path: '/search', faIcon: faMagnifyingGlass, name: 'Search books' },
  { path: '/favourites', faIcon: faStar, name: 'Favourites' },
  { path: '/toread', faIcon: faBasketShopping, name: 'To read' },
  { path: '/read', faIcon: faBookmark, name: 'Read' },
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
