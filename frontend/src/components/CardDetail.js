import { useEffect, useState } from 'react'
import { Redirect, useParams, Link, useHistory } from 'react-router-dom'
import { getCard, deleteCard, updateCard } from '../api'

function CardDetail ({ token }) {
  const { pk } = useParams()
  const [card, setCard] = useState()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const history = useHistory()

  useEffect(() => {
    getCard(token, pk)
      .then(card => setCard(card))
  }, [token, pk])
  console.log('card in CardDetail', card)

  function handleMessageUpdate (event) {
    event.preventDefault()
    setIsEditing(false)
    console.log('handleMessage token', token)
    updateCard(token, pk, { message: newMessage })
      .then(card => {
        setCard(card)
        history.push('/card-list')
      })
  }

  function handleDeleteCard (event) {
    event.preventDefault()
    setIsDeleting(false)
    deleteCard(token, pk)
      .then(card => history.push('/card-list'))
  }

  const editingCard = (
    <div>
      <form onSubmit={handleMessageUpdate}>
        <input type='text' value={newMessage} onChange={e => setNewMessage(e.target.value)} />
        <button type='submit'>Update message</button>
      </form>
    </div>
  )

  const deletingCard = (
    <div>
      <form onSubmit={handleDeleteCard}>
        <input type='text' value='Are you sure you want to delete?' onChange={e => setNewMessage(e.target.value)} />
        <button type='submit'>Delete Card</button>
      </form>
    </div>
  )

  return (
    <div>
      {card && (
        <div>
          <div>
            <div>
              Card detail page: Display Card here
            </div>
            <div>{card.message}</div>
          </div>
          <div>
            <button type='button' onClick={() => setIsEditing(true)}>Edit message</button>
          </div>
          <div>
            <button type='button' onClick={() => setIsDeleting(true)}>Delete card</button>
          </div>
          {(isEditing && editingCard) || (isDeleting && deletingCard)}
          <p>
            <Link to='/card-list'>Go to card's list</Link>
          </p>
        </div>

      )}
    </div>
  )
}

export default CardDetail
