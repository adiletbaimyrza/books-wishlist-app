import { CustomNavLinkProps } from './components.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

const CustomNavLink = ({ path, faIcon, name }: CustomNavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? 'nav-link active-link' : 'nav-link'
      }
      to={path}
    >
      <div className="icon-wrapper">
        <FontAwesomeIcon className="icon" icon={faIcon} />
      </div>
      {name}
    </NavLink>
  )
}

export default CustomNavLink
