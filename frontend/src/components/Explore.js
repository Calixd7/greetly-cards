import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { getPublicCards, follow, unfollow, getLoggedInUser } from '../api'
import Card from './Card'

function Explore ({ token, card }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getPublicCards(token)
      .then(cards => setCards(cards))
  }, [token])

  if (!token) {
    return <Redirect to='/login' />
  }

  // const isFollowing = ( )

  function handleFollow (event, userToFollow) {
    event.preventDefault()
    getLoggedInUser(token)
      .then(data => {
        if (data.following.map(followee => (followee.following_user_id)).includes(userToFollow.username)) {
          console.log(data.following)
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
    <div>
      {cards.map(card => (
        <div key={card.url} className='card-container'>
          <div className='explore-card-container'>
            <Card card={card} scale={0.6} />
            <div onClick={(event) => handleFollow(event, card.author)}>
              {card.author.username}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Explore
