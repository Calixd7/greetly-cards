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

  function testing () {
    cards.map(card => console.log('card', card.size))
  }

  testing()

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
              <div className='edit-card-main'>
                <div
                  className='create-card-container'
                  // style={cardStyle}
                >
                  <div
                    className='message-input-field'
                    style={{
                      fontFamily: `${card.font}`,
                      color: `${card.color}`,
                      fontSize: `${card.size}px`,
                      fontWeight: `${card.weight}`,
                      fontStyle: `${card.style}`,
                      textAlign: `${card.alignment}`

                    }}
                  />
                  {card.message}
                </div>
              </div>
              <div />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CardList
