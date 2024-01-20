import {Component} from 'react'
import bcrypt from 'bcryptjs'
import {v4 as uuidv4} from 'uuid'

import './index.css'

class PasswordManager extends Component {
  state = {
    id: uuidv4(),
    website: '',
    userName: '',
    password: '',
    hashedPassword: '',
    passwordList: [],
    count: 0,
    isChecked: false,
    searchInput: '',
  }

  checkedBox = () => {
    const {isChecked} = this.state
    console.log(isChecked)
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  onChangeSearch = event => {
    const searchInput = event.target.value.toLowerCase()
    this.setState({
      searchInput: searchInput,
    })
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      userName: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  // hashPassword = async password => {
  //   try {
  //     const saltRounds = 10
  //     console.log('Step 1a: Password before hashing:', password)
  //     const hashedPassword = await bcrypt.hash(password, saltRounds)
  //     console.log('Step 3a: Password after hashing:', hashedPassword)
  //     return hashedPassword
  //   } catch (error) {
  //     console.error('Error hashing password:', error)
  //     throw error
  //   }
  // }
  handleSubmit = async event => {
    event.preventDefault()
    const {password, website, userName, hashedPassword} = this.state

    console.log('Step 1a: Password before hashing (if needed):', password)

    try {
      const hashedPassword = await this.hashPassword(password)
      const id = uuidv4()
      this.setState(prevState => ({
        passwordList: [
          ...prevState.passwordList,
          {
            website: website,
            userName: userName,
            password: password,
            hashedPassword: hashedPassword,
            id: id,
          },
        ],
        website: '',
        userName: '',
        password: '',
        hashedPassword: '',
      }))
    } catch (error) {
      console.error('Error in form submission:', error)
    }
  }

  handleDelete = id => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({
      passwordList: filteredPasswordList,
    })
  }
  render() {
    const {website, userName, password, passwordList, id, isChecked, searchInput} =
      this.state
    const searchResult = passwordList.filter((eachSearch) => eachSearch.website.toLowerCase().includes(searchInput))
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="add-data-container">
          <form className="input-container" onSubmit={this.handleSubmit}>
            <h1 className="heading">Add New Password</h1>
            <div className="user-inputs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="inputs"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="user-inputs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="inputs"
                value={userName}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="user-inputs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />

              <input
                type="password"
                placeholder="Enter Password"
                className="inputs"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="add-btn" type="submit">
              add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>

        <div className="password-container">
          <div className="headers">
            <div className="password-count">
              <h1 className="heading">Your Password</h1>
              <p className="count">{passwordList.length}</p>
            </div>
            <div className="user-inputs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="inputs"
                onChange={this.onChangeSearch}
              />
            </div>
          </div>

          <hr className="horizontal-line" />
          <label htmlFor="myCheckbox" className="label">
            <input
              type="checkbox"
              id="myCheckbox"
              className="checkbox"
              onClick={this.checkedBox}
            />
            Show Passwords
          </label>

          <div className="password-display-container">
            {searchResult.map(eachData => (
              <li className="cards" key={eachData.id}>
                <p className="initail">{eachData.userName[0]}</p>
                <div className="data">
                  <p>{eachData.website}</p>
                  <p>{eachData.userName}</p>
                  {isChecked ? (
                    <p>{eachData.password}</p>
                  ) : (
                    <p>{'*'.repeat(eachData.password?.length ?? 0)}</p>
                  )}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => this.handleDelete(eachData.id)}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    alt="delete"
                    className="delete-icon"
                  />
                </button>
              </li>
            ))}
          </div>

          <div className="no-password-container">
            {passwordList.length === 0 && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
