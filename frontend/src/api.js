import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api/auth'
})

export function login (username, password) {
  return API
    .post('user/', {
      username: username,
      password: password
    })
    .then(results => results.data)
}
