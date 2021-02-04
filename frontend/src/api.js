import axios from 'axios'

const API = axios.create({
  baseURL: 'https://social-ecard.herokuapp.com/api/'
})

export function login (username, password) {
  return API
    .post('auth/token/login/', { // using deployed API!!!
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

export function getCards (token) {
  return API
    .get('https://social-ecard.herokuapp.com/api/cards/',
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => res.data)
}

// export function createCards (token) {
//   return API
//     .post('cards/')
// }
