import { useState, useEffect } from 'react'
import Card from './Card'
import { useParams, useHistory } from 'react-router-dom'
import { getCard, deleteCard } from '../api'
import Create from './Create'

function ViewCard ({ token, setMessage }) {
  const { pk } = useParams()
  const [card, setCard] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const history = useHistory()

  useEffect(() => {
    getCard(token, pk)
      .then(c => setCard(c))
  }, [])

  function handleDeleteCard (event, pk) {
    event.preventDefault()
    deleteCard(token, pk)
      .then(card => history.push('/card-list'))
  }

  if (isEditing) {
    return (
      <div>
        <Create token={token} card={card} pk={card.pk} />
      </div>
    )
  }

  if (card) {
    return (
      <div className='view-card-container'>
        <Card card={card} scale={0.7} />
        <div className='buttons'>
          <button
            className='logout-button'
            onClick={() => setIsEditing(true)}
          >Edit
          </button>
          <button
            className='logout-button'
            onClick={() => history.push('/card-list')}
          >Back to Cards
          </button>
          <button
            className='logout-button'
            onClick={(e) => handleDeleteCard(e, card.pk)}
          >
            Delete
          </button>
        </div>
      </div>

    )
  }
  return 'This is where I will put a loading spinner'
}

export default ViewCard
