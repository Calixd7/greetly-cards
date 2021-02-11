import { useEffect, useState } from 'react'
import { getCards } from '../api'
import { Redirect } from 'react-router-dom'
import Card from './Card'

function CardList ({ token }) {
  const [cards, setCards] = useState([])
  const [cardListLength, setCardListLength] = useState(0)
  const scale = 0.5

  useEffect(updateCards, [token])

  function updateCards () {
    getCards(token).then(cards => setCards(cards))
    setCardListLength(cards.length)
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div className='page-container'>
      <div className='CardList'>
        <h2>My Cards</h2>
        <div>Number of Cards: {cardListLength}</div>
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
