import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLogOutOutline} from 'react-icons/io5'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <Link to="/" className="link-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo"
            alt="website logo"
          />
        </Link>
      </div>
      <ul className="nav-items-list-desktop">
        <Link to="/" className="link-style">
          <li className="nav-item">Home</li>
        </Link>
        <Link to="/jobs" className="link-style">
          <li className="nav-item">Jobs</li>
        </Link>
      </ul>
      <ul className="nav-items-mobile">
        <Link to="/" className="link-style">
          <li className="nav-item">
            <MdHome className="icon" />
          </li>
        </Link>
        <Link to="/jobs" className="link-style">
          <li className="nav-item">
            <BsFillBriefcaseFill className="icon" />
          </li>
        </Link>
        <button className="link-style" type="button">
          <li className="nav-item">
            <IoLogOutOutline className="icon" onClick={onClickLogout} />
          </li>
        </button>
      </ul>
      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
