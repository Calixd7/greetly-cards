import { useHistory } from 'react-router-dom'

function Card ({ card, scale, isEditing }) {
  const history = useHistory()

  return (
    <div
      onClick={() => !isEditing && history.push(`/view-card/${card.pk}`)}
      key={card.url}
      className='card sixteen-by-nine'
      style={{
        backgroundColor: `${card.backgroundcolor}`,
        backgroundImage: `url(${card.image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity: `${card.backgroundopacity}`,
        width: `${scale * 800}px`
      }}
    >
      <div className='aspect-ratio-box-inside'>
        <div
          className='flexbox-centering'
          style={{
            alignItems: `${card.textboxalignment}`,
            justifyContent: `${card.alignment}`
          }}
        >
          <div
            className='viewport-sizing'
            style={{
              fontFamily: `${card.font}`,
              color: `${card.color}`,
              fontSize: `${card.size * scale}px`,
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
  )
}

export default Card
