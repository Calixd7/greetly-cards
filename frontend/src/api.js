import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

export function login (username, password) {
  return API
    .post('auth/token/login/', { // using Mokoon
      username: username,
      password: password
    })
    .then(result => result.data)
    .catch(error => {
      console.log({ error })
      if (error.response) {
        if (error.response.data.non_field_errors) {
          throw new Error(error.response.data.non_field_errors.join(' '))
        }
      }
      throw new Error('Something went wrong.')
    })
}

export function register (username, password) {
  return API
    .post('auth/users/', {
      username: username,
      password: password
    })
    .then(result => {
      return login(username, password)
    })
    .catch(error => {
      let errors = []
      if (error.response) {
        const data = error.response.data
        if (data.username) {
          errors = errors.concat(data.username)
        }
        if (data.password) {
          errors = errors.concat(data.password)
        }
      }

      if (errors.length === 0) {
        errors.push('There was a problem registering.')
      }
      const err = new Error(errors[0])
      throw err
    })
}

// export function login (username, password) {
//   return (axios
//     .post('http://localhost:3000/api/auth/users/', {
//       username: username,
//       password: password
//     })
//     .then((result) => result.data))
// }
