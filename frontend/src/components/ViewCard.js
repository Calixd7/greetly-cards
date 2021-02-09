import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCard, deleteCard, updateCard } from '../api'

function ViewCard ({ token }) {
  const { pk } = useParams()
  const [card, setCard] = useState()
  const [isDeleting, setIsDeleting] = useState(false)
  const history = useHistory()

  //   load page with selected card
  useEffect(() => {
    getCard(token, pk)
      .then(card => setCard(card))
  }, [token, pk])
  console.log('card', card)

  //   put request to edit current card
  function handleMessageUpdate (event) {
    event.preventDefault()
    //   setIsEditing(false)
    updateCard(token, pk)
      .then(card => {
        setCard(card)
        history.push('/card-list')
      })
  }

  //   function handleDeleteCard (event) {
  //     event.preventDefault()
  //     setIsDeleting(false)
  //     deleteCard(token, pk)
  //       .then(card => history.push('/card-list'))
  //   }

  return (
    <div>
      <div className='view-card-container'>
        <div className='card-container-child'>
          <div
            className='create-card-container'
            style={{
              alignItems: `${card.textboxalignment}`,
              textAlign: `${card.alignment}`,
              backgroundColor: `${card.backgroundcolor}`,
              backgroundImage: `url(${card.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              opacity: `${card.backgroundopacity}`
            }}
          >
            <div
              className='message-input-field'
              style={{
                fontFamily: `${card.font}`,
                color: `${card.color}`,
                fontSize: `${card.size}px`,
                fontWeight: `${card.weight}`,
                fontStyle: `${card.style}`,
                backgroundColor: `${card.textbackgroundcolor}`,
                opacity: `${card.textbackgroundopacity}`

              }}
            >
              {card.message}
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <button onClick={() => setIsEditing(true)}>Edit Card</button> */}
      </div>
    </div>
  )
}

export default ViewCard

// save in case you need it in the update function:
//   genre: `${card.genre}`,
//   access: `${card.access}`,
//   message: `${card.message}`,
//   size: `${card.size}`,
//   color: `${card.color}`,
//   style: `${card.style}`,
//   font: `${card.font}`,
//   weight: `${card.weight}`,
//   alignment: `${card.alignment}`,
//   textboxalignment: `${card.textboxalignment}`,
//   image: `${card.image}`,
//   textbackgroundopacity: `${card.textbackgroundopacity}`,
//   backgroundopacity: `${card.backgroundopacity}`,
//   backgroundcolor: `${card.backgroundcolor}`,
//   textbackgroundcolor: `${card.textbackgroundcolor}`
