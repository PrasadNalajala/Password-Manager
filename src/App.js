import './App.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

const IntialList = [
  {
    website: 'www.ggogle.com',
    username: 'Prasad',
    password: 'Prasad@9999',
    id: uuidv4(),
  },
]

const PasswordItem = props => {
  const {passwordItem, deleteItem, showPassword} = props

  const ondeleteItem = () => {
    deleteItem(passwordItem.id)
  }

  const intial=passwordItem.website.charAt(0)

  return (
    <li className="item">
      <div className="profile-container">
        <div className="profile">intial</div>
        <div className="detailsContainer">
          <p className="itemPara">{passwordItem.website}</p>
          <p className="itemPara">{passwordItem.username}</p>
          {showPassword ? (
            <p className="itemPara">{passwordItem.password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="masked"
            />
          )}
        </div>
      </div>
      <button type="button" className="deleteBtn" onClick={ondeleteItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="deleteImg"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    passWordsList: [],
    showPassword: false,
    isempty: false,
  }

  updateWebsite = event => {
    this.setState({website: event.target.value})
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  submitPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newList = {
      website,
      username,
      password,
      id: uuidv4(),
    }
    if (website !== '' && username !== '' && password !== '') {
      this.setState(prev => ({
        passWordsList: [...prev.passWordsList, newList],
        username: '',
        password: '',
        website: '',
        isempty: false,
      }))
    } else {
      this.setState({isempty: true})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {passWordsList} = this.state
    const deletedList = passWordsList.filter(each => each.id !== id)

    this.setState({passWordsList: deletedList})
  }

  onShowPassword = () => {
    this.setState(prev => ({
      showPassword: !prev.showPassword,
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      passWordsList,
      searchInput,
      showPassword,
      isempty,
    } = this.state

    const filteredList = passWordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const isPasswordsAvailble = filteredList.length !== 0

    const count = passWordsList.length

    const errorMsg = isempty ? '*Enter All Required Fields' : ''
    return (
      <div className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="logoImg"
          alt="app logo"
        />
        <div className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="passwordSmImg"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="passwordLgImg"
          />
          <div className="form">
            <form>
              <h1 className="heading">Add New Password</h1>
              <div className="inputContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="inputImg"
                  alt="website"
                />

                <input
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.updateWebsite}
                  value={website}
                />
              </div>
              <div className="inputContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="inputImg"
                  alt="username"
                />

                <input
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.updateUsername}
                  value={username}
                />
              </div>
              <div className="inputContainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="inputImg"
                  alt="password"
                />

                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.updatePassword}
                  value={password}
                />
              </div>
              <div className="btnContainer">
                <button
                  type="submit"
                  className="addBtn"
                  onClick={this.submitPassword}
                >
                  Add
                </button>
              </div>
            </form>
            <p className="error">{errorMsg}</p>
          </div>
        </div>
        <div className="card1">
          <div className="passwords-Container">
            <div className="password-text-container">
              <h1 className="password-heading">Your Passwords</h1>
              <div className="count">
                <p>{count}</p>
              </div>
            </div>
            <div className="text-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="searchImg"
                alt="search"
              />

              <input
                type="search"
                placeholder="Search"
                className="passwordInput"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              onClick={this.onShowPassword}
            />
            <label htmlFor="checkbox" className="label">
              Show Passwords
            </label>
          </div>

          {isPasswordsAvailble ? (
            <>
              <ul className="passwordListConatiner">
                {filteredList.map(passwordItem => (
                  <PasswordItem
                    passwordItem={passwordItem}
                    deleteItem={this.deleteItem}
                    key={passwordItem.id}
                    showPassword={showPassword}
                  />
                ))}
              </ul>
            </>
          ) : (
            <div className="noPasswordsContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="noPasswords"
              />
              <p className="noPassword">No Passwords</p>
            </div>
          )}
        </div>
        <p className="info">Made With ❤️ By Prasad</p>
      </div>
    )
  }
}

export default App

/* 
-add bgs for both
-add form and image in card container
-add order to display form first in lg devices
-create passwords card
*/
