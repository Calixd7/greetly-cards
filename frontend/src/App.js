import Login from './components/Login'
import { useState } from 'react'

function App () {
  const [username, setUsername] = useState()
  const [token, setToken] = useState()

  function setAuth (username, token) {
    setUsername(username)
    setToken(token)
  }

  return (
    <div>
      <h1>Our Kickass App</h1>
      <div>
        {
          token
            ? (
              <div>Logged in as {username}</div>
              )
            : <Login setAuth={setAuth} />
        }

      </div>

    </div>
  )
}

export default App
