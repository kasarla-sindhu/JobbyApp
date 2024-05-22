import './index.css'
import {Component} from 'react'
import Header from '../Header'
import ProfileSection from '../ProfileSection'
import JobDetailsSection from '../JobDetailsSection'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <ProfileSection />
          <JobDetailsSection />
        </div>
      </>
    )
  }
}

export default Jobs
