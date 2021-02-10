import { useState, useEffect } from 'react'
import { getFriendsCards, getPublicCards, getFriendsIds } from '../api'
import Card from './Card'

function Friends ({ token, card }) {
  const [cards, setCards] = useState([])
  const [friendsCount, setFriendsCount] = useState(0)
  const [friendsIds, setFriendsIds] = useState([])

  console.log('cards', cards)
  //   get Friend Count
  useEffect(() => {
    getFriendsCards(token)
      .then(cards => setCards(cards))
  }, [token])

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
      <div>Number of friends {friendsCount} </div>
      {cards.map(card => (
        <div key={card.url} className='card-container'>
          <div className='explore-card-container'>
            <Card card={card} scale={0.6} />
          </div>
        </div>
      ))}
    </div>

  )
}

export default Friends
