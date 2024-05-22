import './index.css'
import {IoIosStar} from 'react-icons/io'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const CardItemDetailsCard = props => {
  const {detailsObj} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = detailsObj

  return (
    <li key={id} className="similar-card-con">
      <div className="logo-container">
        <img src={companyLogoUrl} className="company-Logo" alt="company logo" />
        <div className="role-con">
          <h1 className="role">{title}</h1>
          <div className="rating-con">
            <IoIosStar className="star-icon" />
            <p className="rate-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="descrip">
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
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
    </li>
  )
}

export default CardItemDetailsCard
