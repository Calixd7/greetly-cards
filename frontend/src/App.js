
import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Create from './components/Create'
import Explore from './components/Explore'
import Profile from './components/Profile'
import CardList from './components/CardList'
import CardDetail from './components/CardDetail'
import Friends from './components/Friends'
import Delete from './components/Delete'
import createPersistedState from 'use-persisted-state'
import ViewCard from './components/ViewCard'

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
              <label htmlFor='slide-item-1'><p className='material-icons'>home</p><span>Home</span></label>
            </Link>

            <Link to='/card-list'>
              <input type='radio' name='slideItem' id='slide-item-4' className='slide-toggle' />
              <label htmlFor='slide-item-4'><p className='material-icons'>search</p><span>My Cards</span></label>
            </Link>

            <Link to='/create'>
              <input type='radio' name='slideItem' id='slide-item-3' className='slide-toggle' />
              <label htmlFor='slide-item-3'><p className='material-icons'>create</p><span>Create</span></label>
            </Link>

            <Link to='/explore'>
              <input type='radio' name='slideItem' id='slide-item-4' className='slide-toggle' />
              <label htmlFor='slide-item-4'><p className='material-icons'>search</p><span>Explore</span></label>
            </Link>

            <Link to='/friends'>
              <input type='radio' name='slideItem' id='slide-item-5' className='slide-toggle' />
              <label htmlFor='slide-item-5'><p className='material-icons'>search</p><span>Friends</span></label>
            </Link>

          </nav>

        </div>

        <div className='register-and-login'>
          {isLoggedIn
            ? (
              <span>Hello, {username} <button className='logout-button' onClick={() => setToken(null)}>Log out</button></span>
              )
            : (
              <span>
                <Link to='/login'><button className='log-button'>Login</button></Link> or <Link to='/register'><button className='reg-button'>Register</button></Link>
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
              <Home isLoggedIn={isLoggedIn} />
            </Route>
            <Route path='/create'>
              <Create token={token} username={username} />
            </Route>
            <Route path='/explore'>
              <Explore token={token} />
            </Route>
            <Route path='/friends'>
              <Friends token={token} />
            </Route>
            <Route path='/card-list'>
              <CardList token={token} />
            </Route>
            <Route path='/c/:pk'>
              <CardDetail token={token} />
            </Route>
            <Route path='/c/:pk'>
              <Delete token={token} />
            </Route>
            <Route path='/view-card/:pk'>
              <ViewCard token={token} />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  )
}

export default App
