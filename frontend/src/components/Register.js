import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { register } from '../api'

function Register ({ isLoggedIn, setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()

  if (isLoggedIn) {
    return <Redirect to='/login' />
  }

  function handleSubmit (event) {
    event.preventDefault()
    register(username, password)
      .then(data => {
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
      <h2 className='log-reg-header'>Register or <Link to='/login'>Login</Link></h2>
      <form className='log-reg-header-form' onSubmit={handleSubmit}>
        {errors && (
          <div className='errors'>{errors}</div>
        )}

        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <button className='log-reg-button' type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
