import axios from 'axios'

const API = axios.create({
  baseURL: 'https://social-ecard.herokuapp.com/api/'
})

export function login (username, password) {
  return API
    .post('auth/token/login/', {
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
    .get('cards/me/?limit=50&offset=0',
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    // .then(res => res.data.results)
    .then(res => {
      return res.data.results
    })
}

export function createCard (token, card) {
  return API.post('cards/', card, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
    .then(response => response.data)
}

export function getCard (token, pk) {
  return API
    .get(`cards/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => response.data)
}

export function getPublicCards (token) {
  return API
    .get('cards/all/?limit=50&offset=0',
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
    .then(res => {
      return res.data.results
    })
}

export function follow (token, id) {
  return API.post('followers/', {
    touser: id
  }, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
    .then(response => response.data)
}

export function unfollow (token, id) {
  return API
    .delete('followers/id', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => response.data)
}

export function updateCard (token, pk, card) {
  return API
    .put(`cards/${pk}/`, card, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data.results)
}

export function deleteCard (token, pk) {
  return API
    .delete(`cards/${pk}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(res => res.data)
}

// *********************************
//      Unsplash API Request
// *********************************

const accessKey = 'TlQHhYwlF1gKtsQqX6twCM-WUusQSXgDFW1AhVOgat8'
const secretKey = 'mo2cz5JNJfiM6W-HpVMUfMMQa7P_48maYN_e9r8HBIU'

export function unsplashApi (query, page) {
  return axios.get(`https://api.unsplash.com/search/photos/?page=${page}&client_id=${accessKey}&query=${query}&orientation=landscape`)
    .then(res => res.data)
}
