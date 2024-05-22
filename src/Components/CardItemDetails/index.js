import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosStar} from 'react-icons/io'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
<<<<<<< HEAD
import Header from '../Header'
=======
>>>>>>> 1bfb21babd8bb6ccdbc2c58ee1cca886fa7183a4
import CardItemDetailsCard from '../CardItemDetailsCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class CardItemDetails extends Component {
  state = {
    jobDetails: '',
    similarJobs: [],
    skillSet: [],
    lifeAtCompanyIs: {},
    statusIs: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getcompanyData()
  }

  getcompanyData = async () => {
    this.setState({statusIs: apiStatusConstants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobSelected = data.job_details

      const updatelifeatcompany = {
        description: jobSelected.life_at_company.description,
        imageUrl: jobSelected.life_at_company.image_url,
      }
      const updatedSkills = jobSelected.skills.map(eachskill => ({
        name: eachskill.name,
        imageUrl: eachskill.image_url,
      }))
      const updatedData = {
        id: jobSelected.id,
        companyLogoUrl: jobSelected.company_logo_url,
        companyWebsiteUrl: jobSelected.company_website_url,
        employmentType: jobSelected.employment_type,
        jobDescription: jobSelected.job_description,
        location: jobSelected.location,
        packagePerAnnum: jobSelected.package_per_annum,
        rating: jobSelected.rating,
        title: jobSelected.title,
        lifeAtCompany: updatelifeatcompany,
        skills: updatedSkills,
      }
      const similarJobsUpdatedData = data.similar_jobs.map(eachjob => ({
        id: eachjob.id,
        companyLogoUrl: eachjob.company_logo_url,
        employmentType: eachjob.employment_type,
        jobDescription: eachjob.job_description,
        location: eachjob.location,
        rating: eachjob.rating,
        title: eachjob.title,
      }))
      this.setState({
        jobDetails: updatedData,
        similarJobs: similarJobsUpdatedData,
        skillSet: updatedData.skills,
        lifeAtCompanyIs: updatelifeatcompany,
        statusIs: apiStatusConstants.success,
      })
    } else {
      this.setState({statusIs: apiStatusConstants.failure})
    }
  }

  retryBtn = () => {
    this.setState(
      {statusIs: apiStatusConstants.inprogress},
      this.getcompanyData,
    )
  }

  renderCompanyDetails = () => {
    const {jobDetails, similarJobs, skillSet, lifeAtCompanyIs} = this.state

    return (
      <>
        <div className="card-container" key={jobDetails.id}>
          <div className="logo-container">
            <img
              src={jobDetails.companyLogoUrl}
              className="company-Logo"
              alt="similar job company logo"
            />
            <div className="role-con">
              <h1 className="role">{jobDetails.title}</h1>
              <div className="rating-con">
                <IoIosStar className="star-icon" />
                <p className="rate-text">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="con">
            <div className="details-con">
              <div className="type">
                <TiLocation className="case" />
                <p className="type-text">{jobDetails.location}</p>
              </div>
              <div className="type">
                <BsFillBriefcaseFill className="case" />
                <p className="type-text">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="Ctc">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-con">
            <div className="company-visit">
              <h3 className="des-heading">Description</h3>
              <a href={jobDetails.companyWebsiteUrl}>Visit</a>
            </div>
            <p className="des-text">{jobDetails.jobDescription}</p>
          </div>
          <div className="skills-con">
            <h1>Skills</h1>
            <ul className="all-skills">
              {skillSet.map(each => (
                <li key={each.name}>
                  <img src={each.imageUrl} alt={each.name} />
                  <h1>{each.name}</h1>
                </li>
              ))}
            </ul>
            <div className="life-info">
              <div>
                <h1>Life at Company</h1>
                <p>{lifeAtCompanyIs.description}</p>
              </div>
              <div>
                <img src={lifeAtCompanyIs.imageUrl} className="life-img" />
              </div>
            </div>
          </div>
        </div>
        <div className="similar-jobs-con">
          <h1>Similar Jobs</h1>
          <ul className="similar-con">
            {similarJobs.map(eachJob => (
              <CardItemDetailsCard detailsObj={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="spinner" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.retryBtn}>
        Retry
      </button>
    </div>
  )

  renderResult = () => {
    const {statusIs} = this.state
    switch (statusIs) {
      case apiStatusConstants.success:
        return this.renderCompanyDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
<<<<<<< HEAD
    return (
      <div className="carditemdetails-con">
        <Header />
        {this.renderResult()}
      </div>
    )
=======
    return <div className="carditemdetails-con">{this.renderResult()}</div>
>>>>>>> 1bfb21babd8bb6ccdbc2c58ee1cca886fa7183a4
  }
}

export default CardItemDetails
