import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function NavBar() {
  const auth = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            {
              auth.isLoggedIn ?
              (<button onClick={auth.logout}>Logout</button>)
              :
              (<Link to="/login">Login</Link>)
            }
          </li>
          <li className="nav-item">
            {auth.isLoggedIn && <Link to="/private">PrivateData</Link>}
          </li>
        </ul>
      </nav>
    </div>
  )
}
