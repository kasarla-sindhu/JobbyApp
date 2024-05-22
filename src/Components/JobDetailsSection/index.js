import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import CompanyCard from '../CompanyCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobDetailsSection extends Component {
  state = {
    listOfJobs: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount = () => {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachjob => ({
        companyLogoUrl: eachjob.company_logo_url,
        employmentType: eachjob.employment_type,
        id: eachjob.id,
        jobDescription: eachjob.job_description,
        location: eachjob.location,
        packagePerAnnum: eachjob.package_per_annum,
        rating: eachjob.rating,
        title: eachjob.title,
      }))
      this.setState({
        listOfJobs: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderresult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderList = () => {
    const {listOfJobs, searchInput} = this.state
    return (
      <ul className="joblist-con">
        {listOfJobs.map(eachJob => (
          <CompanyCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <button type="button">Retry</button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  searchValue = event => {
    this.setState({searchInput: event.target.value})
  }

  seachinputBtn = () => {
    const {listOfJobs, searchInput} = this.state
    const updatedList = listOfJobs.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchInput.toLocaleLowerCase()),
    )
    this.setState({listOfJobs: updatedList}, this.renderList)
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobdetailsSection-container">
        <div className="inputSearch-con">
          <input
            type="search"
            placeholder="Search"
            className="input-el"
            onChange={this.searchValue}
            value={searchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.seachinputBtn}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderresult()}
      </div>
    )
  }
}

export default JobDetailsSection
