import { useEffect, useState } from 'react'
import { getCards } from '../api'
import { Redirect } from 'react-router-dom'
import Card from './Card'

function CardList ({ token }) {
  const [cards, setCards] = useState([])
  const scale = 0.5

  useEffect(updateCards, [token])

  function updateCards () {
    getCards(token).then(cards => setCards(cards))
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div className='page-container'>
      <div className='CardList'>
        <h2>My Cards</h2>
        <div className='card-list-display-container'>
          {cards.map(card => (
            <Card key={card.url} card={card} scale={scale} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardList
