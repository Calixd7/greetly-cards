import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api/auth'
})

export function login (username, password) {
  return API
    .post('users/', { // using Mokoon
      username: username,
      password: password
    })
    .then(result => result.data)
  console.log(data)
}
