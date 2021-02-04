import { useState, useEffect } from 'react'
import axios from 'axios'

function Create ({ token, username }) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [genre, setGenre] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
    // setGenre('birthday')
  }

  useEffect(() => {
    axios.post('https://social-ecard.herokuapp.com/api/cards/',
      {
        genre: 'birthday',
        message: 'Hello World',
        title: 'Greetings',
        author: 'Dan'
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
  }, [])

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
            <button type='submit'>Submit</button>
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
