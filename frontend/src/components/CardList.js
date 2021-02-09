import { useEffect, useState } from 'react'
import { getCards } from '../api'
import { Redirect, Link } from 'react-router-dom'
import Create from './Create'

// save for later if we need the syntax
{ /* <Link to={`/c/${card.pk}`}>{card.message}</Link> */ }

function CardList ({ token }) {
  const [cards, setCards] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [cardListLength, setCardListLength] = useState(0)

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
        <div>
          {isCreating
            ? <Create
                token={token} handleDone={(newCard) => {
                  setIsCreating(false)
                  setCards([...cards, newCard])
                }}
              />
            : (<button onClick={() => setIsCreating(true)}>Create New Card</button>)}

        </div>
        <div>
          {cards.map(card => (
            <div key={card.url} className='card-container'>
              <div className='card-container-child'>
                <div
                  className='create-card-container'
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
                    {card.message}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardList
