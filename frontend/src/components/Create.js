import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { createCard, unsplashApi } from '../api'
// import { countCards } from './CardList'

function Create ({ token, handleDone }) {
  // const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [genre, setGenre] = useState('')
  const [imageQuery, setImageQuery] = useState('')
  const [imageDisplay, setImageDisplay] = useState([])
  const [selectedImage, setSelectedImage] = useState([])
  const history = useHistory()

  if (!token) {
    return <Redirect to='/login' />
  }

  function handleCardCreate (event) {
    event.preventDefault()
    createCard(token, message, genre)
      .then(card => {
        // countCards()
        if (handleDone) {
          handleDone(card)
        } else {
          history.push('/card-list')
        }
      })
  }

  function handleImgSearch (event) {
    event.preventDefault()
    unsplashApi(imageQuery).then(data => setImageDisplay(data.results))
  }

  return (
    <div className='page-content create-card-content'>
      <div className='card-editor-side-palette-container'>
        <div className='edit-card-main'>
          <form onSubmit={handleCardCreate}>
            <div className='card-container'>
              <label htmlFor='message' />
              <input
                type='text'
                value={message}
                placeholder='Message'
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <button type='submit'>Save Card</button>
          </form>
        </div>
        <div className='side-palette'>
          <div className='palette-object'>
            <div className='object-title'>Font</div>
            <div className='object-value'>selection</div>
          </div>
          <div className='palette-object'>
            <div className='object-title'>Background Color</div>
            <div className='object-value'>selection</div>
          </div>
        </div>
      </div>
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

export default Create
