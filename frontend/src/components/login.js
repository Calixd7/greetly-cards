import { useState } from 'react'
import { login } from '../api'

function Login ({ setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
    login(username, password)
      .then(data => {
        setAuth(username, data)
        console.log(setAuth())
      })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          required
          value={username}
          id='username'
          onChange={event => setUsername(event.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          required
          value={password}
          id='password'
          onChange={event => setPassword(event.target.value)}
        />
        <button type='submit'>Login</button>
      </form>

    </div>

  )
}

export default Login
