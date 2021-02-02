import { useState } from 'react'
import axios from 'axios'

function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
    // console.log('user: ', username)
    // console.log('password: ', password)
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
