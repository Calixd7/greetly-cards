import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createCard } from '../api'

function Create ({ token, handleDone }) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [genre, setGenre] = useState('')

  if (!token) {
    return <Redirect to='/login' />
  }

  function handleSubmit (event) {
    event.preventDefault()
    setGenre('birthday')
    createCard(token, title, message, genre)
      .then(card => {
        handleDone(card)
      })
  }

  // function handleSubmit (event) {
  //   event.preventDefault()
  //   setGenre('birthday')
  //   axios.post('https://social-ecard.herokuapp.com/api/cards/',
  //     {
  //       genre: genre,
  //       message: message,
  //       title: title
  //     }, {
  //       headers: {
  //         Authorization: `Token ${token}`
  //       }
  //     })
  // }

  return (
    <div className='page-content create-card-content'>
      <div className='upper-palette-card-editor-container'>
        <div className='upper-palette'>
          <div>Drag & Drop palette</div>
        </div>
        <div className='card-editor-display'>
          <form onSubmit={handleSubmit}>
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
