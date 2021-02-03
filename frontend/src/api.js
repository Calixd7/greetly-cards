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
    .then((result) => result.data)
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

// export function login (username, password) {
//   return (axios
//     .post('http://localhost:3000/api/auth/users/', {
//       username: username,
//       password: password
//     })
//     .then((result) => result.data))
// }
