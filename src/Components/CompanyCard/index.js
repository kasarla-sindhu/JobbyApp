import './index.css'
import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const CompanyCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-style">
      <li className="card-container" key={id}>
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            className="company-Logo"
            alt="company logo"
          />
          <div className="role-con">
            <h1 className="role">{title}</h1>
            <div className="rating-con">
              <IoIosStar className="star-icon" />
              <p className="rate-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="con">
          <div className="details-con">
            <div className="type">
              <TiLocation className="case" />
              <p className="type-text">{location}</p>
            </div>
            <div className="type">
              <BsFillBriefcaseFill className="case" />
              <p className="type-text">{employmentType}</p>
            </div>
          </div>
          <h3 className="Ctc">{packagePerAnnum}</h3>
        </div>
        <hr className="line" />
        <div className="description-con">
          <h3 className="des-heading">Description</h3>
          <p className="des-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default CompanyCard
