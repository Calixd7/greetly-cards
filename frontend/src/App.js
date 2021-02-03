import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Create from './components/Create'
import Explore from './components/Explore'
import Profile from './components/Profile'

function App () {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState()

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  const isLoggedIn = (username && token)

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <div className='header-content'>
            <div className='top-row-header'>
              <h1>Kickass Cards</h1>
              {
            isLoggedIn
              ? (
                <span>Hello, {username} <button onClick={() => setToken(null)}>Log out</button></span>
                )
              : (
                <span>
                  <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
                </span>
                )
          }
            </div>
            <div className='bottom-row-header'>
              <nav className='nav-bar'>
                <div>
                  <Link to='/home'>Home</Link>
                </div>
                <div>
                  <Link to='/profile'>Profile</Link>
                </div>
                <div>
                  <Link to='/create'>Create</Link>
                </div>
                <div>
                  <Link to='/explore'>Explore</Link>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <main className='main-content'>
          <div>
            <Switch>
              <Route path='/login'>
                <Login isLoggedIn={isLoggedIn} setAuth={setAuth} />
              </Route>
              <Route path='/register'>
                <Register isLoggedIn={isLoggedIn} setAuth={setAuth} />
              </Route>
            </Switch>
            <Switch>
              <Route path='/home'>
                <Home />
              </Route>
              <Route path='/profile'>
                <Profile />
              </Route>
              <Route path='/create'>
                <Create />
              </Route>
              <Route path='/explore'>
                <Explore />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
