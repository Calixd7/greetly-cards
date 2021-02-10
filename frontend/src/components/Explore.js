import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { getPublicCards, follow, unfollow } from '../api'
import Card from './Card'

function Explore ({ token, card }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getPublicCards(token)
      .then(cards => setCards(cards))
  }, [token])

  // console.log(cards)

  if (!token) {
    return <Redirect to='/login' />
  }

  //  touser is followee, fromuser is follower
  // onclick follow if not followed, unfollow if followed

  function handleFollow (event, userId) {
    event.preventDefault()
    follow(token, userId)
      .then(data => console.log(data)
      )
  }

  // function handleFollow (event, authorId) {
  //   event.preventDefault()
  //   if (true) {
  //     follow(token, authorId)
  //       .then(data => {
  //         console.log(data)
  //       })
  //   } else {
  //     unfollow(token, authorId)
  //       .then(data => {
  //         console.log(data)
  //       })
  //   }
  // }

  return (
    <div>
      {cards.map(card => (
        <div key={card.url} className='card-container'>
          <div className='explore-card-container'>
            <Card card={card} scale={0.6} />
            <div onClick={(event) => handleFollow(event, card.author.id)}>
              {card.author.username}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Explore
