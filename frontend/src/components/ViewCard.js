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
        <Card card={card} scale={1} />
        <div className='buttons'>
          <button
            onClick={() => setIsEditing(true)}
          >Edit
          </button>
          <button
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
