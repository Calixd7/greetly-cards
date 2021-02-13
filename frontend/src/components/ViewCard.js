import { useState, useEffect } from 'react'
import Card from './Card'
import { useParams, useHistory } from 'react-router-dom'
import { getCard, deleteCard, getLoggedInUser } from '../api'
import Create from './Create'
// import CardList from './CardList'

function ViewCard ({ token, setMessage, scale }) {
  const { pk } = useParams()
  const [card, setCard] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const history = useHistory()
  const [loggedInUserName, setUserName] = useState('')

  useEffect(() => {
    getCard(token, pk)
      .then(c => setCard(c))
  }, [token, pk])
  console.log('', card)

  function handleDeleteCard (event, pk) {
    event.preventDefault()
    deleteCard(token, pk)
      .then(card => history.push('/card-list'))
  }

  // *******************
  // Get User Name
  // *******************

  useEffect(() => {
    getLoggedInUser(token)
      .then(data => {
        setUserName(data.username)
      })
  }, [token])

  // *******************
  // Get Card Author Name
  // *******************
  if (!card || !loggedInUserName) {
    return 'loading'
  }
  const cardAuthor = card.author.username

  console.log('scale', scale)

  if (isEditing) {
    return (
      <div>
        <Create token={token} card={card} pk={card.pk} />
      </div>
    )
  }

  if (loggedInUserName !== cardAuthor) {
    return (
      <div className='view-card-container'>
        <Card card={card} scale={0.7} />
        <button
          className='logout-button'
          onClick={() => history.goBack(-1)}
        >Back to Cards
        </button>
      </div>
    )
  }

  if (card) {
    return (
      <div>
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
              onClick={() => history.goBack()}
            >Back to Cards
            </button>
            <button
              className='logout-button'
              onClick={(e) => handleDeleteCard(e, card.pk)}
            >
              Delete
            </button>)
          </div>
        </div>
        {/* <div>
          <button>increase
          </button>
          <button>decrease
          </button>
        </div> */}
      </div>

    )
  }
  return 'This is where I will put a loading spinner'
}

export default ViewCard
