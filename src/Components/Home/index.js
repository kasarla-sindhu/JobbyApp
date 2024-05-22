import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="text-container">
            <h1 className="title">Find The Job That Fits Your Life</h1>
            <p className="content">
              Millions of people are searching for jobs, salary
              information,company reviews.Find the job that fits your abilities
              and potential.
            </p>
            <Link to="/jobs">
              <button
                type="button"
                className="find-btn"
                onClick={this.onClickFindJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
