import { useState, useEffect } from 'react'
import { getFriendsCards } from '../api'
import { Redirect } from 'react-router-dom'

import Card from './Card'

function Friends ({ token, card }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getFriendsCards(token)
      .then(cards => setCards(cards))
  }, [token])

  if (!token) {
    return <Redirect to='/login' />
  }
  //  set id state
  //   useEffect(() => {
  //     getFriendsIds(token)
  //       .then(cards => setFriendsIds(cards.following.map(id => id.id)))
  //   }, [token])

  //   //   get friends cards from id state
  //   useEffect(() => {
  //     friendsIds.map(singleId => {
  //       return getFriendsCards(token, singleId).then(newCards => console.log('new cards', newCards))
  //     }, [token])
  //   })

  return (
    <div className='view-card-container'>

      {cards.map(card => (
        <div key={card.url} className='card-container'>
          <div className='explore-card-container'>
            <div className='card-matte'>
              <Card card={card} scale={0.5} />
              {card.author.username}
            </div>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Friends
