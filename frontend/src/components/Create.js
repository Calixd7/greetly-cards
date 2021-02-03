function Create () {
  return (
    <div className='page-content create-card-content'>
      <div className='upper-palette-card-editor-container'>
        <div className='upper-palette'>
          <div>Drag & Drop palette</div>
        </div>
        <div className='card-editor-display'>
          <h3>this is where the card will be built</h3>
        </div>
      </div>
      <div className='side-palette'>
        {/* <h4>side palette for font and such</h4> */}
        <button className='palette-btns' type='button'>Create</button>
        <button className='palette-btns' type='button'>Save</button>
        <div>Font</div>
      </div>

    </div>
  )
}

export default Create
