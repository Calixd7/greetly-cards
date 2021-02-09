import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { getPublicCards, follow } from '../api'

function Explore ({ token }) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getPublicCards(token)
      .then(cards => setCards(cards))
  }, [token])

  console.log(cards)

  if (!token) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      {cards.map(card => (
        <div key={card.url} className='card-container'>
          <div className='card-container-child'>
            <Link to={`/view-card/${card.pk}`} style={{ textDecorationLine: 'none' }}>
              <div
                className='explore-card-container'
                style={{
                  alignItems: `${card.textboxalignment}`,
                  textAlign: `${card.alignment}`,
                  backgroundColor: `${card.backgroundcolor}`,
                  backgroundImage: `url(${card.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  opacity: `${card.backgroundopacity}`
                }}
              >
                <div
                  className='message-input-field'
                  style={{
                    fontFamily: `${card.font}`,
                    color: `${card.color}`,
                    fontSize: `${card.size}px`,
                    fontWeight: `${card.weight}`,
                    fontStyle: `${card.style}`,
                    backgroundColor: `${card.textbackgroundcolor}`,
                    opacity: `${card.textbackgroundopacity}`
                  }}
                >
                  {card.message} -- {card.author.username}
                </div>
              </div>
            </Link>
          </div>

        </div>
      ))}
    </div>
  )
}

export default Explore
