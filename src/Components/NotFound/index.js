import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="not-found-img"
      alt="not found"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="text-sorry">
      we are sorry,the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
