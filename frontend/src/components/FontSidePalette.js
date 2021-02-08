function FontSidePalette () {
  return (
    <div className='palette-object'>
      <div className='object-title'>Font</div>
      <div className='object-value-container'>
        <div className='object-value'>Font</div>
        <select className='select-tag' value={selectedFont} onChange={e => setSelectedFont(e.currentTarget.value)}>
          <option value='Playfair Display, serif'>Playfair Display</option>
          <option value='Dancing Script, cursive'>Dancing Script</option>
          <option value='Inconsolata, monospace'>Inconsolata</option>
          <option value='Merriweather, serif'>Merriweather</option>
          <option value='Oswald, sans-serif'>Oswald</option>
          <option value='Libre Baskerville, serif'>Libre Baskerville</option>

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
        <div className='object-value'>Text Background</div>
        <select className='select-tag' value={selectedFontBackgroundColor} onChange={e => setSelectedFontBackgroundColor(e.currentTarget.value)}>
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
        <div className='object-value'>Opacity
          <select className='select-tag' value={selectedFontBackgroundOpacity} onChange={e => setSelectedFontBackgroundOpacity(e.currentTarget.value)}>
            <option value='none'>none</option>
            {calculateOpacityOptions().map(num =>
              <option key={num} value={num}>{num}</option>
            )}
          </select>
        </div>
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
  )
}

export default FontSidePalette
