import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

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

const apiConstantsStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const profileUrl = 'https://apis.ccbp.in/profile'

class Jobs extends Component {
  state = {isProfile: apiConstantsStatus.initial, apiProfileData: []}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({isProfile: apiConstantsStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = data.profile_details
      const updatedProfileData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      //   console.log(profileData)
      this.setState({
        apiProfileData: updatedProfileData,
        isProfile: apiConstantsStatus.success,
      })
    } else {
      this.setState({isProfile: apiConstantsStatus.failure})
    }
  }

  renderLoadingView = () => {}

  renderFailureView = () => {}

  renderApiViews = () => {}

  renderCheckbox = () =>
    employmentTypesList.map(eachItem => (
      <li className="list-container" key={eachItem.employmentTypeId}>
        <input
          type="checkbox"
          className="checkbox-container"
          id={eachItem.employmentTypeId}
        />
        <label htmlFor={eachItem.employmentTypeId} className="labelText">
          {eachItem.label}
        </label>
      </li>
    ))

  renderSalaryRange = () =>
    salaryRangesList.map(eachItem => (
      <li className="salary-container" key={eachItem.salaryRangeId}>
        <input
          type="radio"
          className="radio-container"
          id={eachItem.salaryRangeId}
        />
        <label htmlFor={eachItem.salaryRangeId} className="salaryText">
          {eachItem.label}
        </label>
      </li>
    ))

  render() {
    const {apiProfileData} = this.state
    const {name, profileImageUrl, shortBio} = apiProfileData
    // console.log(profileImageUrl)
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-and-jobListContainer">
          <div className="profileSectionAndSpecification">
            <div className="profile-container">
              <img
                src={profileImageUrl}
                alt="profile"
                className="profileImage"
              />
              <h1 className="profileName">{name}</h1>
              <p className="profileBio">{shortBio}</p>
            </div>
            <hr className="horizontal-line" />
            <h1 className="typeOfEmployment">Type of Employment</h1>
            {this.renderCheckbox()}
            <hr className="horizontal-line" />
            <h1 className="salaryRange">Salary Range</h1>
            {this.renderSalaryRange()}
          </div>
          <div className="jobs-list-container">
            <div>
              <input
                type="search"
                className="searchField"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
