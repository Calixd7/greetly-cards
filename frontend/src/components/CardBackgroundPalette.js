import { calculateOpacityOptions } from '../functions'

function CardBackgroundPalette ({ selectedBackgroundColor, setSelectedBackgroundColor, setSelectedImage, imageQuery, setImageQuery, selectedBackgroundOpacity, setSelectedBackgroundOpacity, handleImgSearch, setUnsplashPagination, setImageDisplay, setIsDisplaying }) {
  return (
    <div className='palette-object'>
      <div className='object-title'>Card Background</div>
      <div className='upper-lower-background-container'>
        <div className='upper-background-container'>
          <div>
            <form className='palette-input-btn-form' onSubmit={handleImgSearch}>
              <input
                className='img-search-input'
                type='text'
                placeholder='search background img'
                value={imageQuery}
                onChange={e => setImageQuery(e.target.value)}
              />
              <button
                className='img-search-btn'
                type='submit'
              >Search
              </button>
              <button
                onClick={() => { setImageQuery(''); setUnsplashPagination(1); setImageDisplay([]); setIsDisplaying(false) }}
                className='img-search-btn'
                type='button'
              >Clear
              </button>
            </form>
          </div>
        </div>
        <div className='lower-background-container'>
          <div className='left-right-container'>
            <div className='palette-left-side'>
              <div className='object-value-container'>
                <div className='object-value'>Color
                  <select className='select-tag' value={selectedBackgroundColor} onChange={e => { setSelectedBackgroundColor(e.currentTarget.value); setSelectedImage('') }}>
                    <option value='none'>none</option>
                    <option value='#678'>Grey</option>
                    <option value='#F1FAEE'>Honeydew</option>
                    <option value='#457B9D'>Celadon Blue</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='palette-right-side'>
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
    </div>

  )
}

export default CardBackgroundPalette
