import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { createCard, unsplashApi, updateCard } from '../api'
import Card from './Card'
import FontPalette from './FontPalette'
import CardBackgroundPalette from './CardBackgroundPalette'
import CardSettingsPalette from './CardSettingsPalette'

// import { countCards } from './CardList'

function handleCardCreate (event, history, token, handleDone, card) {
  event.preventDefault()
  if (card.pk) {
    updateCard(token, card.pk, card)
      .then(card => {
        history.push('/card-list')
      })
  } else {
    createCard(token, card)
      .then(card => {
        // countCards()
        if (handleDone) {
          handleDone(card)
        } else {
          history.push('/card-list')
        }
      })
  }
}

function Create ({ token, handleDone, card }) {
  const [unsplashPagination, setUnsplashPagination] = useState(1)
  // safeCard is a fallback for create mode if it has no card
  const safeCard = card || {}
  const [message, setMessage] = useState(safeCard.message || '')
  const [imageQuery, setImageQuery] = useState('')
  const [imageDisplay, setImageDisplay] = useState([])
  const [isDisplaying, setIsDisplaying] = useState(false)
  const [font, setSelectedFont] = useState(safeCard.font || 'Playfair Display, serif')
  const [color, setSelectedFontColor] = useState(safeCard.color || 'black')
  const [size, setSelectedFontSize] = useState(safeCard.size || 16)
  const [weight, setSelectedFontWeight] = useState(safeCard.weight || 'regular')
  const [style, setSelectedFontStyle] = useState(safeCard.style || 'regular')
  const [alignment, setSelectedFontAlignment] = useState(safeCard.alignment || 'left')
  const [textbackgroundcolor, setSelectedFontBackgroundColor] = useState(safeCard.textbackgroundcolor || 'none')
  const [textbackgroundopacity, setSelectedFontBackgroundOpacity] = useState(safeCard.textbackgroundopacity || 'none')
  const [textboxalignment, setSelectedMessagePlacement] = useState(safeCard.textboxalignment || 'center')
  const [image, setSelectedImage] = useState(safeCard.image || '')
  const [backgroundcolor, setSelectedBackgroundColor] = useState(safeCard.backgroundcolor || 'white')
  const [backgroundopacity, setSelectedBackgroundOpacity] = useState(safeCard.backgroundopacity || 'none')
  const [access, setSelectedAccess] = useState(safeCard.access || 'private')
  const [genre, setSelectedGenre] = useState(safeCard.genre || 'none')
  const history = useHistory()
  const pendingCard = {
    pk: safeCard.pk,
    genre: genre,
    access: access,
    message: message,
    size: size,
    color: color,
    style: style,
    font: font,
    weight: weight,
    alignment: alignment,
    textboxalignment: textboxalignment,
    image: image,
    textbackgroundopacity: textbackgroundopacity,
    backgroundopacity: backgroundopacity,
    backgroundcolor: backgroundcolor,
    textbackgroundcolor: textbackgroundcolor
  }

  if (!token) {
    return <Redirect to='/login' />
  }

  function handleImgSearch (event) {
    event.preventDefault()
    unsplashApi(imageQuery, unsplashPagination).then(data => { setImageDisplay(data.results); setIsDisplaying(true) })
  }

  const cardStyle = {
    alignItems: textboxalignment
  }

  if (backgroundcolor !== 'none') {
    cardStyle.backgroundColor = backgroundcolor
  } else {
    cardStyle.backgroundImage = `url(${image})`
    cardStyle.backgroundRepeat = 'no-repeat'
    cardStyle.backgroundSize = 'cover'
    cardStyle.opacity = backgroundopacity
  }

  return (

    <div className='create-content-images-container'>
      <div>
        <div className='page-content create-card-content'>
          <div className='card-editor-side-palette-container'>
            <div className='edit-card-main'>

              <form onSubmit={(e) => {
                e.preventDefault()
                handleCardCreate(e, history, token, handleDone, pendingCard)
              }}
              >
                <Card
                  card={pendingCard}
                  scale={0.7}
                  isEditing
                  setMessage={setMessage}
                />
                <label htmlFor='message' />
                <input
                  className='message-input-field'
                  type='text'
                  value={message}
                  placeholder='Message'
                  onChange={e => {
                    e.preventDefault()
                    setMessage(e.target.value)
                  }}
                />
                <button type='submit'>Save Card</button>
              </form>
            </div>
            <div className='side-palette'>
              <FontPalette font={font} setSelectedFont={setSelectedFont} color={color} setSelectedFontColor={setSelectedFontColor} size={size} setSelectedFontSize={setSelectedFontSize} weight={weight} setSelectedFontWeight={setSelectedFontWeight} style={style} setSelectedFontStyle={setSelectedFontStyle} alignment={alignment} setSelectedFontAlignment={setSelectedFontAlignment} textbackgroundcolor={textbackgroundcolor} setSelectedFontBackgroundColor={setSelectedFontBackgroundColor} textbackgroundopacity={textbackgroundopacity} setSelectedFontBackgroundOpacity={setSelectedFontBackgroundOpacity} textboxalignment={textboxalignment} setSelectedMessagePlacement={setSelectedMessagePlacement} />

              <CardBackgroundPalette backgroundcolor={backgroundcolor} setSelectedBackgroundColor={setSelectedBackgroundColor} setSelectedImage={setSelectedImage} imageQuery={imageQuery} setImageQuery={setImageQuery} backgroundopacity={backgroundopacity} setSelectedBackgroundOpacity={setSelectedBackgroundOpacity} handleImgSearch={handleImgSearch} setUnsplashPagination={setUnsplashPagination} setImageDisplay={setImageDisplay} setIsDisplaying={setIsDisplaying} />

              <CardSettingsPalette selectedGenre={genre} setSelectedGenre={setSelectedGenre} selectedAccess={access} setSelectedAccess={setSelectedAccess} />

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
              {isDisplaying &&
                <div>
                  <div className='unsplash-page-btns-container'>
                    <form
                      className='unsplash-page-btns'
                      onSubmit={handleImgSearch}
                    >
                      <button
                        disabled={unsplashPagination < 2}
                        className='logout-button'
                        onClick={(e) => setUnsplashPagination(unsplashPagination - 1)}
                      >
                        Prev
                      </button>
                      <button
                        className='logout-button'
                      >
                        Page {unsplashPagination}
                      </button>
                      <button
                        className='logout-button'
                        onClick={(e) => setUnsplashPagination(unsplashPagination + 1)}
                      >
                        Next
                      </button>
                    </form>
                  </div>
                </div>}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
