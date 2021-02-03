import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

export function login (username, password) {
  return API
    .post('auth/user/', {
      username: username,
      password: password
    })
    .then(results => results.data)
}
