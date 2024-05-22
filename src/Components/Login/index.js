import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', submitErr: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = error => {
    this.setState({errMsg: error, submitErr: true})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, submitErr, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginform-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-con">
            <label htmlFor="username" className="label-el">
              USERNAME
            </label>
            <input
              className="input-el"
              placeholder="Username"
              id="username"
              value={username}
              type="text"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-con">
            <label htmlFor="password" className="label-el">
              PASSWORD
            </label>
            <input
              className="input-el"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {submitErr && <p className="errmsg"> *{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
