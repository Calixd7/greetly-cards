import { getLoggedInUser } from './api'

export function calculateFontSizes () {
  const sizeOptions = []

  for (let i = 16; i <= 98; i += 2) {
    sizeOptions.push(i)
  }
  return sizeOptions
}

export function calculateOpacityOptions () {
  const opacityOptions = []

  for (let i = 1; i < 10; i++) {
    opacityOptions.push(i / 10)
  }
  return opacityOptions
}

// got logged in user
export function getUserInfo (token) {
  let userName = ''
  getLoggedInUser(token)
    .then(data => {
      userName = data.username
      // console.log('user info', userName)
    })

  return userName
}

//   console.log('user', user)

// export function CountCards (cards) {
//   setCardListLength(cards.length)
// }
