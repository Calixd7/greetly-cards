import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { createCard, unsplashApi } from '../api'
import { calculateFontSizes, calculateOpacityOptions } from '../functions'
// import { countCards } from './CardList'

function Create ({ token, handleDone }) {
  // const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [genre, setGenre] = useState('')
  const [imageQuery, setImageQuery] = useState('')
  const [imageDisplay, setImageDisplay] = useState([])
  const [selectedFont, setSelectedFont] = useState('Playfair Display, serif')
  const [selectedFontColor, setSelectedFontColor] = useState('Black')
  const [selectedFontSize, setSelectedFontSize] = useState(16)
  const [selectedFontWeight, setSelectedFontWeight] = useState('Regular')
  const [selectedFontStyle, setSelectedFontStyle] = useState('Regular')
  const [selectedFontAlignment, setSelectedFontAlignment] = useState('Left')
  const [selectedMessagePlacement, setSelectedMessagePlacement] = useState('center')
  const [selectedImage, setSelectedImage] = useState([])
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('none')
  const [selectedBackgroundOpacity, setSelectedBackgroundOpacity] = useState('none')
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
    unsplashApi(imageQuery).then(data => { setImageDisplay(data.results); setImageQuery('') })
  }

  return (
    <div className='page-content create-card-content'>
      <div className='card-editor-side-palette-container'>
        <div className='edit-card-main'>
          <form onSubmit={handleCardCreate}>
            <div
              className='create-card-container'
              style={selectedBackgroundColor !== 'none'
                ? { backgroundColor: `${selectedBackgroundColor}` }
                : {
                    backgroundImage: `url(${selectedImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    opacity: `${selectedBackgroundOpacity}`
                  }}
              // style={{
              //   alignItems: `${selectedMessagePlacement}`
              // }}

            >
              <label htmlFor='message' />
              <input
                className='message-input-field'
                style={{
                  fontFamily: `${selectedFont}`,
                  color: `${selectedFontColor}`,
                  fontSize: `${selectedFontSize}px`,
                  fontWeight: `${selectedFontWeight}`,
                  fontStyle: `${selectedFontStyle}`,
                  textAlign: `${selectedFontAlignment}`
                }}
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
            <div className='object-value-container'>
              <div className='object-value'>Font</div>
              <select className='select-tag' value={selectedFont} onChange={e => setSelectedFont(e.currentTarget.value)}>
                <option value='Playfair Display, serif'>Playfair Display</option>
                <option value='Dancing Script, cursive'>Dancing Script</option>
                <option value='Inconsolata, monospace'>Inconsolata</option>
              </select>
            </div>
            <div className='object-value-container'>
              <div className='object-value'>Color</div>
              <select className='select-tag' value={selectedFontColor} onChange={e => setSelectedFontColor(e.currentTarget.value)}>
                <option value='#000000'>Black</option>
                <option value='#FFFFFF'>White</option>
                <option value='#FF0000'>Red</option>
                <option value='#00FF00'>Green</option>
                <option value='#FFFFFF'>White</option>
                <option value='#0000FF'>Blue</option>
                <option value='#FFFF00'>Yellow</option>
                <option value='#00FFFF'>Cyan</option>
                <option value='#FF00FF'>Magenta</option>

              </select>
            </div>
            <div className='object-value-container'>
              <div className='object-value'>Size</div>
              <select className='select-tag' value={selectedFontSize} onChange={e => setSelectedFontSize(e.currentTarget.value)}>
                {calculateFontSizes().map(num =>
                  <option key={num} value={num}>{num}</option>
                )}
              </select>
            </div>
            <div className='object-value-container'>
              <div className='object-value'>Weight</div>
              <select className='select-tag' value={selectedFontWeight} onChange={e => setSelectedFontWeight(e.currentTarget.value)}>
                <option value='regular'>Regular</option>
                <option value='bold'>Bold</option>
              </select>
            </div>
            <div className='object-value-container'>
              <div className='object-value'>Style</div>
              <select className='select-tag' value={selectedFontStyle} onChange={e => setSelectedFontStyle(e.currentTarget.value)}>
                <option value='regular'>Regular</option>
                <option value='italics'>Italics</option>
              </select>
            </div>
            <div className='object-value-container'>
              <div className='object-value'>Text Alignment</div>
              <select className='select-tag' value={selectedFontAlignment} onChange={e => setSelectedFontAlignment(e.currentTarget.value)}>
                <option value='left'>Left</option>
                <option value='center'>Center</option>
                <option value='right'>Right</option>
              </select>
            </div>
            <div className='object-value-container'>
              <div className='object-value'>Message Placement</div>
              <select className='select-tag' value={selectedMessagePlacement} onChange={e => setSelectedMessagePlacement(e.currentTarget.value)}>
                <option value='flex-start'>Top</option>
                <option value='center'>Center</option>
                <option value='flex-end'>Bottom</option>
              </select>
            </div>
          </div>

          <div className='palette-object'>
            <div className='object-title'>Card Background</div>
            <div className='background-objects'>
              <div className='object-value-container'>
                <div className='object-value'>Color
                  <select className='select-tag' value={selectedBackgroundColor} onChange={e => { setSelectedBackgroundColor(e.currentTarget.value); setSelectedImage([]) }}>
                    <option value='none'>none</option>
                    <option value='#678'>Grey</option>
                    <option value='#F1FAEE'>Honeydew</option>
                    <option value='#457B9D'>Celadon Blue</option>
                  </select>
                </div>
              </div>
              <div>
                <form className='palette-input-btn-form' onSubmit={handleImgSearch}>
                  <label className=''>Image</label>
                  <input type='text' placeholder='search background image' value={imageQuery} onChange={e => setImageQuery(e.target.value)} />
                  <button type='submit'>Search Image</button>
                </form>
              </div>
              <div className='object-value-container'>
                <div className='object-value'>Opacity
                  <select className='select-tag' value={selectedBackgroundOpacity} onChange={e => setSelectedBackgroundOpacity(e.currentTarget.value)}>
                    <option value='none'>none</option>
                    {calculateOpacityOptions().map(num =>
                      <option key={num} value={num}>{num}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className='display-images-container'>
            {imageDisplay.map(image => (
              <div className='images' key={image.id} onClick={() => { setSelectedImage(image.urls.small); setSelectedBackgroundColor('none') }}>
                <img src={image.urls.small} alt='images' />
              </div>
            ))}

          </div>
        </div>

      </div>

    </div>
  )
}

export default Create
