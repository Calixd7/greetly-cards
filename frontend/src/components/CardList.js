import { useEffect, useState } from 'react'
import { getCards } from '../api'
import { Redirect } from 'react-router-dom'

function CardList ({ token }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getCards(token).then(cards => setCards(cards))
  }, [token])

  if (!token) {
    return <Redirect to='/Home' />
  }

  return (
    <div>
      <h2>Cards</h2>
      <ul>
        {cards.map(card => (
          <li key={card.title}>
            {card.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardList
