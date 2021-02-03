import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

function App () {
  const [username, setUsername] = useState()
  const [token, setToken] = useState()
  const [navigation, setNavigation] = useState('home')

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  const isLoggedIn = (username && token)

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
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
        </header>

        <div>
          <Switch>
            <Route path='/login'>
              <Login isLoggedIn={isLoggedIn} setAuth={setAuth} />
            </Route>
            <Route path='/register'>
              <Register isLoggedIn={isLoggedIn} setAuth={setAuth} />
            </Route>
            <Route path='/'>
              <Home />
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
