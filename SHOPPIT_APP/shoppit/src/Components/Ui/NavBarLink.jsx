import { Link } from 'react-router-dom'

const NavBarLink = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {/* Add navigation links here */}
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/shop">Shop</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contact">Contact</Link>
      </li>
    </ul>
  )
}

export default NavBarLink

