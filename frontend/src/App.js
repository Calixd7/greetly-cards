import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Create from './components/Create'
import Explore from './components/Explore'
import Profile from './components/Profile'
import CardList from './components/CardList'
import createPersistedState from 'use-persisted-state'

const useUsername = createPersistedState('username')
const useToken = createPersistedState('token')

function App () {
  const [username, setUsername] = useUsername()
  const [token, setToken] = useToken()

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  const isLoggedIn = (username && token)

  return (
    <Router>
      <div className='App'>
        <div className='header'>

          <h1>Greetly<span>- Card Maker -</span><span>Make custom greeting cards for any occasion</span></h1>

          <nav className='slidemenu'>

            <Link to='/home'>
              <input type='radio' name='slideItem' id='slide-item-1' className='slide-toggle' />
              <label for='slide-item-1'><p className='material-icons'>home</p><span>Home</span></label>
            </Link>

            <Link to='/profile'>
              <input type='radio' name='slideItem' id='slide-item-2' className='slide-toggle' />
              <label for='slide-item-2'><p className='material-icons'>face</p><span>Profile</span></label>
            </Link>

            <Link to='/create'>
              <input type='radio' name='slideItem' id='slide-item-3' className='slide-toggle' />
              <label for='slide-item-3'><p className='material-icons'>create</p><span>Create</span></label>
            </Link>

            <Link to='/explore'>
              <input type='radio' name='slideItem' id='slide-item-4' className='slide-toggle' />
              <label for='slide-item-4'><p className='material-icons'>search</p><span>Explore</span></label>
            </Link>

            <Link to='/card-list'>
              <input type='radio' name='slideItem' id='slide-item-4' className='slide-toggle' />
              <label for='slide-item-4'><p className='material-icons'>search</p><span>CardList</span></label>
            </Link>

          </nav>

        </div>

        <div className='register-and-login'>
          {isLoggedIn
            ? (
              <span>Hello, {username} <button onClick={() => setToken(null)}>Log out</button></span>
              )
            : (
              <span>
                <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
              </span>
              )}
        </div>

      </div>

      <main className='main-content'>
        <div>
          <Switch>
            <Route path='/login'>
              <Login isLoggedIn={isLoggedIn} setAuth={setAuth} />
            </Route>
            <Route path='/register'>
              <Register isLoggedIn={isLoggedIn} setAuth={setAuth} />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/create'>
              <Create token={token} username={username} />
            </Route>
            <Route path='/explore'>
              <Explore />
            </Route>
            <Route path='/card-list'>
              <CardList token={token} />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  )
}

export default App
