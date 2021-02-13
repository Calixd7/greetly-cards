import { useState } from 'react'
import { login } from '../api'
import { Redirect } from 'react-router-dom'

function Login ({ isLoggedIn, setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

  function handleSubmit (event, isLoggedIn) {
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
    <div className='page-container'>
      <h2 className='log-reg-header'>Login</h2>
      <form className='log-reg-header-form' onSubmit={handleSubmit}>
        {errors && (
          <div className='errors'>{errors}</div>
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
        <button className='log-reg-button' type='submit'>Log in</button>
      </form>

    </div>

  )
}

export default Login
