import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { createCard } from '../api'
// import { countCards } from './CardList'

function Create ({ token, handleDone }) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [genre, setGenre] = useState('')
  const history = useHistory()

  console.log('handle done', handleDone)

  if (!token) {
    return <Redirect to='/login' />
  }

  function handleCardCreate (event) {
    event.preventDefault()
    createCard(token, title, message, genre)
      .then(card => {
        // countCards()
        if (handleDone) {
          handleDone(card)
        } else {
          history.push('/card-list')
        }
      })
  }

  return (
    <div className='page-container page-content create-card-content'>
      <div className='upper-palette-card-editor-container'>
        <div className='upper-palette'>
          <div>Drag & Drop palette</div>
        </div>
        <div className='card-editor-display'>
          <form onSubmit={handleCardCreate}>
            <div>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='message'>Message</label>
              <input
                type='text'
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='genre'>Genre</label>
              <input
                type='text'
                value={genre}
                onChange={e => setGenre(e.target.value)}
              />
            </div>
            <button type='submit'>Save Card</button>
          </form>
        </div>
      </div>
      <div className='side-palette'>

        <div>{title}</div>
        <div>{message}</div>
      </div>

    </div>
  )
}

export default Create
