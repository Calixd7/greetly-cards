import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { createCard, unsplashApi } from '../api'
import { calculateFontSizes, calculateOpacityOptions } from '../functions'
import FontPalette from './FontPalette'
import CardBackgroundPalette from './CardBackgroundPalette'
import CardSettingsPalette from './CardSettingsPalette'
// import { countCards } from './CardList'

function Create ({ token, handleDone }) {
  // const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [imageQuery, setImageQuery] = useState('')
  const [imageDisplay, setImageDisplay] = useState([])
  const [selectedFont, setSelectedFont] = useState('Playfair Display, serif')
  const [selectedFontColor, setSelectedFontColor] = useState('Black')
  const [selectedFontSize, setSelectedFontSize] = useState(16)
  const [selectedFontWeight, setSelectedFontWeight] = useState('Regular')
  const [selectedFontStyle, setSelectedFontStyle] = useState('Regular')
  const [selectedFontAlignment, setSelectedFontAlignment] = useState('Left')
  const [selectedFontBackgroundColor, setSelectedFontBackgroundColor] = useState('none')
  const [selectedFontBackgroundOpacity, setSelectedFontBackgroundOpacity] = useState('none')
  const [selectedMessagePlacement, setSelectedMessagePlacement] = useState('center')
  const [selectedImage, setSelectedImage] = useState([])
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('none')
  const [selectedBackgroundOpacity, setSelectedBackgroundOpacity] = useState('none')
  const [selectedAccess, setSelectedAccess] = useState('private')
  const [selectedGenre, setSelectedGenre] = useState('none')
  const history = useHistory()

  if (!token) {
    return <Redirect to='/login' />
  }

  function handleCardCreate (event) {
    event.preventDefault()
    createCard(token, message)
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
    <div className='create-content-images-container'>
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
                    textAlign: `${selectedFontAlignment}`,
                    border: 'none',
                    background: `${selectedFontBackgroundColor}`,
                    opacity: `${selectedFontBackgroundOpacity}`
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
            <FontPalette selectedFont={selectedFont} setSelectedFont={setSelectedFont} selectedFontColor={selectedFontColor} setSelectedFontColor={setSelectedFontColor} selectedFontSize={selectedFontSize} setSelectedFontSize={setSelectedFontSize} selectedFontWeight={selectedFontWeight} setSelectedFontWeight={setSelectedFontWeight} selectedFontStyle={selectedFontStyle} setSelectedFontStyle={setSelectedFontStyle} selectedFontAlignment={selectedFontAlignment} setSelectedFontAlignment={setSelectedFontAlignment} selectedFontBackgroundColor={selectedFontBackgroundColor} setSelectedFontBackgroundColor={setSelectedFontBackgroundColor} selectedFontBackgroundOpacity={selectedFontBackgroundOpacity} setSelectedFontBackgroundOpacity={setSelectedFontBackgroundOpacity} selectedMessagePlacement={selectedMessagePlacement} setSelectedMessagePlacement={setSelectedMessagePlacement} />

            <CardBackgroundPalette selectedBackgroundColor={selectedBackgroundColor} setSelectedBackgroundColor={setSelectedBackgroundColor} setSelectedImage={setSelectedImage} imageQuery={imageQuery} setImageQuery={setImageQuery} selectedBackgroundOpacity={selectedBackgroundOpacity} setSelectedBackgroundOpacity={setSelectedBackgroundOpacity} handleImgSearch={handleImgSearch} />

            <CardSettingsPalette selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} selectedAccess={selectedAccess} setSelectedAccess={setSelectedAccess} />

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
