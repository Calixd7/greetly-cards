function CardSettingsPalette ({ selectedGenre, setSelectedGenre, selectedAccess, setSelectedAccess }) {
  return (
    <div className='palette-object'>
      <div className='object-title'>Card Settings</div>
      <div className='object-value-container'>
        <div className='object-value'>Genre</div>
      </div>
      <select className='select-tag' value={selectedGenre} onChange={e => setSelectedGenre(e.currentTarget.value)}>
        <option value='none'>none</option>
        <option value='birthday'>Birthday</option>
        <option value='thank-you'>Thank You</option>
        <option value='invitation'>Invitation</option>
        <option value='greeting'>Greeting</option>
        <option value='photo-card'>Photo Card</option>
        <option value='wedding'>Wedding</option>
        <option value='engagement'>Engagement</option>
        <option value='love'>Love</option>
        <option value='congratulations'>Congratulations</option>
        <option value='graduation'>Graduation</option>
        <option value='sympathy'>Sympathy</option>
        <option value='encouragement'>Encouragement</option>
        <option value='holiday'>Holiday</option>
      </select>
      <div className='object-value-container'>
        <div className='object-value'>Access</div>
      </div>
      <select className='select-tag' value={selectedAccess} onChange={e => setSelectedAccess(e.currentTarget.value)}>
        <option value='private'>Private</option>
        <option value='public'>Public</option>
      </select>
    </div>
  )
}

export default CardSettingsPalette
