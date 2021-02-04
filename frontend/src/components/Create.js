import { useState, useEffect } from 'react'
import axios from 'axios'

function Create ({ token }) {
  const [author, setAuthor] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
  }

  useEffect(() => {
    axios.post('https://social-ecard.herokuapp.com/api/cards/',
      {
        author: author,
        message: message
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
              <label htmlFor='author'>Author</label>
              <input
                type='text'
                value={author}
                onChange={e => setAuthor(e.target.value)}
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

        <div>{author}</div>
        <div>{message}</div>
      </div>

    </div>
  )
}

export default Create
