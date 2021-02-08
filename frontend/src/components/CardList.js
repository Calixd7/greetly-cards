import { useEffect, useState } from 'react'
import { getCards } from '../api'
import { Redirect, Link } from 'react-router-dom'
import Create from './Create'

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
            <div>
              {card.title}
            </div>
            <div>
              <Link to={`/c/${card.pk}`}>{card.message}</Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CardList

//   return (
//     <div>
//       <h2>Cards</h2>
//       <div>
//         <Link to='/create'>Create a New Card</Link>
//       </div>
//       <ul>
//         {cards.map(card => (
//           <li key={card.url}>
//             <Link to='/c/{card.pk}'>{card.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
