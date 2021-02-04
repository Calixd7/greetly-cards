import { useState, useEffect } from 'react'
import axios from 'axios'

function Create () {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
  }

  useEffect(() => {
    axios.post('https://social-ecard.herokuapp.com/api/cards/',
      {
        author: title,
        message: body
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
              <label htmlFor='body'>Body</label>
              <input
                type='text'
                value={body}
                onChange={e => setBody(e.target.value)}
              />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
      <div className='side-palette'>

        <div>{title}</div>
        <div>{body}</div>
      </div>

    </div>
  )
}

export default Create
