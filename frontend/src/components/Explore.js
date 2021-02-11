import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { getPublicCards, follow, unfollow, getLoggedInUser } from '../api'
import Card from './Card'

function Explore ({ token, card }) {
  const [cards, setCards] = useState([])
  // const [loggedInUser, setUser] = useState([])
  // const [author, setAuthor] = useState([])

  // console.log('set user', loggedInUser)
  // useEffect(() => {
  //   const user = getLoggedInUser(token).then(data => data.following.map(followee => (followee.following_user_id)))
  //   console.log('user', user)
  //   setUser(loggedInUser)
  //   console.log('user state', loggedInUser)
  // }, [token])

  useEffect(() => {
    getPublicCards(token)
      .then(cards => setCards(cards))
  }, [token])

  if (!token) {
    return <Redirect to='/login' />
  }

  // function displayFollowing () {
  //   console.log('card in following', cards)
  //   const author = cards.map(card => card.author.username)
  //   console.log('author in following', author)
  //   setAuthor(author)
  //   return console.log('user state', author)

  // if (user.includes(author)) {
  //   console.log('MATCH')
  // }
  // }
  // displayFollowing()

  function handleFollow (event, userToFollow) {
    event.preventDefault()
    getLoggedInUser(token)
      .then(data => {
        if (data.following.map(followee => (followee.following_user_id)).includes(userToFollow.username)) {
          console.log('data.following', data.following)
          let relationshipId = null
          for (const relationship of data.following) {
            if (relationship.following_user_id === userToFollow.username) {
              relationshipId = relationship.id
              console.log(relationshipId)
              unfollow(token, relationshipId)
                .then(data => {
                  console.log(data)
                })
            }
          }
        } else {
          follow(token, userToFollow.id)
            .then(data => {
              console.log(data)
            })
        }
      })
  }

  return (
    <div className='explore-content-container'>
      {cards.map(card => (
        <div key={card.url} className='explore-card-container'>
          <div className='card-matte'>
            <Card card={card} scale={0.5} />
            <div className='author-followers-container'>
              <div onClick={(event) => handleFollow(event, card.author)}>
                {card.author.username}
              </div>
              {/* <div>
                {isFollowing
                  ? 'Following'
                  : 'Follow User'}
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Explore
