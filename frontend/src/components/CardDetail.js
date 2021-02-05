import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCard } from '../api'

function CardDetail ({ token }) {
  const { pk } = useParams()
  const [card, setCard] = useState()

  useEffect(() => {
    getCard(token, pk)
      .then(card => setCard(card))
  }, [token, pk])
  console.log('card', card)

  return (
    <div>
      {card && (

        <div>
          <div>
            Card detail page: Display Card here
          </div>
          <div>{card.message}</div>
        </div>
      )}
    </div>
  )
}

export default CardDetail
