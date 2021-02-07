import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { getCards } from '../api'

function Explore ({ token }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getCards(token)
      .then(cards => setCards(cards))
  }, [token])

  console.log(cards)

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div className='page-content'>
        <h3>All users cards here by genre:</h3>
        <ul>
          {cards.map(card => (
            <li key={card.url}>
              {card.genre}
            </li>
          )
          )}
        </ul>
      </div>
  )
}

export default Explore
