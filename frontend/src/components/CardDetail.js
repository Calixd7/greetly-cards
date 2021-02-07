import { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { getCard, deleteCard, updateCard, unsplashApi } from '../api'

function CardDetail ({ token }) {
  const { pk } = useParams()
  const [card, setCard] = useState()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [imageQuery, setImageQuery] = useState('')
  const [imageDisplay, setImageDisplay] = useState([])
  const [selectedImage, setSelectedImage] = useState([])
  const history = useHistory()

  console.log('selected image', selectedImage)
  useEffect(() => {
    getCard(token, pk)
      .then(card => setCard(card))
  }, [token, pk])

  function handleMessageUpdate (event) {
    event.preventDefault()
    setIsEditing(false)
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

  function handleImgSearch (event) {
    event.preventDefault()
    unsplashApi(imageQuery).then(data => setImageDisplay(data.results))
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
    <div className='page-container'>
      {card && (
        <div className='edit-card-main'>
          <div>
            <div className={`
            card-container 
            ${!selectedImage
            ? 'card-container-background-color'
            : { backgroundImage: `url(${selectedImage})` }
            }`}
            >
              {card.message}
            </div>
          </div>
          <div>
            <div>
              <button type='button' onClick={() => setIsEditing(true)}>Edit message</button>
            </div>
            <div>
              <button type='button' onClick={() => setIsDeleting(true)}>Delete card</button>
            </div>
          </div>
          {(isEditing && editingCard) || (isDeleting && deletingCard)}
          <p>
            <Link to='/card-list'>Go to card's list</Link>
          </p>
        </div>

      )}
      <div>
        <div>
          <div className='display-images-container'>
            {imageDisplay.map(image => (
              <div className='images' key={image.id} onClick={() => setSelectedImage(image.urls.small)}>
                <img src={image.urls.small} alt='images' />
              </div>
            ))}

          </div>
        </div>
        <form className='input-btn-form' onSubmit={handleImgSearch}>
          <input type='text' placeholder='search background image' value={imageQuery} onChange={e => setImageQuery(e.target.value)} />
          <button type='submit'>Search Image</button>
        </form>
      </div>
    </div>
  )
}

export default CardDetail
