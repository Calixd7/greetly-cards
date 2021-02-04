import { useEffect, useState } from 'react'
import { getCards } from '../api'
import { Redirect, Link } from 'react-router-dom'

function CardList ({ token }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getCards(token).then(cards => setCards(cards))
  }, [token])

  if (!token) {
    return <Redirect to='/Login' />
  }

  return (
    <div>
      <h2>Cards</h2>
      <div>
        <Link to='/create-card'>Create a New Card</Link>
      </div>
      <ul>
        {cards.map(card => (
          <li key={card.url}>
            <Link to={`/c/${card.pk}`}>{card.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardList
