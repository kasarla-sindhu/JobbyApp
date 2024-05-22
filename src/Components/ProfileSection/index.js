import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class ProfileSection extends Component {
  state = {profilesuccessStatus: apiStatusConstants.initial, profileData: ''}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profilesuccessStatus: apiStatusConstants.inprogress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const data = fetchedData.profile_details
      const updatedData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({
        profileData: updatedData,
        profilesuccessStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profilesuccessStatus: apiStatusConstants.failure,
        profileData: '',
      })
    }
  }

  retryBtn = () => {
    this.setState(
      {profilesuccessStatus: apiStatusConstants.inprogress},
      this.getProfileDetails,
    )
  }

  renderProfileSuccess = () => {
    const {profileData} = this.state
    return (
      <div className="profile-container">
        <img
          src={profileData.profileImageUrl}
          className="profile-picture"
          alt="profile"
        />
        <h1 className="name">{profileData.name}</h1>
        <p className="role">{profileData.shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="profile-failure-con">
      <button type="button" className="retry" onClick={this.retryBtn}>
        Retry
      </button>
    </div>
  )

  renderProfileLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="spinner" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profilesuccessStatus} = this.state
    switch (profilesuccessStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      case apiStatusConstants.inprogress:
        return this.renderProfileLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="ProfileSection-container">
        {this.renderProfile()}
        <hr className="line-style" />
        <div className="employment-type-container">
          <h1 className="heading">Type Of Employment</h1>
          <ul className="type-list">
            {employmentTypesList.map(eachtype => (
              <li className="list-style" key={eachtype.employmentTypeId}>
                <input
                  type="checkbox"
                  name="employmentType"
                  id={eachtype.employmentTypeId}
                  value={eachtype.employmentTypeId}
                />
                <label htmlFor={eachtype.employmentTypeId} className="items">
                  {eachtype.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className="line-style" />
        <div className="range-container">
          <h1 className="heading">Salary Range</h1>
          <ul className="type-list">
            {salaryRangesList.map(eachrange => (
              <li className="list-style" key={eachrange.salaryRangeId}>
                <input
                  type="radio"
                  name="range"
                  id={eachrange.salaryRangeId}
                  value={eachrange.salaryRangeId}
                />
                <label htmlFor={eachrange.salaryRangeId} className="items">
                  {eachrange.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProfileSection
