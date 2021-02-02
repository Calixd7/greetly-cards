import { useState } from 'react'
import axios from 'axios'
import { login } from '../api'

function Login ({ setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()

  function handleSubmit (event) {
    event.preventDefault()
    login(username, password)
      .then(data => {
        // console.log(data)
        if (data && data.auth_token) {
          setAuth(username, data.auth_token)
        }
      })
      .catch(error => {
        setErrors(error.message)
      })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {errors && (
          <div>{errors}</div>
        )}
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
        <button type='submit'>Log in</button>
      </form>

    </div>

  )
}

export default Login
